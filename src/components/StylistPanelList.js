import React, { Component } from "react";

//components
import { Row } from "./common";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { Paper } from "@material-ui/core";
import { RingLoader } from "react-spinners";

// styling
import "../styles/Panel.scss";
import { css } from "@emotion/core";

import axios from "axios";
import aws4 from "aws4";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: ${7}%;
`;

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

export default class StylistPanelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",
      data: [],
      ascending: true,
      loading: true
    };
  }

  async componentDidMount() {
    await this.fetchOrders();
    await this.setState({
      loading: false
    });
  }

  fetchOrders = async () => {
    try {
      // let response = await axios("https://chat-quiz-backend.herokuapp.com/");
      // response = JSON.parse(JSON.stringify(response));
      // const data = [];
      // for (let userCode of response.data.slice(0, 35)) {
      //   let userResponse = await axios.get(
      //     `https://fekk.ai/backend/get_formula?user_code=${userCode.user_code}`
      //   );

      let response = await axios(
        "https://fekkai-backend.herokuapp.com/backend/get_user_codes?apikey=804727d788a44db68a47c64f10fa573f"
      );
      response = JSON.parse(JSON.stringify(response));
      console.log(response)
      const data = [];
      for (let userCode of response.data.reverse()) {
        let userResponse = await axios.get(
          `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${userCode.user_code}`
        );

        const shampooScores = [];

        const skeletons = [
          "volume1",
          "colorprotect1",
          "moisture1",
          "repair1",
          "smooth1"
        ];
        let shampooSkeletonKey;
        let shampooSkeletonValue;
        let conditionerSkeletonKey;
        let conditionerSkeletonValue;

        for (let key in userResponse.data.ingredients.shampoo.formula) {
          if (skeletons.indexOf(key) > -1) {
            shampooScores.push(
              parseInt(userResponse.data.ingredients.shampoo.formula[key])
            );
            shampooScores.sort((a, b) => b - a);
          }
          if (
            shampooScores[0] ===
            userResponse.data.ingredients.shampoo.formula[key]
          ) {
            shampooSkeletonKey = key;
            shampooSkeletonValue =
              userResponse.data.ingredients.shampoo.formula[key];
          }
        }
        shampooScores.sort((a, b) => b - a);

        data.push({
          userCode: userCode.user_code,
          locale: userCode.created || userCode.updated,
          thickness: parseInt(
            userResponse.data.user_data.answers.hair_thickness
          ),
          texture: parseInt(userResponse.data.user_data.answers.hair_texture),
          condition: userResponse.data.user_data.answers["hair-condition"],
          hairGoals: userResponse.data.user_data.answers["hair-goals"],
          shampooSkeletonKey
        });
      }
      this.setState({
        data
      });
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
    if (this.state.ascending === false) {
      arrayCopy.sort(this.compareAsc(key));
      this.setState({ data: arrayCopy });
    } else if (this.state.ascending === true) {
      arrayCopy.sort(this.compareDsc(key));
      this.setState({ data: arrayCopy });
    }
  };

  handleChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { filter, data, ascending } = this.state;

    const filteredData = data.filter(item => {
      return Object.keys(item).some(key =>
        item[key]
          .toString()
          .toLocaleLowerCase()
          .includes(filter.toLocaleLowerCase())
      );
    });
    return (
      <div className="dashboard">
        <Fade big>
          <Paper elevation={0}>
            <div className="table">
              <label>
                Search:{" "}
                <input type="text" name="name" onChange={this.handleChange} />
                <br />
              </label>
              <div
                className="list-header"
                style={{
                  display: "flex",
                  position: "sticky",
                  width: "100%",
                  top: 0
                }}
              >
                <div
                  style={{
                    flex: 1.2,
                    fontSize:'13px'
                  }}
                  onClick={() => this.sortBy("locale")}
                >
                  DATE_TIME <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div
                  style={{
                    flex: 2,
                                        fontSize:'13px'

                  }}
                  onClick={() => this.sortBy("userCode")}
                >
                  USER <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div
                  style={{
                    flex: 2,
                                        fontSize:'13px'

                  }}
                  onClick={() => this.sortBy("customerName")}
                >
                  NAME <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div
                  style={{
                    flex: 4,
                                        fontSize:'13px'

                  }}
                  onClick={() => this.sortBy("thickness")}
                >
                  RESULTS / PRODUCT <span>{ascending ? "▲" : "▼"}</span>
                </div>
              </div>
              <div className="body">
                {filteredData.map(rowData => {
                  return (
                    <Link
                      style={{
                        textDecoration: "none"
                      }}
                      to={{
                        pathname: "/stylist-panel-customer",
                        state: {
                          userCode: rowData.userCode,
                          locale: rowData.locale
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
                  // size={"150px"} this also works
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
