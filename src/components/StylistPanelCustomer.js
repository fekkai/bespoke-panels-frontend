import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { css } from "@emotion/core";

import axios from "axios";
import aws4 from "aws4";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { RingLoader } from "react-spinners";
import { Paper } from "@material-ui/core";

import "../styles/Panel.scss";

// import OrderInfoStatus from "./OrderInfoStatus";

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

export default class StylistPanelCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  render() {
    const {
      name,
      address,
      orderId,
      thickness,
      texture,
      condition,
      hairGoals,
      hairGoals2,
      age,
      diet,
      zip,
      humidity,
      frontSelfie,
      sideSelfie
    } = this.props.location.state;
    return (
      <div>
        <Link to="/stylist-panel-list">
          <button id="list-view-btn">← LIST VIEW</button>
        </Link>
        <Fade big>
          <Paper elevation={1}>
            <div className="stylist-panel-customer">
              <div className="column-title">Customer</div>
              <div className="column-title">Order</div>
              <div className="column-title">Status</div>
              <div className="info-container-1">
                <span>
                  NAME: {name}
                  {address}
                </span>
              </div>
              <div className="info-container-1">ID: {orderId}</div>
              <div className="info-container-1">
                STATUS: <br />
                <br />
                APPROVED BY:{" "}
              </div>
            </div>
          </Paper>
          <Paper elevation={1}>
            {/* <div className="section">CUSTOMER RESPONSE</div> */}
            <div className="stylist-panel-customer">
              <div className="column-title">Characteristics</div>
              <div className="column-title">Profile</div>
              <div className="column-title">Selfie</div>
              <div className="info-container info-container2">
                THICKNESS:{" "}
                {thickness
                  ? thickness === 1
                    ? "finest"
                    : "" || thickness === 2
                    ? "finer"
                    : "" || thickness === 3
                    ? "fine"
                    : "" || thickness === 4
                    ? "medium"
                    : "" || thickness === 5
                    ? "thick"
                    : "" || thickness === 6
                    ? "thicker"
                    : "" || thickness === 7
                    ? "thickest"
                    : ""
                  : ""}
                <br />
                <br />
                TEXTURE:{" "}
                {texture
                  ? texture === 1
                    ? "straight"
                    : "" || texture === 2
                    ? "wavy"
                    : "" || texture === 3
                    ? "curly"
                    : "" || texture === 4
                    ? "coily"
                    : ""
                  : ""}
                <br />
                <br />
                CONDITION: {condition}
                <br />
                <br />
                MAIN GOALS: {hairGoals}
                <br />
                <br />
                SECONDARY GOALS: {hairGoals2}
                <br />
                <br />
                FRAGRANCE:
                <br />
                <br />
              </div>

              <div className="info-container">
                AGE:{" "}
                {age
                  ? age === 1
                    ? "20s"
                    : "" || age === 2
                    ? "30s"
                    : "" || age === 3
                    ? "40s"
                    : "" || age === 4
                    ? "50s"
                    : "" || age === 4
                    ? "60s"
                    : "" || age === 4
                    ? "70+"
                    : ""
                  : ""}
                <br /> <br />
                DIET: {diet}
                <br />
                <br />
                ZIP: {zip}
                <br />
                <br />
                HUMIDITY:
                <br />
                <br /># AFTERWASH PRODUCTS:
              </div>

              <div className="selfie-container">
                <Carousel showThumbs={false} showIndicators={false}>
                  <div>
                    <img style={{ width: `${85}%` }} src={frontSelfie} />
                  </div>
                  <div>
                    <img style={{ width: `${85}%` }} src={sideSelfie} />
                  </div>
                </Carousel>
              </div>
            </div>
          </Paper>
          <Paper elevation={1}>
            <div className="stylist-panel-customer">
              <div className="column-title">Shampoo</div>
              <div className="column-title">Conditioner</div>
              <div className="info-container"></div>
              <div className="info-container">Status</div>
              <div className="info-container">Status</div>
              <div id="logout-approve-btn">
                <div style={{ paddingRight: `${5}%` }}>
                  <button>APPROVE</button>
                </div>
              </div>
            </div>
          </Paper>
        </Fade>

        <RingLoader
          css={override}
          size={150}
          //size={"150px"} this also works
          color={"#000000"}
          loading={this.state.loading}
        />
      </div>
    );
  }
}
