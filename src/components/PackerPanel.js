import React, { Component } from "react";
import { Container } from "./common";
import OrderInfoStatus from "./OrderInfoStatus";
import "../styles/Panel.scss";
import dummyData from "../services/dummydata";

export default class PackerPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          order_number: "83-S87292",
          type: "SH",
          formula: "SKColor protect, FRenergizing, Btoning, Bmoisture",
          quantity: 1,
          size: `${16}oz`
        },
        {
          order_number: "83-C90485",
          type: "CN",
          formula: "SKColor protect, FRenergizing, Btoning, Bmoisture",
          quantity: 1,
          size: `${16}oz`
        },
        {
          order_number: "83-M97495",
          type: "SH",
          formula: "SKmoisture1, FRromantic",
          quantity: 1,
          size: `${16}oz`
        }
      ],
      customerData: dummyData
    };
  }

  renderCustomerData = () => {};

  renderOrderData = () => {
    let data = this.state.data;
    return data.map(element => {
      return (
        <Container classname="section-1">
          <div className="column">
            <h3 className="column-name">ORDER#</h3>
            <p>{element.order_number}</p>
          </div>
          <div className="column">
            <h3 className="column-name">TYPE</h3>
            <p>{element.type}</p>
          </div>
          <div className="column">
            <h3 className="column-name">FORMULA</h3>
            <p>{element.formula}</p>
          </div>
          <div className="column">
            <h3 className="column-name">QTY</h3>
            <p>{element.quantity}</p>
          </div>
          <div className="column">
            <h3 className="column-name">SIZE</h3>
            <p>{element.size}</p>
          </div>
          <div className="column">
            <h3 className="column-name">LABEL STATUS</h3>
            <select>
              <option>READY</option>
              <option>IN PROGRESS</option>
              <option>READY</option>
            </select>
          </div>
          <div className="column">
            <h3 className="column-name">PACKING STATUS</h3>
            <select>
              <option>READY</option>
              <option>IN PROGRESS</option>
              <option>READY</option>
            </select>
          </div>
        </Container>
      );
    });
  };

  render() {
    return (
      <div className="dashboard">
        <OrderInfoStatus />

        {this.renderOrderData()}
      </div>
    );
  }
}
