import React, { Component } from "react";

//components
import { Row } from "./common";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { Paper } from "@material-ui/core";
import { RingLoader } from "react-spinners";
import InfiniteScroll from 'react-infinite-scroller';

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
      loading: true,
      checked: false
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
      console.log(response);
      const data = [];
      for (let userCode of response.data.slice(0, 50).reverse()) {
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
        console.log(userResponse.data);

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
          shampooSkeletonKey,
          frontSelfie: userResponse.data.user_data.front_selfie
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
    this.state.checked === false
      ? this.setState({ filter: e.target.name, checked: true })
      : this.setState({ filter: "", checked: false });
  };

  render() {
    const { filter, data, ascending } = this.state;
    const filteredData = data.filter(item => {
      console.log(data);
      return Object.keys(item).some(key =>
        key !== "frontSelfie"
          ? item[key]
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          : ""
      );
    });
    return (
      <div className="dashboard">
        <Fade big>
          <Paper elevation={0}>
            <div className="table">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row"
                }}
              >
                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    listStyle: "none",
                    columns: 2,
 
                  }}
                >
                  CONDITIONS
                  <li>
                    <input
                      type="checkbox"
                      name="bleached"
                      value="bleached"
                      onChange={this.handleChange}
                    />
                    bleached
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="permed"
                      value="permed"
                      onChange={this.handleChange}
                    />
                    permed
                  </li>
                  <li>
                    {" "}
                    <input
                      type="checkbox"
                      name="color-treated"
                      value="color-treated"
                      onChange={this.handleChange}
                    />
                    color-treated
                  </li>
                  <li>
                    {" "}
                    <input
                      type="checkbox"
                      name="highlights"
                      value="highlights"
                      onChange={this.handleChange}
                    />
                    highlights
                  </li>
                  <li>
                    {" "}
                    <input
                      type="checkbox"
                      name="chemically-treated"
                      value="chemically-treated"
                      onChange={this.handleChange}
                    />
                    chemically-treated
                  </li>
                  <li>
                    {" "}
                    <input
                      type="checkbox"
                      name="chemically-straightened"
                      value="chemically-straightened"
                      onChange={this.handleChange}
                    />
                    chemically-straightened
                  </li>
                  <li>
                    {" "}
                    <input
                      type="checkbox"
                      name="split-ends"
                      value="split-ends"
                      onChange={this.handleChange}
                    />
                    split-ends
                  </li>
                  <li>
                    {" "}
                    <input
                      type="checkbox"
                      name="frequent-heat-styling-tools"
                      value="frequent-heat-styling-tools"
                      onChange={this.handleChange}
                    />
                    frequent-heat-styling-tools
                  </li>
                  <li>
                    {" "}
                    <input
                      type="checkbox"
                      name="none"
                      value="none"
                      onChange={this.handleChange}
                    />
                    none
                  </li>
                  <br />
                </ul>

                <ul
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    listStyle: "none"
                  }}
                >
                  GOALS
                  <li>
                    <input
                      type="checkbox"
                      name="color-protect"
                      value="color-protect"
                      onChange={this.handleChange}
                    />
                    color-protect
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="uv-protect"
                      value="uv-protect"
                      onChange={this.handleChange}
                    />
                    uv-protect
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="damage-repair"
                      value="damage-repair"
                      onChange={this.handleChange}
                    />
                    damage-repair
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="frizz-control"
                      value="frizz-control"
                      onChange={this.handleChange}
                    />
                    frizz-control
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="smoothing"
                      value="smoothing"
                      onChange={this.handleChange}
                    />
                    smoothing
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="healthy-shine"
                      value="healthy-shine"
                      onChange={this.handleChange}
                    />
                    healthy-shine
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="hydrate"
                      value="hydrate"
                      onChange={this.handleChange}
                    />
                    hydrate
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="hair-loss-prevention"
                      value="hair-loss-prevention"
                      onChange={this.handleChange}
                    />
                    hair-loss-prevention
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="volumizing"
                      value="volumizing"
                      onChange={this.handleChange}
                    />
                    volumizing{" "}
                  </li>
                </ul>
              </div>
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
                    fontSize: "13px"
                  }}
                  onClick={() => this.sortBy("locale")}
                >
                  DATE_TIME <span>{ascending ? "▲" : "▼"}</span>
                </div>
                {/* <div
                  style={{
                    flex: 2,
                    fontSize: "13px"
                  }}
                  onClick={() => this.sortBy("userCode")}
                >
                  USER <span>{ascending ? "▲" : "▼"}</span>
                </div> */}
                <div
                  style={{
                    flex: 1.2,
                    fontSize: "13px"
                  }}
                  onClick={() => this.sortBy("customerName")}
                >
                  NAME <span>{ascending ? "▲" : "▼"}</span>
                </div>

                <div
                  style={{
                    flex: 1,
                    fontSize: "13px"
                  }}
                  onClick={() => this.sortBy("frontSelfie")}
                >
                  SELFIE <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div
                  style={{
                    flex: 1,
                    fontSize: "13px"
                  }}
                  onClick={() => this.sortBy("thickness")}
                >
                  THICKNESS <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div
                  style={{
                    flex: 1,
                    fontSize: "13px"
                  }}
                  onClick={() => this.sortBy("texture")}
                >
                  TEXTURE <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div
                  style={{
                    fslicelex: 1,
                    fontSize: "13px"
                  }}
                  onClick={() => this.sortBy("condition")}
                >
                  CONDITIONS <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div
                  style={{
                    flex: 1,
                    fontSize: "13px"
                  }}
                  onClick={() => this.sortBy("hairGoals")}
                >
                  GOALS <span>{ascending ? "▲" : "▼"}</span>
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
