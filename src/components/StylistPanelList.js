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
      loading: true,
      orders: null,
      validationError: "",
      name: "",
      address: "",
      zip: "",
      email: "",
      phone: "",
      orderNumber: "",
      createdAt: "",
      note_attributes: null,
      thickness: null,
      texture: null,
      hairCondition: null,
      hairGoals: null,
      age: null,
      diet: null,
      city: null,
      wash: null,
      afterwash: null,
      hairGoals2: null,
      conditionerFormula: null,
      shampooFormula: null
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
      let response = await axios("https://chat-quiz-backend.herokuapp.com/");
      response = JSON.parse(JSON.stringify(response));
      const data = [];
      for (let userCode of response.data) {
        data.push({
          userCode: userCode.user_code,
          locale: userCode.locale
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
                  position: "sticky",
                  width: "100%",
                  top: 0
                }}
              >
                <div onClick={() => this.sortBy("locale")}>
                  DATE_TIME <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div onClick={() => this.sortBy("userCode")}>
                  USER <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div onClick={() => this.sortBy("customerName")}>
                  NAME <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div onClick={() => this.sortBy("product")}>
                  PRODUCT <span>{ascending ? "▲" : "▼"}</span>
                </div>
              </div>
              <div className="body">
                {filteredData.slice(0, 30).map(rowData => {
                  return (
                    <Link style={{ textDecoration: 'none' }}
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
