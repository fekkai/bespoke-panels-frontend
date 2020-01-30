import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";
import { confirmAlert } from "react-confirm-alert";

import { css } from "@emotion/core";

import axios from "axios";
import aws4 from "aws4";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";

import { Carousel } from "react-responsive-carousel";
import { RingLoader } from "react-spinners";
import { Paper, useScrollTrigger } from "@material-ui/core";

import "../styles/Panel.scss";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
  margin-top: ${7}%;
`;

//aws sigv4
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
      orders: "",
      index: 0,
      currentOrder: "",
      name: "",
      address: "",
      orderId: "",
      note_attributes: "",
      loading: true,
      photoIndex: 0,
      isOpen: false,
      userCode: ""
    };
  }

  async componentDidMount() {
    await this.fetchOrders();
    await this.goToNext();
  }

  fetchOrders = async () => {
    try {
      let response = await axios(signedRequest);
      response = JSON.parse(JSON.stringify(response));
      const orders = [];
      for (let order of response.data.orders) {
        orders.push(
          JSON.parse(
            JSON.stringify({
              name: order.shipping_address.name,
              orderId: order.name,
              address:
                order.shipping_address.address1 +
                (order.shipping_address.address2
                  ? " " + order.shipping_address.address2
                  : "") +
                " " +
                order.shipping_address.city +
                " " +
                order.shipping_address.province_code +
                " " +
                order.shipping_address.zip,
              orderNumber: order.order_number,
              userCode: order.note_attributes[0].value
            })
          )
        );
      }
      this.setState({
        orders,
        currentOrder: 0,
        userCode: orders[0].userCode
      });
    } catch (error) {
      console.error(error);
    }
  };

  goToNext = async () => {
    await this.setState({
      index: (this.state.index + 1) % this.state.orders.length,
      name: this.state.orders[this.state.index].name,
      orderId: this.state.orders[this.state.index].orderId,
      address: this.state.orders[this.state.index].address,
      userCode: this.state.orders[this.state.index].userCode
    });
    // console.log(this.state.userCode)
    let userResponse = await axios.get(
      `https://fekk.ai/backend/get_formula?user_code=${this.state.userCode}`
      // `https://fekk.ai/backend/get_formula?user_code=${this.state.orders[0].note_attributes.value}`
    );

    await this.setState(prevState => ({
      userResponse,
      originalShampooFormula: JSON.parse(
        JSON.stringify(userResponse.data.ingredients.shampoo)
      ),
      originalConditionerFormula: JSON.parse(
        JSON.stringify(userResponse.data.ingredients.conditioner)
      ),
      loading: false,
      thickness: userResponse.data.user_data.answers.hair_thickness,
      texture: userResponse.data.user_data.answers.hair_texture,
      condition: userResponse.data.user_data.answers["hair-condition"],
      fragrance: userResponse.data.user_data.answers.fragrance,
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
      afterwash: userResponse.data.user_data.answers.afterwash,
      shampooFormulaData: userResponse.data.ingredients.shampoo.formula,
      conditionerFormulaData: userResponse.data.ingredients.conditioner.formula
    }));

    const formulaKeys = () => {
      // console.log(this.state.shampooFormulaData);
      const shampooFormulaData = this.state.shampooFormulaData;
      const conditionerFormulaData = this.state.conditionerFormulaData;
      // console.log(shampooFormulaData, conditionerFormulaData);
      const shampooScores = [];
      const conditionerScores = [];
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

      for (let key in shampooFormulaData) {
        if (skeletons.indexOf(key) > -1) {
          shampooScores.push(parseInt(shampooFormulaData[key]));
          shampooScores.sort((a, b) => b - a);
        }
        if (shampooScores[0] === shampooFormulaData[key]) {
          shampooSkeletonKey = key;
          shampooSkeletonValue = shampooFormulaData[key];
        }
      }
      shampooScores.sort((a, b) => b - a);

      for (let key in conditionerFormulaData) {
        if (skeletons.indexOf(key) > -1) {
          conditionerScores.push(parseInt(conditionerFormulaData[key]));
          conditionerScores.sort((a, b) => b - a);
        }
        if (conditionerScores[0] === conditionerFormulaData[key]) {
          conditionerSkeletonKey = key;
          conditionerSkeletonValue = conditionerFormulaData[key];
        }
      }
      conditionerScores.sort((a, b) => b - a);

      this.setState({
        shampooSkeletonKey,
        shampooSkeletonValue,
        conditionerSkeletonKey,
        conditionerSkeletonValue
      });
    };

    formulaKeys();
  };

  handleSelectShampoo = e => {
    this.setState({ updatedShampooSkeletonKey: e.target.value });
  };

  selectConditioner = e => {
    this.setState({ updatedConditionerSkeletonKey: e.target.value });
  };

  updateFormula = async () => {
    const {
      updatedShampooSkeletonKey,
      updatedConditionerSkeletonKey,
      shampooFormulaData,
      conditionerFormulaData,
      originalShampooFormula,
      originalConditionerFormula
    } = this.state;
    console.log(shampooFormulaData[updatedShampooSkeletonKey]);
    //make copy of the original formula data, keep to side and use as fallback

    const userResponse = this.state.userResponse.data;
    console.log(userResponse)
    const origShampooFormula = JSON.parse(
      JSON.stringify(originalShampooFormula.formula)
    );
    // console.log(originalShampooFormula.formula, shampooFormulaData);
    if (updatedShampooSkeletonKey) {
      shampooFormulaData[updatedShampooSkeletonKey] = 1000;
    }
    if (updatedConditionerSkeletonKey) {
      conditionerFormulaData[updatedConditionerSkeletonKey] = 1000;
    }
    const updatedShampooFormulaData = shampooFormulaData;
    const updatedConditionerFormulaData = conditionerFormulaData;

    userResponse.ingredients.shampoo.formula = updatedShampooFormulaData;
    userResponse.ingredients.conditioner.formula = updatedConditionerFormulaData;

    // console.log(originalShampooFormula)
    userResponse.ingredients_orig = await {
      shampoo: {
        reasons: originalShampooFormula["reasons"],
        formula: originalShampooFormula["formula"]
      },
      conditioner: {
        reasons: originalConditionerFormula["reasons"],
        formula: originalConditionerFormula["formula"]
      }
    };

    console.log(userResponse);
    this.goToNext();

    await axios.put(
      "https://fekk.ai/backend/formula",
      userResponse
    );
    
    // console.log(updatedResponse);
  };

  submit = () => {
    confirmAlert({
      title: "Confirm to submit",
      message: "Are you sure you want to do this?",
      buttons: [
        {
          label: "YES",
          onClick: () => this.updateFormula()
        },
        {
          label: "NO",
          onClick: () => null
        }
      ]
    });
  };

  render() {
    const { orders } = this.state;

    const {
      shampooFormulaData,
      // conditionerFormulaData,
      // address,
      thickness,
      texture,
      condition,
      fragrance,
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
      windSpeed,
      shampooSkeletonKey,
      shampooSkeletonValue,
      conditionerSkeletonKey,
      conditionerSkeletonValue
    } = this.state;

    // console.log(shampooSkeletonKey);

    // const { address } = this.props.location.state;
    const { name, orderId, address } = this.state;

    const { photoIndex, isOpen } = this.state;
    const images = [frontSelfie, sideSelfie];

    return (
      <div>
        {/* <Link to="/stylist-panel-list">
          <button id="list-view-btn">LIST VIEW</button>
        </Link> */}
        {this.state.loading === true ? (
          <RingLoader
            css={override}
            size={150}
            //size={"150px"} this also works
            color={"#000000"}
            loading={this.state.loading}
          />
        ) : (
          <Fade big>
            <Paper elevation={1}>
              <div className="stylist-panel-customer">
                <div className="column-title">Customer</div>
                <div className="column-title">Order</div>
                <div className="column-title">Status</div>
                <div className="info-container-1">
                  NAME: {name}
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
                  FRAGRANCE: {fragrance}
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
              <div id="formula-container" className="stylist-panel-customer">
                <div className="column-title">Shampoo</div>
                <div className="column-title">Conditioner</div>
                <div className="info-container"></div>
                <div className="info-container">
                  <div class="edit">
                    SKELETON:
                    <select onChange={this.handleSelectShampoo}>
                      <option
                        selected={
                          shampooSkeletonKey === "volume1" ? true : false
                        }
                        value="volume1"
                      >
                        Full Blown (Lightest Weight)
                      </option>
                      <option
                        selected={
                          shampooSkeletonKey === "colorprotect1" ? true : false
                        }
                        value="colorprotect1"
                      >
                        Technician Color (Medium Moisture)
                      </option>
                      <option
                        selected={
                          shampooSkeletonKey === "moisture1" ? true : false
                        }
                        value="moisture1"
                      >
                        Brilliant Shine (Medium Moisture)
                      </option>
                      <option
                        selected={
                          shampooSkeletonKey === "repair1" ? true : false
                        }
                        value="repair1"
                      >
                        Super Strength (Strong Moisture)
                      </option>
                      <option
                        selected={
                          shampooSkeletonKey === "smooth1" ? true : false
                        }
                        value="smooth1"
                      >
                        Smoothing 'Essential Shea' (Heavy)
                      </option>
                    </select>
                    <br />
                    <br />
                    BOOSTERS:
                    <br />
                    <br />
                    <form>
                      <div class="booster-container">
                        <div class="booster-list">
                          <input
                            type="checkbox"
                            name="pollution1"
                            value="pollution1"
                            checked={true}
                          />
                          Pollution Fighting
                          <br />
                          <input type="checkbox" name="uv1" value="uv1" />
                          Ultra Violet Protection
                          <br />
                          <input type="checkbox" name="water1" value="water1" />
                          Water Hardness
                          <br />
                          <input
                            type="checkbox"
                            name="afterwash1"
                            value="afterwash1"
                          />
                          AfterWash1
                          <br />
                          <input
                            type="checkbox"
                            name="afterwash2"
                            value="afterwash2"
                          />
                          AfterWash2
                          <br />
                          <input type="checkbox" name="age1" value="age1" />
                          Age
                          <br />
                          <input type="checkbox" name="diet1" value="diet1" />
                          Diet
                          <br />
                          <input type="checkbox" name="heat1" value="heat1" />
                          Heat Protection
                          <br />
                          <input
                            type="checkbox"
                            name="balancing1"
                            value="balancing1"
                          />
                          Scalp Balancing
                          <br />
                          <input
                            type="checkbox"
                            name="soothing1"
                            value="soothing1"
                          />
                          Scalp Soothing
                          <br />
                          <input
                            type="checkbox"
                            name="toning1"
                            value="toning1"
                          />
                          Scalp Toning
                        </div>

                        <div className="booster-list">
                          <input
                            type="checkbox"
                            name="texture1"
                            value="texture1"
                          />
                          Curly Textures
                          <br />
                          <input
                            type="checkbox"
                            name="volume2"
                            value="volume2"
                          />
                          Volume/Thickness
                          <br />
                          <input type="checkbox" name="color2" value="color2" />
                          Color Protection (Sun)
                          <br />
                          <input
                            type="checkbox"
                            name="moisture2"
                            value="moisture2"
                          />
                          Brilliant Shine Moisture
                          <br />
                          <input
                            type="checkbox"
                            name="repair2"
                            value="repair2"
                          />
                          Super Strength (Chemical)
                          <br />
                          <input
                            type="checkbox"
                            name="repair3"
                            value="repair3"
                          />
                          Super Strength (Protein for Diet)
                          <br />
                          <input
                            type="checkbox"
                            name="smooth2"
                            value="smooth2"
                          />
                          Smoothing <br />
                          <input type="checkbox" name="swim1" value="swim1" />
                          Frequent Swimming <br />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="info-container">
                  <div class="edit">
                    SKELETON:
                    {/* readable skeleton formula names: */}
                    {/* {(conditionerSkeletonKey
                    ? conditionerSkeletonKey === "volume1"
                      ? "Full Blown (Lightest Weight)"
                      : "" || conditionerSkeletonKey === "colorprotect1"
                      ? "Technician Color (Medium Moisture)"
                      : "" || conditionerSkeletonKey === "moisture1"
                      ? "Brilliant Shine (Medium Moisture)"
                      : "" || conditionerSkeletonKey === "repair1"
                      ? "Super Strength (Strong Moisture)"
                      : "" || conditionerSkeletonKey === "smooth1"
                      ? "Smoothing 'Essential Shea' (Heavy)"
                      : ""
                    : "" + " ") +
                    " " +
                    conditionerSkeletonValue} */}
                    {/* <div className='custom-select'> */}
                    <select
                      style={{ margin: "0" }}
                      onChange={this.selectConditioner}
                    >
                      <option>Choose a skeleton</option>
                      <option
                        selected={
                          conditionerSkeletonKey === "volume1" ? true : false
                        }
                        value="volume1"
                      >
                        Full Blown (Lightest Weight)
                      </option>
                      <option
                        selected={
                          conditionerSkeletonKey === "colorprotect1"
                            ? true
                            : false
                        }
                        value="colorprotect1"
                      >
                        Technician Color (Medium Moisture)
                      </option>
                      <option
                        selected={
                          conditionerSkeletonKey === "moisture1" ? true : false
                        }
                        value="moisture1"
                      >
                        Brilliant Shine (Medium Moisture)
                      </option>
                      <option
                        selected={
                          conditionerSkeletonKey === "repair1" ? true : false
                        }
                        value="repair1"
                      >
                        Super Strength (Strong Moisture)
                      </option>
                      <option
                        selected={
                          conditionerSkeletonKey === "smooth1" ? true : false
                        }
                        value="smooth1"
                      >
                        Smoothing 'Essential Shea' (Heavy)
                      </option>
                    </select>
                    {/* </div> */}
                    <br />
                    <br />
                    BOOSTERS:
                    <br />
                    <br />
                    <form>
                      <div class="booster-container">
                        <div class="booster-list">
                          <input
                            type="checkbox"
                            name="pollution1"
                            value="pollution1"
                            checked={true}
                          />
                          Pollution Fighting
                          <br />
                          <input type="checkbox" name="uv1" value="uv1" />
                          Ultra Violet Protection
                          <br />
                          <input type="checkbox" name="water1" value="water1" />
                          Water Hardness
                          <br />
                          <input
                            type="checkbox"
                            name="afterwash1"
                            value="afterwash1"
                          />
                          AfterWash1
                          <br />
                          <input
                            type="checkbox"
                            name="afterwash2"
                            value="afterwash2"
                          />
                          AfterWash2
                          <br />
                          <input type="checkbox" name="age1" value="age1" />
                          Age
                          <br />
                          <input type="checkbox" name="diet1" value="diet1" />
                          Diet
                          <br />
                          <input type="checkbox" name="heat1" value="heat1" />
                          Heat Protection
                          <br />
                          <input
                            type="checkbox"
                            name="balancing1"
                            value="balancing1"
                          />
                          Scalp Balancing
                          <br />
                          <input
                            type="checkbox"
                            name="soothing1"
                            value="soothing1"
                          />
                          Scalp Soothing
                          <br />
                          <input
                            type="checkbox"
                            name="toning1"
                            value="toning1"
                          />
                          Scalp Toning
                        </div>

                        <div className="booster-list">
                          <input
                            type="checkbox"
                            name="texture1"
                            value="texture1"
                          />
                          Curly Textures
                          <br />
                          <input
                            type="checkbox"
                            name="volume2"
                            value="volume2"
                          />
                          Volume/Thickness
                          <br />
                          <input type="checkbox" name="color2" value="color2" />
                          Color Protection (Sun)
                          <br />
                          <input
                            type="checkbox"
                            name="moisture2"
                            value="moisture2"
                          />
                          Brilliant Shine Moisture
                          <br />
                          <input
                            type="checkbox"
                            name="repair2"
                            value="repair2"
                          />
                          Super Strength (Chemical)
                          <br />
                          <input
                            type="checkbox"
                            name="repair3"
                            value="repair3"
                          />
                          Super Strength (Protein for Diet)
                          <br />
                          <input
                            type="checkbox"
                            name="smooth2"
                            value="smooth2"
                          />
                          Smoothing <br />
                          <input type="checkbox" name="swim1" value="swim1" />
                          Frequent Swimming <br />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div id="logout-approve-btn">
                  <div style={{ paddingRight: `${5}%` }}>
                    <div className="container">
                      <button onClick={this.submit}>APPROVE</button>
                    </div>
                  </div>
                </div>
              </div>
            </Paper>
          </Fade>
        )}
      </div>
    );
  }
}
