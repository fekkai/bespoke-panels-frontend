import React, { Component } from "react";

//components
import UserAnswers from "./UserAnswers";
import EditShampooSkeleton from "./EditShampooSkeleton";
import EditConditionerSkeleton from "./EditConditionerSkeleton";
import { Carousel } from "react-responsive-carousel";
import { RingLoader } from "react-spinners";
import { Paper } from "@material-ui/core";
import Fade from "react-reveal/Fade";
import { confirmAlert } from "react-confirm-alert";

//auth and api services
import axios from "axios";
import aws4 from "aws4";

//styles
import { css } from "@emotion/core";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
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
      userCode: "",
      displayShampooEdit: "none",
      displayConditionerEdit: "none",
      editShampooSkeletonBtn: true,
      editConditionerSkeletonBtn: true
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
      console.log(this.state.userCode)
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
    console.log(userResponse);
    const origShampooFormula = JSON.parse(
      JSON.stringify(originalShampooFormula.formula)
    );
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

    this.setState({
      editShampooSkeletonBtn: true,
      editConditionerSkeletonBtn: true
    });
    console.log(userResponse);
    this.goToNext();
    await axios.put("https://fekk.ai/backend/formula", userResponse);
  };

  editShampooSkeleton = () => {
    this.state.editShampooSkeletonBtn
      ? this.setState({
          displayShampooEdit: "inline",
          editShampooSkeletonBtn: false
        })
      : this.setState({
          displayShampooEdit: "none",
          editShampooSkeletonBtn: true
        });
  };

  editConditionerSkeleton = () => {
    this.state.editConditionerSkeletonBtn
      ? this.setState({
          displayConditionerEdit: "inline",
          editConditionerSkeletonBtn: false
        })
      : this.setState({
          displayConditionerEdit: "none",
          editConditionerSkeletonBtn: true
        });
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
      conditionerSkeletonValue,
      displayShampooEdit,
      editShampooSkeletonBtn,
      editConditionerSkeletonBtn,
      displayConditionerEdit
    } = this.state;

    const { name, orderId, address } = this.state;

    // const { photoIndex, isOpen } = this.state;
    // const images = [frontSelfie, sideSelfie];

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
              <UserAnswers
                thickness={thickness}
                texture={texture}
                condition={condition}
                fragrance={fragrance}
                hairGoals={hairGoals}
                hairGoals2={hairGoals2}
                age={age}
                diet={diet}
                zip={zip}
                city={city}
                frontSelfie={frontSelfie}
                sideSelfie={sideSelfie}
                afterwash={afterwash}
                uvRisk={uvRisk}
                airQuality={airQuality}
                waterHardness={waterHardness}
                humidity={humidity}
                windSpeed={windSpeed}
              />
            </Paper>

            <Paper elevation={1}>
              <div id="formula-container" className="stylist-panel-customer">
                <div className="column-title">Shampoo</div>
                <div className="column-title">Conditioner</div>
                <div className="info-container"></div>
                <div className="info-container">
                  <EditShampooSkeleton
                    editShampooSkeleton={this.editShampooSkeleton}
                    handleSelectShampoo={this.handleSelectShampoo}
                    editShampooSkeletonBtn={editShampooSkeletonBtn}
                    shampooSkeletonKey={shampooSkeletonKey}
                    shampooSkeletonValue={shampooSkeletonValue}
                    shampooSkeletonKey={shampooSkeletonKey}
                    displayShampooEdit={displayShampooEdit}
                  />
                </div>

                <div className="info-container">
                  <EditConditionerSkeleton
                    editConditionerSkeleton={this.editConditionerSkeleton}
                    handleSelectConditioner={this.handleSelectConditioner}
                    editConditionerSkeletonBtn={editConditionerSkeletonBtn}
                    conditionerSkeletonKey={conditionerSkeletonKey}
                    conditionerSkeletonValue={conditionerSkeletonValue}
                    conditionerSkeletonKey={conditionerSkeletonKey}
                    displayConditionerEdit={displayConditionerEdit}
                  />
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
