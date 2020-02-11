import React, { Component } from "react";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import { css } from "@emotion/core";

import axios from "axios";
import aws4 from "aws4";

import "react-responsive-carousel/lib/styles/carousel.min.css";

import { Carousel } from "react-responsive-carousel";
import { RingLoader, PulseLoader } from "react-spinners";
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
      `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${this.props.location.state.userCode}`
    );
    console.log(userResponse.data.ingredients.shampoo.formula);
    await this.setState({
      loading: false,
      thickness: parseInt(userResponse.data.user_data.answers.hair_thickness),
      texture: parseInt(userResponse.data.user_data.answers.hair_texture),
      length: parseInt(userResponse.data.user_data.answers.hair_length),
      condition: userResponse.data.user_data.answers["hair-condition"],
      hairGoals: userResponse.data.user_data.answers["hair-goals"],
      zip: userResponse.data.user_data.answers.zipcode
        ? userResponse.data.user_data.answers.zipcode
        : "N/A",
      city: !userResponse.data.user_data.weather
        ? "N/A"
        : userResponse.data.user_data.weather.city,
      uvRisk: !userResponse.data.user_data.weather
        ? "N/A"
        : userResponse.data.user_data.weather.scores.uv_risk.score
        ? userResponse.data.user_data.weather.scores.uv_risk.score
        : userResponse.data.user_data.weather.scores.uv_risk,
      airQuality: !userResponse.data.user_data.weather
        ? "N/A"
        : userResponse.data.user_data.weather.scores.air_quality.score
        ? userResponse.data.user_data.weather.scores.air_quality.score
        : userResponse.data.user_data.weather.scores.air_quality,
      waterHardness: !userResponse.data.user_data.weather
        ? "N/A"
        : userResponse.data.user_data.weather.scores.water_hardness.score
        ? userResponse.data.user_data.weather.scores.water_hardness.score
        : userResponse.data.user_data.weather.scores.water_hardness,
      humidity: !userResponse.data.user_data.weather
        ? "N/A"
        : userResponse.data.user_data.weather.scores.humidity.score
        ? userResponse.data.user_data.weather.scores.humidity.score
        : userResponse.data.user_data.weather.scores.humidity,
      windSpeed: !userResponse.data.user_data.weather
        ? "N/A"
        : userResponse.data.user_data.weather.scores.wind_speed.score
        ? userResponse.data.user_data.weather.scores.wind_speed.score
        : userResponse.data.user_data.weather.scores.wind_speed,
      frontSelfie: userResponse.data.user_data.front_selfie,
      shampooFormula: userResponse.data.ingredients.shampoo.formula,
      conditionerFormula: userResponse.data.ingredients.conditioner.formula,
      // recoFormula: userResponse.data.ingredients.reco.formula
    });
  };

  formulaKeys = () => {
    const recoFormula = this.state.recoFormula;
    const shampooFormulaData = this.state.shampooFormula;
    const conditionerFormulaData = this.state.conditionerFormula;
    const shampooScores = [];
    const conditionerScores = [];
    const skeletons = [
      "volume1",
      "colorprotect1",
      "moisture1",
      "repair1",
      "blond1"
    ];
    let shampooSkeletonKey;
    let shampooSkeletonValue;
    let conditionerSkeletonKey;
    let conditionerSkeletonValue;

    // console.log(recoFormula, conditionerFormulaData);

    for (let key in shampooFormulaData) {
      if (skeletons.indexOf(key) > -1) {
        console.log(skeletons);
        shampooScores.push(shampooFormulaData[key]);
        shampooScores.sort((a, b) => b - a);
      }
      if (shampooScores[0] === shampooFormulaData[key]) {
        console.log(shampooScores);
        shampooSkeletonKey = key;
        shampooSkeletonValue = shampooFormulaData[key];
      }
    }
    shampooScores.sort((a, b) => b - a);

    for (let key in shampooFormulaData) {
      if (skeletons.indexOf(key) > -1) {
        conditionerScores.push(shampooFormulaData[key]);
        conditionerScores.sort((a, b) => b - a);
      }
      if (conditionerScores[0] === shampooFormulaData[key]) {
        conditionerSkeletonKey = key;
        conditionerSkeletonValue = shampooFormulaData[key];
      }
    }
    conditionerScores.sort((a, b) => b - a);
    console.log(shampooSkeletonKey);
    this.setState({
      collectionLoading: false,
      shampooSkeletonKey,
      shampooSkeletonValue,
      conditionerSkeletonKey,
      conditionerSkeletonValue
    });
  };

  render() {
    const {
      thickness,
      texture,
      condition,
      hairGoals,
      length,
      city,
      frontSelfie,
      uvRisk,
      airQuality,
      waterHardness,
      humidity,
      windSpeed
    } = this.state;

    const { userCode, locale } = this.props.location.state;
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
              <div className="column-title"></div>
              <div className="column-title"></div>
              <div className="info-container-1">USER CODE: {userCode}</div>
              <div className="info-container-1"></div>
              <div className="info-container-1">
                <br />
                <br />
              </div>
            </div>
          </Paper>

          <Paper elevation={1}>
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
                  : "N/A"}
                <br />
                <br />
                HAIR LENGTH:{" "}
                {length
                  ? length === 1
                    ? "short"
                    : "" || length === 2
                    ? "chin length"
                    : "" || length === 3
                    ? "shoulder length"
                    : "" || length === 4
                    ? "long"
                    : ""
                  : "N/A"}
                <br />
                <br />
                CONDITION: {condition ? condition.join(", ") : ""}
                <br />
                <br />
                MAIN GOALS: {hairGoals ? hairGoals.join(", ") : ""}
                <br />
                <br />
              </div>

              <div className="info-container">
                CITY: {city} (UV: {uvRisk}; AIR QUALITY: {airQuality}; WATER PH:{" "}
                {waterHardness}; HUMIDITY: {humidity}; WIND: {windSpeed})
                <br />
              </div>

              <div className="selfie-container" style={{ margin: `${0} auto` }}>
                <Carousel
                  style={{ margin: `${0} auto` }}
                  showThumbs={false}
                  showIndicators={false}
                >
                  <div style={{ margin: `${0} auto` }}>
                    <img
                      alt={frontSelfie}
                      style={{ width: `${85}%` }}
                      src={frontSelfie}
                    />
                  </div>
                </Carousel>
              </div>
            </div>
          </Paper>
          <Paper elevation={1}>
            <div className="stylist-panel-customer">
              <div className="column-title">SHAMPOO</div>
              <div className="column-title">CONDITIONER</div>
              <div className="column-title">MASK</div>
              <div className="info-container">
                RECO COLLECTION:
                <br />{" "}
                {this.state.collectionLoading ? (
                  <PulseLoader />
                ) : this.state.shampooSkeletonKey ? (
                  this.state.shampooSkeletonKey === "volume1" ? (
                    "Full Blown (Lightest Weight)"
                  ) : "" ||
                    this.state.shampooSkeletonKey === "colorprotect1" ? (
                    "Technician Color (Medium Moisture)"
                  ) : "" || this.state.shampooSkeletonKey === "moisture1" ? (
                    "Brilliant Shine (Medium Moisture)"
                  ) : "" || this.state.shampooSkeletonKey === "repair1" ? (
                    "Super Strength (Strong Moisture)"
                  ) : "" || this.state.conditionerSkeletonKey === "blond1" ? (
                    "Baby Blonde (Medium Moisture)"
                  ) : (
                    ""
                  )
                ) : (
                  "" + " "
                )}
              </div>
              <div className="info-container">
                RECO COLLECTION:
                <br />{" "}
                {this.state.collectionLoading ? (
                  <PulseLoader />
                ) : this.state.conditionerSkeletonKey ? (
                  this.state.conditionerSkeletonKey === "volume1" ? (
                    "Full Blown (Lightest Weight)"
                  ) : "" ||
                    this.state.conditionerSkeletonKey === "colorprotect1" ? (
                    "Technician Color (Medium Moisture)"
                  ) : "" ||
                    this.state.conditionerSkeletonKey === "moisture1" ? (
                    "Brilliant Shine (Medium Moisture)"
                  ) : "" || this.state.conditionerSkeletonKey === "repair1" ? (
                    "Super Strength (Strong Moisture)"
                  ) : "" || this.state.conditionerSkeletonKey === "blond1" ? (
                    "Baby Blonde (Medium Moisture)"
                  ) : (
                    ""
                  )
                ) : (
                  "" + " "
                )}
              </div>
              <div className="info-container">
                RECO COLLECTION:
                <br />{" "}
                {this.state.collectionLoading ? (
                  <PulseLoader />
                ) : this.state.shampooSkeletonKey ? (
                  this.state.shampooSkeletonKey === "volume1" ? (
                    "Full Blown (Lightest Weight)"
                  ) : "" ||
                    this.state.shampooSkeletonKey === "colorprotect1" ? (
                    "Technician Color (Medium Moisture)"
                  ) : "" || this.state.shampooSkeletonKey === "moisture1" ? (
                    "Brilliant Shine (Medium Moisture)"
                  ) : "" || this.state.shampooSkeletonKey === "repair1" ? (
                    "Super Strength (Strong Moisture)"
                  ) : "" || this.state.shampooSkeletonKey === "blond1" ? (
                    "Baby Blonde (Medium Moisture)"
                  ) : (
                    ""
                  )
                ) : (
                  "" + " "
                )}
              </div>
              {/* <div style={{ paddingRight: `${5}%` }}>Mask Placeholder</div> */}
            </div>
          </Paper>
        </Fade>
      </div>
    );
  }
}

