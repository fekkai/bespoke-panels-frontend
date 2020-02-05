import React, { Component } from "react";

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
      ascending: true,
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

  async componentDidMount() {
    await this.fetchOrders();
    await this.setState({
      loading: false
    });
  }


  fetchOrders = async () => {
    try {
      // let response = await axios(signedRequest);
      let response = await axios("https://chat-quiz-backend.herokuapp.com/");
      console.log(response.data);
      response = JSON.parse(JSON.stringify(response));
      const data = [];
      for (let userCode of response.data) {
        console.log(userCode.user_code)
        data.push({
          // name: order.shipping_address.name,
          // orderId: order.name,
          // address: 
          //   order.shipping_address.address1 +
          //   (order.shipping_address.address2
          //     ? " " + order.shipping_address.address2
          //     : "") +
          //   " " +
          //   order.shipping_address.city +
          //   " " +
          //   order.shipping_address.province_code +
          //   " " +
          //   order.shipping_address.zip,
          // orderNumber: order.order_number,
          userCode: userCode.user_code,
          locale: userCode.locale
        });
      }
      this.setState({
        data
      })
    } catch (error) {
      console.error(error)
    }
  }

  // fetchOrders = async () => {
  //   try {
  //     let response = await axios.get('https://bespoke-backend-db.herokuapp.com/');

  //     const data = [];

  //     response.data.orders.map(async element => {
  //       const {
  //         created_at,
  //         name,
  //         shipping_address,
  //         line_items,
  //         note_attributes
  //       } = element;
  //       let date = created_at;
  //       let customerName = shipping_address.name;
  //       let address =
  //         shipping_address.address1 +
  //         (shipping_address.address2 ? " " + shipping_address.address2 : "") +
  //         " " +
  //         shipping_address.city +
  //         " " +
  //         shipping_address.province_code +
  //         " " +
  //         shipping_address.zip;
  //       let orderId = name;
  //       let product1 = line_items[0].title ? line_items[0].title : "";
  //       let product2 = line_items[1].title ? line_items[1].title : "";
  //       let product3 = !line_items[2].title ? "" : line_items[2].title;
  //       let userCode = !note_attributes[0] ? "" : note_attributes[0].value;

  //       // if (userCode) {
  //       //   let userResponse = await axios.get(
  //       //     `https://fekk.ai/backend/get_formula?user_code=${userCode}`
  //       //   );

  //       //   var shampooFormula = userResponse.data.ingredients.shampoo.formula;
  //       //   var conditionerFormula =
  //       //     userResponse.data.ingredients.shampoo.formula;
  //       //   var thickness = userResponse.data.user_data.answers.hair_thickness;
  //       //   var texture = userResponse.data.user_data.answers.hair_texture;
  //       //   var condition = userResponse.data.user_data.answers["hair-condition"];
  //       //   var hairGoals = userResponse.data.user_data.answers["hair-goals"];
  //       //   var hairGoals2 = userResponse.data.user_data.answers["hair-goals-2"];
  //       //   var age = userResponse.data.user_data.answers.age;
  //       //   var diet = userResponse.data.user_data.answers.diet;
  //       //   var zip =
  //       //     typeof userResponse.data.user_data.answers.zipcode === "string"
  //       //       ? userResponse.data.user_data.answers.zipcode
  //       //       : userResponse.data.user_data.answers.zipcode.zip;
  //       //   var city = userResponse.data.user_data.weather;
  //       //   var frontSelfie = userResponse.data.user_data.front_selfie;
  //       //   var sideSelfie = userResponse.data.user_data.side_selfie;
  //       //   var afterwash = userResponse.data.user_data.answers.afterwash
  //       // }
  //       // console.log(afterwash)
  //       await data.push({
  //         date,
  //         customerName,
  //         address,
  //         // name is shopify api variable for order id
  //         orderId,
  //         product1,
  //         product2,
  //         product3,
  //         // shampooFormula,
  //         // conditionerFormula,
  //         // thickness,
  //         // texture,
  //         // condition,
  //         // hairGoals,
  //         // hairGoals2,
  //         // age,
  //         // diet,
  //         // zip,
  //         // city,
  //         // frontSelfie,
  //         // sideSelfie,
  //         // afterwash,
  //         userCode
  //       });
  //       // console.log(city)
  //     });
  //     await this.setState({
  //       data,
  //             });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

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
              <div className="list-header">
                <div onClick={() => this.sortBy("date")}>
                  DUE DATE <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div onClick={() => this.sortBy("orderId")}>
                  ORDER ID <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div onClick={() => this.sortBy("customerName")}>
                  NAME <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div onClick={() => this.sortBy("product")}>
                  PRODUCT <span>{ascending ? "▲" : "▼"}</span>
                </div>
                <div onClick={() => this.sortBy("status")}>
                  STATUS <span>{ascending ? "▲" : "▼"}</span>
                </div>
              </div>
              <div className="body">
                {filteredData.map(rowData => {
                  return (
                    <Link
                      to={{
                        pathname: "/stylist-panel-customer",
                        state: {
                          name: rowData.customerName,
                         
                          address: rowData.address,
                          orderId: rowData.orderId,
                        
                          userCode: rowData.userCode,
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
