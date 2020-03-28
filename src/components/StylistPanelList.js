import React, { Component } from 'react'

//components
import Color from './Color'
import Conditions from './Conditions'
import Goals from './Goals'
import { Row } from './common'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { Paper } from '@material-ui/core'
import { RingLoader, PulseLoader } from 'react-spinners'
import CircularProgress from '@material-ui/core/CircularProgress'

// styling
import '../styles/Panel.scss'
import { css } from '@emotion/core'

// react CSV
import { CSVLink, CSVDownload } from 'react-csv'

import axios from 'axios'
import aws4 from 'aws4'

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: ${7}%;
`

const primary = [600]

let request = {
  hostname: '5qdtfxj5j5.execute-api.us-east-1.amazonaws.com',
  method: 'GET',
  url: 'https://5qdtfxj5j5.execute-api.us-east-1.amazonaws.com/latest',
  path: '/latest'
}

let signedRequest = aws4.sign(request, {
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
})

delete signedRequest.headers['Host']
delete signedRequest.headers['Content-Length']

const apiKey = process.env.REACT_APP_FEKKAI_BACKEND_API_KEY

export default class StylistPanelList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      reload: false,
      filter: '',
      data: [],
      ascending: false,
      loading: true,
      checked: false,
      colorOpen: false,
      conditionOpen: false,
      goalsOpen: false
    }
  }

  async componentDidMount() {
    this.fetchOrders()
    await this.fetchQuizData()
    await this.findSales()
    await this.setState({
      loading: false
    })
  }

  fetchOrders = async () => {
    try {
      let response = await axios(
        'https://bespoke-backend-db.herokuapp.com/fekkai'
      )
      let responses = await axios(
        'https://bespoke-backend-db.herokuapp.com/orders'
      )
      console.log(responses.data)

      // const orders = response.data.orders;
      const orders = responses.data
      this.setState({ orders })
    } catch (error) {
      console.error(error)
    }
  }

  fetchQuizData = async () => {
    try {
      let response = await axios(
        `https://bespoke-backend-db.herokuapp.com/fekkai-backend`
      )
      // response = JSON.parse(JSON.stringify(response));
      const data = []
      const emails = []
      let completedQuizCount = 0
      let abandonedQuiz = 0
      let totalQuizCount = response.data.length

      for (let userCode of response.data
        // .slice(response.data.length - 100, response.data.length)
        .reverse()) {
        let userResponse = await axios.get(
          `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${userCode.user_code}`
        )

        if (
          // userResponse.data.created > "2020-03-19T23:59:59" &&
          userResponse.data.user_data.compute === false
        ) {
          abandonedQuiz++

          this.setState({
            abandonedQuiz
          })
        }

        // arrays for sorting quiz scores
        const shampooScores = []
        const conditionerScores = []
        const thirdScores = []
        const skeletons = [
          'moi1_SH',
          'moi1_CN',
          'moi1_TH',
          'col1_SH',
          'col1_CN',
          'col1_TH',
          'vol1_SH',
          'vol1_CN',
          'vol1_TH',
          'rep1_SH',
          'rep1_CN',
          'rep1_TH',
          'bl1_SH',
          'bl1_TH'
        ]

        // sort shampoo scores
        if (
          // userResponse.data.created > "2020-03-19T23:59:59" &&
          userResponse.data.user_data.compute === true
        ) {
          // console.log(userResponse.data)
          if (
            !emails.includes(
              userResponse.data.user_data.email.toLocaleLowerCase()
            )
          ) {
            emails.push(userResponse.data.user_data.email.toLocaleLowerCase())
          }
          let shampooKey
          let conditionerKey
          let thirdKey
          let shampooValue
          let conditionerValue
          let thirdValue
          completedQuizCount++

          this.setState({
            completedQuizCount
          })

          for (let key in userResponse.data.ingredients.master.formula) {
            if (key.includes('SH') && skeletons.indexOf(key) > -1) {
              // indexOf returns first index where an element can be found. -1 is not present.
              shampooScores.push(
                parseInt(userResponse.data.ingredients.master.formula[key])
              )
              shampooScores.sort((a, b) => b - a)
            }
            if (
              shampooScores[0] ===
                userResponse.data.ingredients.master.formula[key] &&
              key.includes('SH')
            ) {
              shampooKey = key
              shampooValue = userResponse.data.ingredients.master.formula[key]
            }
          }
          shampooScores.sort((a, b) => b - a)

          // sort conditioner scores
          for (let key in userResponse.data.ingredients.master.formula) {
            if (key.includes('CN') && skeletons.indexOf(key) > -1) {
              // indexOf returns first index where an element can be found. -1 is not present.
              conditionerScores.push(
                parseInt(userResponse.data.ingredients.master.formula[key])
              )
              conditionerScores.sort((a, b) => b - a)
            }
            if (
              conditionerScores[0] ===
                userResponse.data.ingredients.master.formula[key] &&
              key.includes('CN')
            ) {
              conditionerKey = key
              conditionerValue =
                userResponse.data.ingredients.master.formula[key]
            }
          }
          conditionerScores.sort((a, b) => b - a)

          // sort third scores
          for (let key in userResponse.data.ingredients.master.formula) {
            if (key.includes('TH') && skeletons.indexOf(key) > -1) {
              // indexOf returns first index where an element can be found. -1 is not present.
              thirdScores.push(
                parseInt(userResponse.data.ingredients.master.formula[key])
              )
              thirdScores.sort((a, b) => b - a)
            }
            if (
              thirdScores[0] ===
                userResponse.data.ingredients.master.formula[key] &&
              key.includes('TH')
            ) {
              thirdKey = key
              thirdValue = userResponse.data.ingredients.master.formula[key]
            }
          }
          thirdScores.sort((a, b) => b - a)

          data.push({
            id: userResponse.data._id,
            userCode: userCode.user_code,
            locale: userCode.created || userCode.updated,
            name: userResponse.data.user_data.name,
            email: userResponse.data.user_data.email,
            hairThickness: userResponse.data.user_data.answers.hair_thickness,
            hairTexture: userResponse.data.user_data.answers.hair_texture,
            hairColor: !userResponse.data.user_data.answers.hair_color
              ? 'n/a'
              : userResponse.data.user_data.answers.hair_color,
            condition: userResponse.data.user_data.answers.hair_condition,
            hairGoals: !userResponse.data.user_data.answers.hair_goals
              ? 'n/a'
              : userResponse.data.user_data.answers.hair_goals,
            hairLength: !userResponse.data.user_data.answers.hair_length
              ? 'n/a'
              : userResponse.data.user_data.answers.hair_length,
            city: userResponse.data.user_data.weather.city,
            uvRisk: userResponse.data.user_data.weather.scores.uv_risk,
            airQuality: userResponse.data.user_data.weather.scores.air_quality,
            waterHardness:
              userResponse.data.user_data.weather.scores.water_hardness,
            humidity: userResponse.data.user_data.weather.scores.humidity,
            windSpeed: userResponse.data.user_data.weather.scores.wind_speed,
            shampooKey,
            conditionerKey,
            thirdKey,
            frontSelfie: userResponse.data.user_data.front_selfie
          })
        }
        this.setState({
          data,
          emails,
          totalQuizCount
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  findSales = () => {
    let saleEmail = 0
    let nonSaleEmail = 0
    let totalSales = 0
    let csv = [['created_at', 'email', 'subtotal', 'total']]
    // emails compute true
    console.log(this.state.emails)
    for (let email of this.state.emails) {
      for (let order of this.state.orders) {
        if (order.total && email === order.email.toLocaleLowerCase()) {
          totalSales += parseFloat(order.total)
          this.setState({ totalSales })
          csv.push([order.created_at, order.email, order.subtotal, order.total])
          // console.log(
          //   order.created_at,
          //   order.email,
          //   order.subtotal_price,
          //   order.total_price
          // );
        }
      }
      this.setState({ totalSales, csv })
    }
  }

  compareAsc = key => {
    this.setState({
      ascending: true
    })
    return function(a, b) {
      if (a[key] < b[key]) {
        return -1
      }
    }
  }

  compareDsc = key => {
    this.setState({
      ascending: false
    })
    return function(a, b) {
      if (a[key] > b[key]) {
        return -1
      }
    }
  }

  sortBy = key => {
    let arrayCopy = [...this.state.data]
    if (this.state.ascending === true) {
      arrayCopy.sort(this.compareDsc(key))
      this.setState({ data: arrayCopy })
    } else if (this.state.ascending === false) {
      arrayCopy.sort(this.compareAsc(key))
      this.setState({ data: arrayCopy })
    }
  }

  handleChange = e => {
    this.setState({
      filter: e.target.name || e.target.innerText,
      checked: true,
      colorOpen: false,
      conditionOpen: false,
      goalsOpen: false
    })
  }

  reset = e => {
    this.setState({
      filter: '',
      colorOpen: false,
      conditionOpen: false,
      goalsOpen: false
    })
  }

  handleColorBtn = () => {
    this.setState(state => {
      return {
        colorOpen: !state.colorOpen
      }
    })
  }

  handleConditionBtn = () => {
    this.setState(state => {
      return {
        conditionOpen: !state.conditionOpen
      }
    })
  }

  handleGoalsBtn = () => {
    this.setState(state => {
      return {
        goalsOpen: !state.goalsOpen
      }
    })
  }

  handleClickOutside = event => {
    if (
      this.container0.current &&
      !this.container0.current.contains(event.target)
    ) {
      this.setState({
        colorOpen: false
      })
    }
    if (
      this.container1.current &&
      !this.container1.current.contains(event.target)
    ) {
      this.setState({
        conditionOpen: false
      })
    }
    if (
      this.container2.current &&
      !this.container2.current.contains(event.target)
    ) {
      this.setState({
        goalsOpen: false
      })
    }
  }

  render() {
    let counter = 0
    const { filter, data, ascending } = this.state
    const filteredData = data.filter(item => {
      return Object.keys(item).some(key =>
        key === 'condition' || key === 'hairGoals' || key === 'hairColor'
          ? item[key]
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          : ''
      )
    })

    return (
      <div className="dashboard">
        <span>
          TOTAL QUIZ COUNT: {this.state.totalQuizCount}
          <br /> COMPLETED QUIZ COUNT: {this.state.completedQuizCount}
          <br /> ABANDONED QUIZ COUNT: {this.state.abandonedQuiz}
          {/* <br /> COMPUTE NULL: {this.state.computeNull} */}
          <br /> <br />
          {/* <span style={{ display: 'flex', flexDirection: 'row' }}>
            TOTAL SALES:{' '}
            {this.state.loading === false ? (
              <span>
                {this.state.totalSales}{' '}
                <CSVLink data={this.state.csv}>DOWNLOAD CSV</CSVLink>
              </span>
            ) : (
              <span>
                {' '}
                <PulseLoader size={8} />
              </span>
            )}
          </span> */}
        </span>
        <Fade>
          {!this.state.loading ? (
            <span align="left" id="filter">
              {this.state.filter ? (
                <div style={{ fontSize: '13px' }}>
                  FILTER:{' '}
                  <span
                    style={{
                      border: '2px solid #545454',
                      padding: '0 7px'
                    }}
                  >
                    {this.state.filter}{' '}
                    <span
                      style={{
                        cursor: 'pointer'
                      }}
                      onClick={this.reset}
                    >
                      x
                    </span>
                  </span>
                </div>
              ) : (
                ''
              )}
            </span>
          ) : (
            ''
          )}
          <Paper elevation={0}>
            <div className="table">
              <div className="list-header">
                <div
                  style={{
                    flex: 0.7
                  }}
                  onClick={() => this.sortBy('locale')}
                >
                  <div>
                    {' '}
                    DATE_TIME <span>{ascending ? '▲' : '▼'}</span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 0.4
                  }}
                  // onClick={() => this.sortBy("name")}
                >
                  <div>
                    NAME <span>{/* {ascending ? "▲" : "▼"} */}</span>
                  </div>
                </div>

                <div
                  style={{
                    flex: 0.7
                  }}
                  // onClick={() => this.sortBy("frontSelfie")}
                >
                  <div>SELFIE</div>
                </div>
                <div
                  style={{
                    flex: 0.5
                  }}
                  onClick={() => this.sortBy('hairThickness')}
                >
                  <div>
                    THICK <span>{ascending ? '▲' : '▼'}</span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 0.5
                  }}
                  onClick={() => this.sortBy('hairTexture')}
                >
                  <div>
                    TEXTURE <span>{ascending ? '▲' : '▼'}</span>
                  </div>
                </div>

                <div
                  className="container"
                  id="conditions-goals"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flex: 0.5
                  }}
                  ref={this.container0}
                >
                  <div onClick={this.handleColorBtn}>COLOR ☰</div>
                  {this.state.colorOpen && (
                    <Color
                      // checked={this.state.checked}
                      handleChange={this.handleChange}
                    />
                  )}
                </div>

                <div
                  style={{
                    flex: 0.5
                  }}
                  onClick={() => this.sortBy('hair_length' && 'hairLength')}
                >
                  <div>
                    LENGTH <span>{ascending ? '▲' : '▼'}</span>
                  </div>
                </div>

                <div
                  className="container"
                  id="conditions-goals"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flex: 1
                  }}
                  ref={this.container1}
                >
                  <div onClick={this.handleConditionBtn}>CONDITIONS ☰</div>
                  {this.state.conditionOpen && (
                    <Conditions
                      // checked={this.state.checked}
                      handleChange={this.handleChange}
                    />
                  )}
                </div>

                <div
                  id="conditions-goals"
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flex: 1
                  }}
                  ref={this.container2}
                >
                  <div onClick={this.handleGoalsBtn}>GOALS ☰</div>
                  {this.state.goalsOpen && (
                    <Goals handleChange={this.handleChange} />
                  )}
                </div>
              </div>

              <div>
                {filteredData.map(rowData => {
                  return (
                    <Link
                      key={rowData.id}
                      style={{
                        textDecoration: 'none'
                      }}
                      to={{
                        pathname: '/stylist-panel-customer',
                        state: {
                          userCode: rowData.userCode,
                          name: rowData.name,
                          locale: rowData.locale,
                          email: rowData.email,
                          hairThickness: rowData.hairThickness,
                          hairTexture: rowData.hairTexture,
                          hairColor: rowData.hairColor,
                          condition: rowData.condition,
                          hairGoals: rowData.hairGoals,
                          hairLength: rowData.hairLength,
                          city: rowData.city,
                          uvRisk: rowData.uvRisk,
                          airQuality: rowData.airQuality,
                          waterHardness: rowData.waterHardness,
                          humidity: rowData.humidity,
                          windSpeed: rowData.windSpeed,
                          shampooKey: rowData.shampooKey,
                          conditionerKey: rowData.conditionerKey,
                          thirdKey: rowData.thirdKey,
                          frontSelfie: rowData.frontSelfie
                        }
                      }}
                    >
                      <Row {...rowData} />
                    </Link>
                  )
                })}
                {/* <RingLoader
                  css={override}
                  size={150}
                  color={"#545454"}
                  loading={this.state.loading}
                /> */}
              </div>
            </div>
          </Paper>
        </Fade>
      </div>
    )
  }
}