// import React, { Component } from "react";
// import { Link } from "react-router-dom";
// import Fade from "react-reveal/Fade";

// import { css } from "@emotion/core";

// import axios from "axios";
// import aws4 from "aws4";

// import "react-responsive-carousel/lib/styles/carousel.min.css";

// import { Carousel } from "react-responsive-carousel";
// import { RingLoader, PulseLoader } from "react-spinners";
// import { Paper } from "@material-ui/core";

// // import "../styles/Panel.scss";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
//   margin-top: ${7}%;
// `;

// let request = {
//   hostname: "5qdtfxj5j5.execute-api.us-east-1.amazonaws.com",
//   method: "GET",
//   url: "https://5qdtfxj5j5.execute-api.us-east-1.amazonaws.com/latest",
//   path: "/latest"
// };

// let signedRequest = aws4.sign(request, {
//   accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID,
//   secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY
// });

// delete signedRequest.headers["Host"];
// delete signedRequest.headers["Content-Length"];

// export default class StylistPanelCustomer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       loading: true,
//       collectionLoading: true,
//       photoIndex: 0,
//       isOpen: false,
//       userCode: ""
//     };
//   }

//   async componentDidMount() {
//     await this.fetchUserCodeData();
//     await this.formulaKeys();
//   }

