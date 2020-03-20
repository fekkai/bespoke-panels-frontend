import React, { Component } from "react";

//components
import Conditions from "./Conditions";
import Goals from "./Goals";
import { Row } from "./common";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { Paper } from "@material-ui/core";
import { RingLoader } from "react-spinners";
import CircularProgress from "@material-ui/core/CircularProgress";

// styling
import "../styles/Panel.scss";
import { css } from "@emotion/core";

import axios from "axios";
import aws4 from "aws4";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: ${7}%;
`;

const primary = [600];

let request = {
  hostname: "5qdtfxj5j5.execute-api.us-east-1.amazonaws.com",
  method: "GET",
  url: "https://5qdtfxj5j5.execute-api.us-east-1.amazonaws.com/latest",
  path: "/latest"
};

let signedRequest = aws4.sign(request, {
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
});

delete signedRequest.headers["Host"];
delete signedRequest.headers["Content-Length"];

const apiKey = process.env.REACT_APP_FEKKAI_BACKEND_API_KEY;

export default class StylistPanelList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reload: false,
      filter: "",
      data: [],
      ascending: false,
      loading: true,
      checked: false,
      conditionOpen: false,
      goalsOpen: false
    };
  }

  async componentDidMount() {
    this.fetchOrders();
    await this.setState({
      loading: false
    });
  }

  fetchOrders = async () => {
    try {
      let response = await axios(
        `https://fekkai-backend.herokuapp.com/backend/get_user_codes?apikey=${process.env.REACT_APP_FEKKAI_BACKEND_API_KEY}`
      );
      // response = JSON.parse(JSON.stringify(response));
      const data = [];
      for (let userCode of response.data
        // .slice(response.data.length - 20, response.data.length)
        .reverse()) {
        let userResponse = await axios.get(
          `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${userCode.user_code}`
        );
        const shampooScores = [];
        const conditionerScores = [];
        const thirdScores = [];
        const skeletons = [
          "moi1_SH",
          "moi1_CN",
          "moi1_TH",
          "col1_SH",
          "col1_CN",
          "col1_TH",
          "vol1_SH",
          "vol1_CN",
          "vol1_TH",
          "rep1_SH",
          "rep1_CN",
          "rep1_TH",
          "bl1_SH",
          "bl1_TH"
        ];
        console.log(userResponse.data.user_data.email);

        // sort shampoo scores
        if (userResponse.data.user_data.compute === true) {
          let shampooKey;
          let conditionerKey;
          let thirdKey;
          let shampooValue;
          let conditionerValue;
          let thirdValue;

          for (let key in userResponse.data.ingredients.master.formula) {
            if (key.includes("SH") && skeletons.indexOf(key) > -1) {
              // indexOf returns first index where an element can be found. -1 is not present.
              shampooScores.push(
                parseInt(userResponse.data.ingredients.master.formula[key])
              );
              shampooScores.sort((a, b) => b - a);
            }
            if (
              shampooScores[0] ===
                userResponse.data.ingredients.master.formula[key] &&
              key.includes("SH")
            ) {
              shampooKey = key;
              shampooValue = userResponse.data.ingredients.master.formula[key];
            }
          }
          shampooScores.sort((a, b) => b - a);

          // sort conditioner scores
          for (let key in userResponse.data.ingredients.master.formula) {
            if (key.includes("CN") && skeletons.indexOf(key) > -1) {
              // indexOf returns first index where an element can be found. -1 is not present.
              conditionerScores.push(
                parseInt(userResponse.data.ingredients.master.formula[key])
              );
              conditionerScores.sort((a, b) => b - a);
            }
            if (
              conditionerScores[0] ===
                userResponse.data.ingredients.master.formula[key] &&
              key.includes("CN")
            ) {
              conditionerKey = key;
              conditionerValue =
                userResponse.data.ingredients.master.formula[key];
            }
          }
          conditionerScores.sort((a, b) => b - a);

          for (let key in userResponse.data.ingredients.master.formula) {
            if (key.includes("TH") && skeletons.indexOf(key) > -1) {
              // indexOf returns first index where an element can be found. -1 is not present.
              thirdScores.push(
                parseInt(userResponse.data.ingredients.master.formula[key])
              );
              thirdScores.sort((a, b) => b - a);
            }
            if (
              thirdScores[0] ===
                userResponse.data.ingredients.master.formula[key] &&
              key.includes("TH")
            ) {
              thirdKey = key;
              thirdValue = userResponse.data.ingredients.master.formula[key];
            }
          }
          thirdScores.sort((a, b) => b - a);
          data.push({
            id: userResponse.data._id,
            userCode: userCode.user_code,
            locale: userCode.created || userCode.updated,
            name: userResponse.data.user_data.name,
            email: userResponse.data.user_data.email,
            thickness: userResponse.data.user_data.answers.hair_thickness,
            texture: userResponse.data.user_data.answers.hair_texture,
            hairColor: userResponse.data.user_data.answers.hair_color,
            condition: userResponse.data.user_data.answers.hair_condition,
            hairGoals: userResponse.data.user_data.answers.hair_goals,
            length: userResponse.data.user_data.answers.hair_length,
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
          });
        }
        this.setState({
          data
        });
      }
      // this.setState({
      //   data
      // });
    } catch (error) {
      console.error(error);
    }
  };

  compareAsc = key => {
    this.setState({
      ascending: true
    });
    return function(a, b) {
      if (a[key] < b[key]) {
        return -1;
      }
    };
  };

  compareDsc = key => {
    this.setState({
      ascending: false
    });
    return function(a, b) {
      if (a[key] > b[key]) {
        return -1;
      }
    };
  };

  sortBy = key => {
    let arrayCopy = [...this.state.data];
    if (this.state.ascending === true) {
      arrayCopy.sort(this.compareDsc(key));
      this.setState({ data: arrayCopy });
    } else if (this.state.ascending === false) {
      arrayCopy.sort(this.compareAsc(key));
      this.setState({ data: arrayCopy });
    }
  };

  handleChange = e => {
    this.setState({
      filter: e.target.innerText || e.target.name,
      checked: true,
      conditionOpen: false,
      goalsOpen: false
    });
  };

  reset = e => {
    this.setState({
      filter: "",
      conditionOpen: false,
      goalsOpen: false
    });
  };

  handleConditionBtn = () => {
    this.setState(state => {
      return {
        conditionOpen: !state.conditionOpen
      };
    });
  };

  handleGoalsBtn = () => {
    this.setState(state => {
      return {
        goalsOpen: !state.goalsOpen
      };
    });
  };

  handleClickOutside = event => {
    if (
      this.container1.current &&
      !this.container1.current.contains(event.target)
    ) {
      this.setState({
        conditionOpen: false
      });
    }
    if (
      this.container2.current &&
      !this.container2.current.contains(event.target)
    ) {
      this.setState({
        goalsOpen: false
      });
    }
  };

  render() {
    let counter = 0;
    const { filter, data, ascending } = this.state;
    const filteredData = data.filter(item => {
      return Object.keys(item).some(key =>
        key === "condition" || key === "hairGoals"
          ? item[key]
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          : ""
      );
    });

    return (
      <div className="dashboard">
        <Fade>
          {!this.state.loading ? (
            <span align="left" id="filter">
              {this.state.filter ? (
                <div>
                  conditions/goals:{" "}
                  <span
                    style={{
                      border: "2px solid #545454",
                      padding: "0 7px"
                    }}
                  >
                    {this.state.filter}{" "}
                    <span
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={this.reset}
                    >
                      x
                    </span>
                  </span>
                </div>
              ) : (
                ""
              )}
            </span>
          ) : (
            ""
          )}
          <Paper elevation={0}>
            <div className="table">
              {!this.state.loading ? (
                <div className="list-header">
                  <div
                    style={{
                      flex: 0.7
                    }}
                    onClick={() => this.sortBy("locale")}
                  >
                    <div>
                      {" "}
                      DATE_TIME <span>{ascending ? "▲" : "▼"}</span>
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
                    onClick={() => this.sortBy("thickness")}
                  >
                    <div>
                      THICK <span>{ascending ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 0.5
                    }}
                    onClick={() => this.sortBy("texture")}
                  >
                    <div>
                      TEXTURE <span>{ascending ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 0.5
                    }}
                    onClick={() => this.sortBy("hairColor")}
                  >
                    <div>
                      COLOR <span>{ascending ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  <div
                    style={{
                      flex: 0.5
                    }}
                    onClick={() => this.sortBy("length")}
                  >
                    <div>
                      LENGTH <span>{ascending ? "▲" : "▼"}</span>
                    </div>
                  </div>
                  <div
                    className="container"
                    id="conditions-goals"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
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
                      display: "flex",
                      justifyContent: "center",
                      flexWrap: "wrap",
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
              ) : (
                ""
              )}
              <div>
                {filteredData.map(rowData => {
                  return (
                    <Link
                      key={rowData.id}
                      style={{
                        textDecoration: "none"
                      }}
                      to={{
                        pathname: "/stylist-panel-customer",
                        state: {
                          userCode: rowData.userCode,
                          name: rowData.name,
                          locale: rowData.locale,
                          email: rowData.email,
                          thickness: rowData.thickness,
                          texture: rowData.texture,
                          hairColor: rowData.hairColor,
                          condition: rowData.condition,
                          hairGoals: rowData.hairGoals,
                          length: rowData.length,
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
                  );
                })}
                <RingLoader
                  css={override}
                  size={150}
                  color={"#545454"}
                  loading={this.state.loading}
                />
              </div>
            </div>
          </Paper>
        </Fade>
      </div>
    );
  }
}
