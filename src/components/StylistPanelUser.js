import React, { Component } from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { css } from "@emotion/core";

import axios from "axios";
import aws4 from "aws4";

import { Carousel } from "react-responsive-carousel";
import { RingLoader, PulseLoader } from "react-spinners";
import { Paper } from "@material-ui/core";

import noPhoto from "../assets/no-photo.png";

import "../styles/Panel.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";

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

export default class StylistPanelUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      collectionLoading: true,
      photoIndex: 0,
      isOpen: false,
      userCode: ""
    };
  }

  async componentDidMount() {
    await this.fetchUserCodeData();
    await this.formulaKeys();
  }

  fetchUserCodeData = async () => {
    let userResponse = await axios.get(
      // https://fekk.ai/backend/get_formula?user_code=
      `https://fekkai-backend-qa.herokuapp.com/backend/formula?user_code=${this.props.location.state.userCode}`
    );
    await this.setState({
      loading: false,
      thickness: userResponse.data.user_data.answers.hair_thickness,
      texture: parseInt(userResponse.data.user_data.answers.hair_texture),
      length: parseInt(userResponse.data.user_data.answers.hair_length),
      hairCondition: userResponse.data.user_data.answers.hair_condition,
      hairGoals: userResponse.data.user_data.answers.hair_goals,
      zip: userResponse.data.user_data.answers.zipcode
        ? userResponse.data.user_data.answers.zipcode
        : "n/a",
      city: !userResponse.data.user_data.weather
        ? "n/a"
        : userResponse.data.user_data.weather.city,
      uvRisk: !userResponse.data.user_data.weather
        ? "n/a"
        : userResponse.data.user_data.weather.scores.uv_risk.score
        ? userResponse.data.user_data.weather.scores.uv_risk.score
        : userResponse.data.user_data.weather.scores.uv_risk,
      airQuality: !userResponse.data.user_data.weather
        ? "n/a"
        : userResponse.data.user_data.weather.scores.air_quality.score
        ? userResponse.data.user_data.weather.scores.air_quality.score
        : userResponse.data.user_data.weather.scores.air_quality,
      waterHardness: !userResponse.data.user_data.weather
        ? "n/a"
        : userResponse.data.user_data.weather.scores.water_hardness.score
        ? userResponse.data.user_data.weather.scores.water_hardness.score
        : userResponse.data.user_data.weather.scores.water_hardness,
      humidity: !userResponse.data.user_data.weather
        ? "n/a"
        : userResponse.data.user_data.weather.scores.humidity.score
        ? userResponse.data.user_data.weather.scores.humidity.score
        : userResponse.data.user_data.weather.scores.humidity,
      windSpeed: !userResponse.data.user_data.weather
        ? "n/a"
        : userResponse.data.user_data.weather.scores.wind_speed.score
        ? userResponse.data.user_data.weather.scores.wind_speed.score
        : userResponse.data.user_data.weather.scores.wind_speed,
      frontSelfie: userResponse.data.user_data.front_selfie
    });
  };

  formulaKeys = () => {
    const shampooFormulaData = this.state.shampooFormula;
    const shampooScores = [];
    const conditionerScores = [];
    const skeletons = [
      // "volume1",
      // "colorprotect1",
      // "moisture1",
      // "repair1",
      // "blond1"
      "moi1_SH",
      "moi1_CN",
      "rep1_SH",
      "rep1_CN",
      "moi1_TH",
      "vol1_SH",
      "vol1_CN",
      "vol1_TH",
      "col1_SH",
      "col1_CN",
      "col1_TH"
    ];
    let shampooKey;
    let shampooValue;
    let conditionerKey;
    let conditionerValue;

    // console.log(recoFormula, conditionerFormulaData);

    for (let key in shampooFormulaData) {
      if (skeletons.indexOf(key) > -1) {
        console.log(skeletons);
        shampooScores.push(shampooFormulaData[key]);
        shampooScores.sort((a, b) => b - a);
      }
      if (shampooScores[0] === shampooFormulaData[key]) {
        console.log(shampooScores);
        shampooKey = key;
        shampooValue = shampooFormulaData[key];
      }
    }
    shampooScores.sort((a, b) => b - a);

    for (let key in shampooFormulaData) {
      if (skeletons.indexOf(key) > -1) {
        conditionerScores.push(shampooFormulaData[key]);
        conditionerScores.sort((a, b) => b - a);
      }
      if (conditionerScores[0] === shampooFormulaData[key]) {
        conditionerKey = key;
        conditionerValue = shampooFormulaData[key];
      }
    }
    conditionerScores.sort((a, b) => b - a);
    this.setState({
      collectionLoading: false,
      shampooKey,
      shampooValue,
      conditionerKey,
      conditionerValue
    });
  };

  render() {
    const {
      userCode,
      name,
      locale,
      email,
      hairThickness,
      hairTexture,
      hairCondition,
      hairGoals,
      hairColor,
      hairLength,
      city,
      uvRisk,
      airQuality,
      waterHardness,
      humidity,
      windSpeed,
      shampooKey,
      conditionerKey,
      thirdKey,
      frontSelfie,
      page
    } = this.props.location.state;
    console.log(frontSelfie);
    return (
      <div>
        <Link to="/stylist-panel-list">
          <button id="list-view-btn">← LIST</button>
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
              <div className="column-title">CUSTOMER</div>
              <div className="column-title"></div>
              <div className="column-title"></div>
              <div className="info-container-1">
                NAME: {name}
                <br />
                EMAIL: {email}
                <br />
                USER CODE: {userCode}
              </div>
              <div className="info-container-1 hidden"></div>
              <div className="info-container-1 hidden">
                <br />
                <br />
              </div>
            </div>
          </Paper>

          <Paper elevation={1}>
            <div className="stylist-panel-customer">
              <div className="column-title">CHARACTERISTICS</div>
              <div className="column-title hidden">PROFILE</div>
              <div className="column-title hidden">SELFIE</div>
              <div className="info-container info-container2">
                THICKNESS:{" "}
                {/* {thickness
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
                  : ""} */}
                {hairThickness ? hairThickness : "n/a"}
                <br />
                <br />
                TEXTURE:{" "}
                {/* {texture
                  ? texture === 1
                    ? "straight"
                    : "" || texture === 2
                    ? "wavy"
                    : "" || texture === 3
                    ? "curly"
                    : "" || texture === 4
                    ? "coily"
                    : ""
                  : "n/a"} */}
                {hairTexture ? hairTexture : "n/a"}
                <br />
                <br />
                COLOR:{" "}
                {/* {!hairColor
                  ? ""
                  : hairColor === 1
                  ? "blonde"
                  : "" || hairColor === 2
                  ? "brown"
                  : "" || hairColor === 3
                  ? "black"
                  : "" || hairColor === 4
                  ? "red"
                  : "" || hairColor === 5
                  ? "silver"
                  : "" || hairColor === 6
                  ? "rainbow"
                  : "" || hairColor === 7
                  ? "highlighted"
                  : ""} */}
                {hairColor ? hairColor : "n/a"}
                <br />
                <br />
                HAIR LENGTH:{" "}
                {/* {length
                  ? length === 1
                    ? "short"
                    : "" || length === 2
                    ? "chin length"
                    : "" || length === 3
                    ? "shoulder length"
                    : "" || length === 4
                    ? "long"
                    : ""
                  : "n/a"} */}
                {hairLength ? hairLength : "n/a"}
                <br />
                <br />
                CONDITION:{" "}
                {!hairCondition
                  ? "n/a"
                  : hairCondition === "none"
                  ? ""
                  : hairCondition.join(", ")}
                <br />
                <br />
                MAIN GOALS:{" "}
                {!hairGoals || hairGoals === "none"
                  ? "n/a"
                  : hairGoals.join(", ")}
                <br />
                <br />
              </div>

              <div className="info-container">
                CITY: {!city ? "n/a" : city} <br />
                <br /> UV: {!uvRisk ? "n/a" : uvRisk};<br />
                <br />
                AIR QUALITY: {!airQuality ? "n/a" : airQuality};<br />
                <br /> WATER PH: {!waterHardness ? "n/a" : waterHardness};<br />
                <br /> HUMIDITY: {!humidity ? "n/a" : humidity};<br />
                <br /> WIND: {!windSpeed ? "n/a" : windSpeed};
                <br />
              </div>

              <div className="selfie-container">
                {/* <Carousel showThumbs={false} showIndicators={false}> */}
                <div>
                  {frontSelfie ? (
                    <img id="selfie" alt={frontSelfie} src={frontSelfie} />
                  ) : (
                    <img
                      id="selfie"
                      style={{ height: "100%" }}
                      alt={noPhoto}
                      src={noPhoto}
                    />
                  )}
                </div>
                {/* </Carousel> */}
              </div>
            </div>
          </Paper>
          <Paper elevation={1}>
            <div className="stylist-panel-customer">
              <div className="column-title mobile">FORMULAS</div>
              <div className="column-title hidden">SHAMPOO</div>
              <div className="column-title hidden">CONDITIONER</div>
              <div className="column-title hidden">THIRD</div>
              <div className="info-container">
                RECO COLLECTION<span class="mobile"> SHAMPOO:</span>
                <b>
                  {this.state.collectionLoading ? (
                    <PulseLoader />
                  ) : shampooKey ? (
                    shampooKey === "vol1_SH" ? (
                      "Full Blown (Lightest Weight)"
                    ) : "" || shampooKey === "col1_SH" ? (
                      "Technician Color (Medium Moisture)"
                    ) : "" || shampooKey === "moi1_SH" ? (
                      "Brilliant Gloss (Medium Moisture)"
                    ) : "" || shampooKey === "rep1_SH" ? (
                      "Super Strength (Strong Moisture)"
                    ) : "" || shampooKey === "bl1_SH" ? (
                      "Baby Blonde (Medium Moisture)"
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </b>
              </div>
              <div className="info-container">
                RECO COLLECTION<span class="mobile"> CONDITIONER:</span>
                <b>
                  {this.state.collectionLoading ? (
                    <PulseLoader />
                  ) : conditionerKey ? (
                    conditionerKey === "vol1_CN" ? (
                      "Full Blown (Lightest Weight)"
                    ) : "" || conditionerKey === "col1_CN" ? (
                      "Technician Color (Medium Moisture)"
                    ) : "" || conditionerKey === "moi1_CN" ? (
                      "Brilliant Gloss (Medium Moisture)"
                    ) : "" || conditionerKey === "rep1_CN" ? (
                      "Super Strength (Strong Moisture)"
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </b>
              </div>
              <div className="info-container">
                RECO COLLECTION<span class="mobile"> THIRD:</span>
                <b>
                  {this.state.collectionLoading ? (
                    <PulseLoader />
                  ) : thirdKey ? (
                    thirdKey === "vol1_TH" ? (
                      "Full Blown (Lightest Weight)"
                    ) : "" || thirdKey === "col1_TH" ? (
                      "Technician Color (Medium Moisture)"
                    ) : "" || thirdKey === "moi1_TH" ? (
                      "Brilliant Gloss (Medium Moisture)"
                    ) : "" || thirdKey === "rep1_TH" ? (
                      "Super Strength (Strong Moisture)"
                    ) : "" || thirdKey === "bl1_TH" ? (
                      "Baby Blonde (Medium Moisture)"
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </b>
              </div>
            </div>
          </Paper>
        </Fade>
      </div>
    );
  }
}