//   fetchUserCodeData = async () => {
//     let userResponse = await axios.get(
//       // https://fekk.ai/backend/get_formula?user_code=
//       `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${this.props.location.state.userCode}`
//     );
//     await this.setState({
//       loading: false,
//       thickness: parseInt(userResponse.data.user_data.answers.hair_thickness),
//       texture: parseInt(userResponse.data.user_data.answers.hair_texture),
//       length: parseInt(userResponse.data.user_data.answers.hair_length),
//       condition: userResponse.data.user_data.answers["hair-condition"],
//       hairGoals: userResponse.data.user_data.answers["hair-goals"],
//       zip: userResponse.data.user_data.answers.zipcode
//         ? userResponse.data.user_data.answers.zipcode
//         : "N/A",
//       city: !userResponse.data.user_data.weather
//         ? "N/A"
//         : userResponse.data.user_data.weather.city,
//       uvRisk: !userResponse.data.user_data.weather
//         ? "N/A"
//         : userResponse.data.user_data.weather.scores.uv_risk.score
//         ? userResponse.data.user_data.weather.scores.uv_risk.score
//         : userResponse.data.user_data.weather.scores.uv_risk,
//       airQuality: !userResponse.data.user_data.weather
//         ? "N/A"
//         : userResponse.data.user_data.weather.scores.air_quality.score
//         ? userResponse.data.user_data.weather.scores.air_quality.score
//         : userResponse.data.user_data.weather.scores.air_quality,
//       waterHardness: !userResponse.data.user_data.weather
//         ? "N/A"
//         : userResponse.data.user_data.weather.scores.water_hardness.score
//         ? userResponse.data.user_data.weather.scores.water_hardness.score
//         : userResponse.data.user_data.weather.scores.water_hardness,
//       humidity: !userResponse.data.user_data.weather
//         ? "N/A"
//         : userResponse.data.user_data.weather.scores.humidity.score
//         ? userResponse.data.user_data.weather.scores.humidity.score
//         : userResponse.data.user_data.weather.scores.humidity,
//       windSpeed: !userResponse.data.user_data.weather
//         ? "N/A"
//         : userResponse.data.user_data.weather.scores.wind_speed.score
//         ? userResponse.data.user_data.weather.scores.wind_speed.score
//         : userResponse.data.user_data.weather.scores.wind_speed,
//       frontSelfie: userResponse.data.user_data.front_selfie,
//       shampooFormula: userResponse.data.ingredients.shampoo.formula,
//       conditionerFormula: userResponse.data.ingredients.conditioner.formula,
//       recoFormula: userResponse.data.ingredients.reco.formula
//     });
//   };

