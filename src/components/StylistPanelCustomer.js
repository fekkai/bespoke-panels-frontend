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

// import "../styles/Panel.scss";

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
      loading: true,
      photoIndex: 0,
      isOpen: false,
      userCode: ""
    };
  }

  componentDidMount() {
    this.fetchUserCode();
  }

  fetchUserCode = async () => {
    let userResponse = await axios.get(
      `https://fekk.ai/backend/get_formula?user_code=${this.props.location.state.userCode}`
    );
    console.log(userResponse);
    this.setState({
      loading: false,
      shampooFormula: userResponse.data.user_data.answers.hair_thickness,
      texture: userResponse.data.user_data.answers.hair_texture,
      condition: userResponse.data.user_data.answers["hair-condition"],
      hairGoals: userResponse.data.user_data.answers["hair-goals"],
      hairGoals2: userResponse.data.user_data.answers["hair-goals-2"],
      age: userResponse.data.user_data.answers.age,
      diet: userResponse.data.user_data.answers.diet,
      //     zip: (typepeof userResponse.data.user_data.answers.zipcode === "string"
      // ? userResponse.data.user_data.answers.zipcode
      // : userResponse.data.user_data.answers.zipcode.zip),
      city: userResponse.data.user_data.weather.city,
      uvRisk: userResponse.data.user_data.weather.scores.uv_risk.score,
      airQuality: userResponse.data.user_data.weather.scores.air_quality.score,
      waterHardness:
        userResponse.data.user_data.weather.scores.water_hardness.score,
      humidity: userResponse.data.user_data.weather.scores.humidity.score,
      windSpeed: userResponse.data.user_data.weather.scores.wind_speed.score,
      frontSelfie: userResponse.data.user_data.front_selfie,
      sideSelfie: userResponse.data.user_data.side_selfie,
      afterwash: userResponse.data.user_data.answers.afterwash
    });
  };
  // renderKeys = () => {

  // };

  render() {
    const {
      shampooFormula,
      conditionerFormula,
      // address,
      thickness,
      texture,
      condition,
      hairGoals,
      hairGoals2,
      age,
      diet,
      zip,
      city,
      frontSelfie,
      sideSelfie,
      afterwash,
      uvRisk,
      airQuality,
      waterHardness,
      humidity,
      windSpeed
    } = this.state;
    console.log(city);
    const { name, address, orderId } = this.props.location.state;

    const { photoIndex, isOpen } = this.state;
    const images = [frontSelfie, sideSelfie];
    // console.log(shampooFormula);

    const formulaKeys = () => {
      const scores = [];
      for (let key of Object.keys(shampooFormula)) {
        scores.push(parseInt(shampooFormula[key]));
        console.log(scores.sort((a, b) => b - a));
        return scores[0] === shampooFormula[key] ? console.log(key) : "";
      }
      // console.log(scores);
      //sort the array of values of skeleton scores
    };
    // formulaKeys();
    return (
      <div>
        <Link to="/stylist-panel-list">
          <button id="list-view-btn">← LIST VIEW</button>
        </Link>
        <RingLoader
          css={override}
          size={150}
          //size={"150px"} this also works
          color={"#000000"}
          loading={this.state.loading}
        />
        <Fade big>
          <Paper elevation={1}>
            <div className="stylist-panel-customer">
              <div className="column-title">Customer</div>
              <div className="column-title">Order</div>
              <div className="column-title">Status</div>
              <div className="info-container-1">
                NAME: <br />
                {name}
                <br />
                {address}
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
                CITY: {city}
                (UV: {uvRisk}; AIR QUALITY: {airQuality}; WATER PH:{" "}
                {waterHardness}; HUMIDITY: {humidity}; WIND: {windSpeed})
                <br />
                <br /># AFTERWASH PRODUCTS: {afterwash}
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
              <div className="info-container">SKELETON:</div>
              <div className="info-container">SKELETON</div>
              <div id="logout-approve-btn">
                <div style={{ paddingRight: `${5}%` }}>
                  <button>APPROVE</button>
                </div>
              </div>
            </div>
          </Paper>
        </Fade>
      </div>
    );
  }
}
