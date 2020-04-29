import React from "react";
import { Link } from "react-router-dom";

import "../styles/Table.scss";
import "../styles/Panel.scss";

export default class Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   ordersToday: this.props.location.state.ordersToday,

      orders:
        this.props.location.state.orders
    };
  }

  renderOrders = () => {
    return this.state.orders.map(order => {
      console.log(order);
      return (
        <div class="row">
          <div class="column">
            <a
              href={`https://fekkaibrands.myshopify.com/admin/orders/${order.id}`}
              style={{ textDecoration: "none", color: "black" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {order.created_at}
            </a>
          </div>
          <div class="column">
            <a
              href={`https://fekkaibrands.myshopify.com/admin/orders/${order.id}`}
              style={{ textDecoration: "none", color: "black" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {order.name}
            </a>
          </div>
          <div class="column">
            <a
              href={`https://fekkaibrands.myshopify.com/admin/orders/${order.id}`}
              style={{ textDecoration: "none", color: "black" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {order.id}
            </a>
          </div>
          <div class="column">
            <a
              href={`https://fekkaibrands.myshopify.com/admin/orders/${order.id}`}
              style={{ textDecoration: "none", color: "black" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {order.email}
            </a>
          </div>
          <div class="column">
            <a
              href={`https://fekkaibrands.myshopify.com/admin/orders/${order.id}`}
              style={{ textDecoration: "none", color: "black" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {order.total_price}
            </a>
          </div>
          <div class="column" style={{ textAlign: "left" }}>
            <a
              href={`https://fekkaibrands.myshopify.com/admin/orders/${order.id}`}
              style={{ textDecoration: "none", color: "black" }}
              target="_blank"
              rel="noopener noreferrer"
            >
              {order &&
                order.line_items.map(lineItem => {
                  return (
                    <div>
                      - {lineItem.title}
                      <br />
                    </div>
                  );
                })}
            </a>
          </div>
          <div class="column">
            <a
              style={{ textDecoration: "none", color: "black" }}
              href={`https://fekkaibrands.myshopify.com/admin/orders/${order.id}`}
              target="_blank"
            >
              {order &&
                order.discount_applications.slice(0, 1).map(discount => {
                  return (
                    <div>
                      {discount.title}
                      <br />
                    </div>
                  );
                })}
            </a>
          </div>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        {" "}
        <div class="quiz-data-row">
          <div class="button-column">
            <Link to="/quiz-data">
              <button
                id="list-view-btn"
                style={{
                  fontSize: "13px"
                }}
              >
                ← QUIZ DATA
              </button>
            </Link>
          </div>
        </div>
        <div style={{ marginTop: "20px" }}>
          <div class="row">
            <div class="column">
              <b>CREATED_AT</b>
            </div>
            <div class="column">
              <b>NAME</b>
            </div>
            <div class="column">
              <b>ORDER ID</b>
            </div>
            <div class="column">
              <b>EMAIL</b>
            </div>
            <div class="column">
              <b>TOTAL PRICE</b>
            </div>
            <div class="column" style={{ textAlign: "left" }}>
              <b>LINE ITEMS</b>
            </div>
            <div class="column">
              <b>DISCOUNT APPLICATIONS</b>
            </div>
          </div>
          {this.renderOrders()}
        </div>
      </div>
    );
  }
}