//   formulaKeys = () => {
//     const shampooFormulaData = this.state.shampooFormula;
//     const conditionerFormulaData = this.state.conditionerFormula;
//     const recoFormula = this.state.recoFormula;
//     console.log(recoFormula)
//     const shampooScores = [];
//     const conditionerScores = [];
//     const skeletons = [
//       "volume1",
//       "colorprotect1",
//       "moisture1",
//       "repair1",
//       "blond1"
//     ];
//     let shampooSkeletonKey;
//     let shampooSkeletonValue;
//     let conditionerSkeletonKey;
//     let conditionerSkeletonValue;

//     for (let key in recoFormula) {
//       if (skeletons.indexOf(key) > -1) {
//         shampooScores.push(parseInt(recoFormula[key]));
//         shampooScores.sort((a, b) => b - a);
//       }
//       if (shampooScores[0] === recoFormula[key]) {
//         shampooSkeletonKey = key;
//         shampooSkeletonValue = recoFormula[key];
//       }
//     }
//     shampooScores.sort((a, b) => b - a);
//     console.log(shampooScores, shampooSkeletonKey)

//     for (let key in recoFormula) {
//       if (skeletons.indexOf(key) > -1) {
//         conditionerScores.push(parseInt(recoFormula[key]));
//         conditionerScores.sort((a, b) => b - a);
//       }
//       if (conditionerScores[0] === recoFormula[key]) {
//         conditionerSkeletonKey = key;
//         conditionerSkeletonValue = recoFormula[key];
//       }
//     }
//     conditionerScores.sort((a, b) => b - a);

//     this.setState({
//       collectionLoading: false,
//       shampooSkeletonKey,
//       shampooSkeletonValue,
//       conditionerSkeletonKey,
//       conditionerSkeletonValue
//     });
//   };

//   render() {
//     const {
//       thickness,
//       texture,
//       condition,
//       hairGoals,
//       length,
//       city,
//       frontSelfie,
//       uvRisk,
//       airQuality,
//       waterHardness,
//       humidity,
//       windSpeed
//     } = this.state;

//     const { userCode, locale } = this.props.location.state;
//     return (
//       <div>
//         <Link to="/stylist-panel-list">
//           <button id="list-view-btn">← LIST VIEW</button>
//         </Link>
//         <RingLoader
//           css={override}
//           size={150}
//           //size={"150px"} this also works
//           color={"#000000"}
//           loading={this.state.loading}
//         />
//         <Fade big>
//           <Paper elevation={1}>
//             <div className="stylist-panel-customer">
//               <div className="column-title">Customer</div>
//               <div className="column-title"></div>
//               <div className="column-title"></div>
//               <div className="info-container-1">USER CODE: {userCode}</div>
//               <div className="info-container-1"></div>
//               <div className="info-container-1">
//                 <br />
//                 <br />
//               </div>
//             </div>
//           </Paper>

//           <Paper elevation={1}>
//             <div className="stylist-panel-customer">
//               <div className="column-title">Characteristics</div>
//               <div className="column-title">Profile</div>
//               <div className="column-title">Selfie</div>
//               <div className="info-container info-container2">
//                 THICKNESS:{" "}
//                 {thickness
//                   ? thickness === 1
//                     ? "finest"
//                     : "" || thickness === 2
//                     ? "finer"
//                     : "" || thickness === 3
//                     ? "fine"
//                     : "" || thickness === 4
//                     ? "medium"
//                     : "" || thickness === 5
//                     ? "thick"
//                     : "" || thickness === 6
//                     ? "thicker"
//                     : "" || thickness === 7
//                     ? "thickest"
//                     : ""
//                   : ""}
//                 <br />
//                 <br />
//                 TEXTURE:{" "}
//                 {texture
//                   ? texture === 1
//                     ? "straight"
//                     : "" || texture === 2
//                     ? "wavy"
//                     : "" || texture === 3
//                     ? "curly"
//                     : "" || texture === 4
//                     ? "coily"
//                     : ""
//                   : "N/A"}
//                 <br />
//                 <br />
//                 HAIR LENGTH:{" "}
//                 {length
//                   ? length === 1
//                     ? "short"
//                     : "" || length === 2
//                     ? "chin length"
//                     : "" || length === 3
//                     ? "shoulder length"
//                     : "" || length === 4
//                     ? "long"
//                     : ""
//                   : "N/A"}
//                 <br />
//                 <br />
//                 CONDITION: {condition ? condition.join(", ") : ""}
//                 <br />
//                 <br />
//                 MAIN GOALS: {hairGoals ? hairGoals.join(", ") : ""}
//                 <br />
//                 <br />
//               </div>

