import React, { Component } from 'react'

//components
import Color from './Color'
import Conditions from './Conditions'
import Goals from './Goals'
import { Row } from './common'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { Paper } from '@material-ui/core'
import { ClipLoader, PulseLoader } from 'react-spinners'
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

export default class Sales extends Component {
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

          completedQuizCount++

          this.setState({
            completedQuizCount
          })
        }
      }
      this.setState({
        emails,
        totalQuizCount
      })
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
          <Link to="/stylist-panel-list">
            <button id="list-view-btn">← LIST VIEW</button>
          </Link>
          <br />
          <br />
          TOTAL QUIZ COUNT: {this.state.loading? <ClipLoader size={6} /> :this.state.totalQuizCount}
          <br /> COMPLETED QUIZ COUNT: {this.state.completedQuizCount}
          <br /> ABANDONED QUIZ COUNT: {this.state.abandonedQuiz}
          {/* <br /> COMPUTE NULL: {this.state.computeNull} */}
          <br /> <br />
          <span style={{ display: 'flex', flexDirection: 'row' }}>
            TOTAL SALES:{' '}
            {this.state.loading === false ? (
              <span>
                {this.state.totalSales}{' '}
                <CSVLink data={this.state.csv}>DOWNLOAD CSV</CSVLink>
              </span>
            ) : (
              <span
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  marginLeft: '5px'
                }}
              >
                COMPILING CSV <PulseLoader size={6} />
              </span>
            )}
          </span>
        </span>
      </div>
    )
  }
}
