import React, { Component } from "react";

// components
import { Link } from "react-router-dom";
import { ClipLoader, PulseLoader } from "react-spinners";

// styling
import "../styles/Panel.scss";
import { css } from "@emotion/core";

// dependencies
import axios from "axios";
import { CSVLink } from "react-csv";

export default class Sales extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      completedQuizCount: "",
      totalQuizCount: "",
      abandonedQuiz: ""
    };
  }

  async componentDidMount() {
    await this.fetchOrders();
    await this.fetchQuizData();
    await this.findOrders();
    await this.setState({
      loading: false
    });
  }

  fetchOrders = async () => {
    try {
      let responses = await axios(
        "https://bespoke-backend.herokuapp.com/orders"
      );
      const orders = responses.data;
      this.setState({ orders });
    } catch (error) {
      console.error(error);
    }
  };

  fetchQuizData = async () => {
    try {
      // query user codes api
      let response = await axios(
        `https://bespoke-backend.herokuapp.com/fekkai-backend`
      );
      const emails = [];
      let completedQuizCount = 0;
      let abandonedQuiz = 0;
      let totalQuizCount = response.data.length;

      // query user data instances w/ user_code
      for (let userCode of response.data.reverse()) {
        let userResponse = await axios.get(
          `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${userCode.user_code}`
        );

        // increment abandoned quiz instance if quiz compute is false
        if (userResponse.data.user_data.compute === false) {
          abandonedQuiz++;

          this.setState({
            abandonedQuiz
          });
        }

        // increment abandoned quiz instance if quiz compute is true
        if (userResponse.data.user_data.compute === true) {
          // avoid pushing duplicate emails in emails array
          if (
            !emails.includes(
              userResponse.data.user_data.email.toLocaleLowerCase()
            )
          ) {
            emails.push(userResponse.data.user_data.email.toLocaleLowerCase());
          }
          completedQuizCount++;

          this.setState({
            completedQuizCount
          });
        }
      }
      this.setState({
        emails,
        totalQuizCount
      });
    } catch (error) {
      console.error(error);
    }
  };

  findOrders = () => {
    let totalSales = 0;
    let csv = [["created_at", "email", "subtotal", "total"]];
    // emails compute true
    for (let email of this.state.emails) {
      for (let order of this.state.orders) {
        if (order.total && email === order.email.toLocaleLowerCase()) {
          totalSales += parseFloat(order.total);
          this.setState({ totalSales });
          csv.push([
            order.created_at,
            order.email,
            order.subtotal,
            order.total
          ]);
        }
      }
      this.setState({ totalSales, csv });
    }
  };

  render() {
    const {
      loading,
      completedQuizCount,
      totalQuizCount,
      abandonedQuiz
    } = this.state;
    return (
      <div className="dashboard">
        <span>
          <Link to="/stylist-panel-list">
            <button id="list-view-btn">← LIST</button>
          </Link>
          <br />
          <br />
          TOTAL QUIZ COUNT: {loading ? <ClipLoader size={6} /> : totalQuizCount}
          <br /> COMPLETED QUIZ COUNT: {completedQuizCount}&nbsp;
          {!loading
            ? "(" +
              ((completedQuizCount / totalQuizCount) * 100).toFixed(2) +
              " %)"
            : ""}
          <br /> ABANDONED QUIZ COUNT: {abandonedQuiz}&nbsp;
          {!loading
            ? "(" + ((abandonedQuiz / totalQuizCount) * 100).toFixed(2) + " %)"
            : ""}
          {/* <br /> COMPUTE NULL: {this.state.computeNull} */}
          <br /> <br />
          <span style={{ display: "flex", flexDirection: "row" }}>
            TOTAL SALES:{" "}
            {this.state.loading === false ? (
              <span>
                {this.state.totalSales}{" "}
                <CSVLink data={this.state.csv}>DOWNLOAD CSV</CSVLink>
              </span>
            ) : (
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "5px"
                }}
              >
                COMPILING CSV <PulseLoader size={6} />
              </span>
            )}
          </span>
        </span>
      </div>
    );
  }
}
