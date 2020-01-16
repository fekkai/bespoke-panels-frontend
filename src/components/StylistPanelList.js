import React, { Component } from "react";
import { render } from "react-dom";

//components
import { Row } from "./common";

import { Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

import "../styles/Panel.scss";
import { css } from "@emotion/core";
import { Paper } from "@material-ui/core";

import { RingLoader } from "react-spinners";

import axios from "axios";
import aws4 from "aws4";

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

export default class StylistPanelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: "",

      data: [],
      descending: true,
      loading: true,

      orders: null,
      // selectedOrder: "",
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

  componentDidMount() {
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      let response = await axios(signedRequest);

      const data = [];
      response.data.orders.map(async element => {
        const {
          created_at,
          name,
          shipping_address,
          line_items,
          note_attributes
        } = element;
        let date = created_at;
        let customerName = shipping_address.name;
        let address =
          shipping_address.address1 +
          (shipping_address.address2 ? " " + shipping_address.address2 : "") +
          " " +
          shipping_address.city +
          " " +
          shipping_address.province_code +
          " " +
          shipping_address.zip;
        let orderId = name;
        let product1 = line_items[0].title ? line_items[0].title : "";
        let product2 = line_items[1].title ? line_items[1].title : "";
        let product3 = !line_items[2].title ? "" : line_items[2].title;
        let userCode = !note_attributes[0] ? "" : note_attributes[0].value;

        if (userCode) {
          const userResponse = await axios.get(
            `https://fekk.ai/backend/get_formula?user_code=${userCode}`
          );
          var shampooFormula = userResponse.data.ingredients.shampoo.formula;
          var conditionerFormula =
            userResponse.data.ingredients.shampoo.formula;
          var thickness = userResponse.data.user_data.answers.hair_thickness;
          var texture = userResponse.data.user_data.answers.hair_texture;
          var condition = userResponse.data.user_data.answers["hair-condition"];
          var hairGoals = userResponse.data.user_data.answers["hair-goals"];
          var hairGoals2 = userResponse.data.user_data.answers["hair-goals-2"];
          var age = userResponse.data.user_data.answers.age;
          var diet = userResponse.data.user_data.answers.diet;
          var zip =
            typeof userResponse.data.user_data.answers.zipcode === "string"
              ? userResponse.data.user_data.answers.zipcode
              : userResponse.data.user_data.answers.zipcode.zip;
          var humidity = userResponse.data.user_data.weather;
          var frontSelfie = userResponse.data.user_data.front_selfie;
          var sideSelfie = userResponse.data.user_data.side_selfie;
        }
        console.log(conditionerFormula);
        await data.push({
          date,
          customerName,
          address,
          // name is shopify api variable for order id
          orderId,
          product1,
          product2,
          product3,
          shampooFormula,
          conditionerFormula,
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
        });
        console.log(data);
      });
      this.setState({
        data,
        loading: false
      });
    } catch (error) {
      console.error(error);
    }
  };

  // fetchUserCode = async code => {
  //   try {
  //     const response = await axios.get(
  //       `https://fekk.ai/backend/get_formula?user_code=${code}`
  //     );
  //     return response;
  //     // this.setState({
  //     //   csv: res.data,
  //     //   thickness: res.data.user_data.answers.hair_thickness,
  //     //   texture: res.data.user_data.answers.hair_texture,
  //     //   hairCondition: res.data.user_data.answers["hair-condition"],
  //     //   hairGoals: res.data.user_data.answers["hair-goals"],
  //     //   age: res.data.user_data.answers.age,
  //     //   diet: res.data.user_data.answers.diet,
  //     //   zip: res.data.user_data.answers.zipcode.zip,
  //     //   //zips are populating differently each time
  //     //   city: res.data.user_data.weather.city,
  //     //   wash: res.data.user_data.answers.wash_frequency,
  //     //   afterwash: res.data.user_data.answers.afterwash,
  //     //   hairGoals2: res.data.user_data.answers["hair-goals-2"],
  //     //   sideSelfie: res.data.user_data["side_selfie"],
  //     //   frontSelfie: res.data.user_data["front_selfie"],
  //     //   shampooFormula: res.data.ingredients.shampoo.formula,
  //     //   conditionerFormula: res.data.ingredients.conditioner.formula
  //     // });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  compareBy = key => {
    const { descending } = this.state;

    return function(a, b) {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    };
  };

  sortBy = key => {
    if (this.state.descending === true) {
      this.setState({
        descending: false
      });
    } else {
      this.setState({
        descending: true
      });
    }
    let arrayCopy = [...this.state.data];
    // arrayCopy.sort(this.compareBy(key));
    arrayCopy.sort(this.compareBy(key));

    this.setState({ data: arrayCopy });
    console.log(this.state.descending);
  };

  handleChange = e => {
    this.setState({ filter: e.target.value });
  };

  render() {
    const { filter, data, descending } = this.state;

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
              <div className="list-header">
                <div onClick={() => this.sortBy("date")}>
                  DUE DATE {descending ? "▼" : "▲"}
                </div>
                <div onClick={() => this.sortBy("orderId")}>
                  ORDER ID {descending ? "▼" : "▲"}
                </div>
                <div onClick={() => this.sortBy("customerName")}>
                  NAME {descending ? "▼" : "▲"}
                </div>
                <div onClick={() => this.sortBy("product")}>
                  PRODUCT {descending ? "▼" : "▲"}
                </div>
                <div onClick={() => this.sortBy("status")}>
                  STATUS {descending ? "▼" : "▲"}
                </div>
              </div>
              <div className="body">
                {filteredData.map(rowData => {
                  let response;
                  console.log(rowData);
                  return (
                    <Link
                      // onClick={async () => {
                      //   // const userCode = rowData.userCode.value;
                      //   // console.log(userCode)
                      //   // response = await this.fetchUserCode(userCode);
                      // }}
                      to={{
                        pathname: "/stylist-panel-customer",
                        state: {
                          name: rowData.customerName,
                          shampooFormula: rowData.shampooFormula,
                          conditionerFormula: rowData.conditionerFormula,
                          address: rowData.address,
                          orderId: rowData.orderId,
                          thickness: rowData.thickness,
                          texture: rowData.texture,
                          condition: rowData.condition,
                          hairGoals: rowData.hairGoals,
                          hairGoals2: rowData.hairGoals2,
                          age: rowData.age,
                          diet: rowData.diet,
                          zip: rowData.zip,
                          humidity: rowData.humidity,
                          frontSelfie: rowData.frontSelfie,
                          sideSelfie: rowData.sideSelfie
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

{
  /* <div style={{ display: "flex", flexDirection: "row" }}></div> */
}

{
  /* <Container classname="section-2">
          <div className="section-subcontainer">
            <h3 className="column-name">SELFIE</h3>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: `${100}%`,
                height: `${100}%`
              }}
            >
              <img className="selfie" src={this.props.frontSelfie} /> */
}
{
  /* {this.props.isLoading ? (
                <div
                  style={{
                    position: "absolute",
                    top: `${10}%`,
                    left: `${50}%`
                  }}
                >
                  <Loading type={"spokes"} color={"black"} />
                </div>
              ) : null} */
}
{
  /* <img className="selfie" src={this.props.sideSelfie} />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: `${99}%`,
              height: `${500}px`
            }}
          >
            <div className="skeleton">
              <h3 className="column-name">SKELETON</h3>
              <div className="skeleton-content">
                <div className="column">
                  <p class="sub-header" style={{ fontSize: `{10}px` }}>
                    Thickness
                  </p>
                  <p>
                    <b>{this.props.thickness}</b>
                  </p>
                </div>
                <div className="column">
                  <h3></h3>
                  <h3>Texture (User/Override)</h3>
                  <p>
                    <b>{this.props.texture}</b>
                  </p>
                </div>
                <div className="column">
                  <h3>Condition(s)</h3>
                  <p>
                    <b>
                      {!this.props.hairCondition === "none"
                        ? this.props.hairCondition.map(e => e + ", ")
                        : null}
                    </b>
                  </p>
                </div>
                <div className="column">
                  <h3>Goal 1</h3>
                  <p>
                    <b>
                      {this.props.hairGoals
                        ? this.props.hairGoals.map(e => e + ", ")
                        : null}
                    </b>
                  </p>
                </div>
              </div>
            </div>

            <div className="skeleton">
              <h3 className="column-name">BOOSTERS</h3>

              <div className="skeleton-content">
                <div className="column">
                  <h3>Age</h3>
                  <p>
                    <b>{this.props.age}</b>
                  </p>
                </div>

                <div className="column">
                  <h3></h3>
                  <h3>Diet</h3>
                  <p>
                    <b>{this.props.diet}</b>
                  </p>
                </div>

                <div className="column">
                  <h3>Zip</h3>
                  <p>
                    <b>{this.props.zip}</b>
                  </p>
                </div>

                <div className="column">
                  <h3>City</h3>
                  <p>
                    <b>{this.props.city}</b>
                  </p>
                </div>

                <div className="column">
                  <h3>Wash Frequency</h3>
                  <p>
                    <b>{this.props.wash}</b>{" "}
                  </p>{" "}
                </div>

                <div className="column">
                  <h3>Afterwash</h3>
                  <p>
                    <b>{this.props.afterwash}</b>{" "}
                  </p>{" "}
                </div>

                <div className="column">
                  <h3>Goal 2</h3>
                  <p>
                    <b>
                      {this.props.hairGoals2
                        ? this.props.hairGoals2.map(e => e + ", ")
                        : null}
                    </b>{" "}
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container classname="section-3">
          <div></div>
          <div className="column-skeleton-fragrance">
            <h3 className="column-name">SKELETON</h3>
            <div className="box">
              <select onChange={this.handleSelect}>
                <option value="colorProtect">color protect</option>
                <option value="colorChange">color change</option>
              </select>
            </div>
          </div>

          <div className="column-skeleton-fragrance">
            <h3 className="column-name">FRAGRANCE</h3>
            <div className="box">
              <select onChange={this.handleSelect}>
                <option>energizing</option>
                <option>option 2</option>
              </select>
            </div>
          </div>

          <div className="column">
            <h3 className="column-name">BOOSTERS</h3>
            <div className="box">
              <select onChange={this.handleSelect}>
                <option>toning</option>
                <option>option 2</option>
              </select>
              <select onChange={this.handleSelect}>
                <option>moisture</option>
                <option>option 2</option>
              </select>
              <select onChange={this.handleSelect}>
                <option>blank</option>
                <option>option 2</option>
              </select>
              <select onChange={this.handleSelect}>
                <option>blank</option>
                <option>option 2</option>
              </select>
              <select onChange={this.handleSelect}>
                <option>blank</option>
                <option>option 2</option>
              </select>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  height: `${100}%`
                }}
              ></div>
            </div>
          </div>
          <div className="btn-container">
            <Button style={{ height: `${30}%` }} variant="contained">
              SAVE
            </Button>
            <Button
              style={{ height: `${30}%` }}
              variant="contained"
              type="submit"
            >
              SUBMIT
            </Button>
          </div>
         </Container> */
}