//               <div className="info-container">
//                 CITY: {city} (UV: {uvRisk}; AIR QUALITY: {airQuality}; WATER PH:{" "}
//                 {waterHardness}; HUMIDITY: {humidity}; WIND: {windSpeed})
//                 <br />
//               </div>

//               <div className="selfie-container" style={{ margin: `${0} auto` }}>
//                 <Carousel
//                   style={{ margin: `${0} auto` }}
//                   showThumbs={false}
//                   showIndicators={false}
//                 >
//                   <div style={{ margin: `${0} auto` }}>
//                     <img
//                       alt={frontSelfie}
//                       style={{ width: `${85}%` }}
//                       src={frontSelfie}
//                     />
//                   </div>
//                 </Carousel>
//               </div>
//             </div>
//           </Paper>
//           <Paper elevation={1}>
//             <div className="stylist-panel-customer">
//               <div className="column-title">SHAMPOO</div>
//               <div className="column-title">CONDITIONER</div>
//               <div className="column-title">MASK</div>
//               <div className="info-container">
//                 RECO COLLECTION:
//                 <br />{" "}
//                 {this.state.collectionLoading ? (
//                   <PulseLoader />
//                 ) : this.state.shampooSkeletonKey ? (
//                   this.state.shampooSkeletonKey === "volume1" ? (
//                     "Full Blown (Lightest Weight)"
//                   ) : "" ||
//                     this.state.shampooSkeletonKey === "colorprotect1" ? (
//                     "Technician Color (Medium Moisture)"
//                   ) : "" || this.state.shampooSkeletonKey === "moisture1" ? (
//                     "Brilliant Shine (Medium Moisture)"
//                   ) : "" || this.state.shampooSkeletonKey === "repair1" ? (
//                     "Super Strength (Strong Moisture)"
//                   ) : "" || this.state.shampooSkeletonKey === "blond1" ? (
//                     "Baby Blonde (Medium Moisture)"
//                   ) : (
//                     ""
//                   )
//                 ) : (
//                   "" + " "
//                 )}
//               </div>
//               <div className="info-container">
//                 RECO COLLECTION:
//                 <br />{" "}
//                 {this.state.collectionLoading ? (
//                   <PulseLoader />
//                 ) : this.state.conditionerSkeletonKey ? (
//                   this.state.conditionerSkeletonKey === "volume1" ? (
//                     "Full Blown (Lightest Weight)"
//                   ) : "" ||
//                     this.state.conditionerSkeletonKey === "colorprotect1" ? (
//                     "Technician Color (Medium Moisture)"
//                   ) : "" ||
//                     this.state.conditionerSkeletonKey === "moisture1" ? (
//                     "Brilliant Shine (Medium Moisture)"
//                   ) : "" || this.state.conditionerSkeletonKey === "repair1" ? (
//                     "Super Strength (Strong Moisture)"
//                   ) : "" || this.state.conditionerSkeletonKey === "blond1" ? (
//                     "BABY BLONDE (Medium Moisture)"
//                   ) : (
//                     ""
//                   )
//                 ) : (
//                   "" + " "
//                 )}
//               </div>
//               <div className="info-container">
//                 RECO COLLECTION:
//                 <br />{" "}
//                 {this.state.collectionLoading ? (
//                   <PulseLoader />
//                 ) : this.state.shampooSkeletonKey ? (
//                   this.state.shampooSkeletonKey === "volume1" ? (
//                     "Full Blown (Lightest Weight)"
//                   ) : "" || this.state.shampooSkeletonKey === "colorprotect1" ? (
//                     "Technician Color (Medium Moisture)"
//                   ) : "" || this.state.shampooSkeletonKey === "moisture1" ? (
//                     "BRILLIANT GLOSS (Medium Moisture)"
//                   ) : "" || this.state.shampooSkeletonKey === "repair1" ? (
//                     "Super Strength (Strong Moisture)"
//                   ) : "" || this.state.shampooSkeletonKey === "blond1" ? (
//                     "Baby Blond (Medium Moisture)"
//                   ) : (
//                     ""
//                   )
//                 ) : (
//                   "" + " "
//                 )}
//               </div>
//               {/* <div style={{ paddingRight: `${5}%` }}>Mask Placeholder</div> */}
//             </div>
//           </Paper>
//         </Fade>
//       </div>
//     );
//   }
// }
