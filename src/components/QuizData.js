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

export default class QuizData extends Component {
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
    await this.fetchEmails();
    await this.fetchOrders();
    await this.fetchQuizData();
    await this.findOrders();
    await this.setState({
      loading: false
    });
  }

  fetchEmails = async () => {
    try {
      let response = await axios(
        "https://bespoke-backend.herokuapp.com/klaviyo-emails"
      );
      const klaviyoEmails = response.data.records;
      this.setState({
        klaviyoEmails: klaviyoEmails.length
      });
      // console.log(this.state.klaviyoEmails);
    } catch (error) {
      console.error(error);
    }
  };

  fetchOrders = async () => {
    try {
      let response = await axios(
        "https://bespoke-backend.herokuapp.com/orders"
      );
      const orders = response.data;
      this.setState({ orders });
      // console.log(orders[0]);
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
      let abandonedQuizToday = 0;
      let abandonedQuizPrevDay = 0;
      let totalQuizCount = response.data.length;
      let completeQuizToday = 0;
      let completeQuizPrevDay = 0;
      let quizPrevDay = 0;
      let quizToday = 0;
      let userData = response.data.reverse();
      const today = new Date().getDate();
      const yesterday = new Date(today) - 1;

      // query user data instances w/ user_code
      for (let i = 0; i < userData.length; i++) {
        // for (let userCode of response.data.reverse()) {
        let userResponse = await axios.get(
          `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${userData[i].user_code}`
        );

        // total abandoned quizzes
        if (userResponse.data.user_data.compute === false) {
          abandonedQuiz++;
          this.setState({
            abandonedQuiz
          });
        }

        // total quizzes today
        if (new Date(userResponse.data.created).getDate() === today) {
          // console.log("today's", userResponse.data.created);
          quizToday++;
          this.setState({
            quizToday
          });
        }

        // completed quizzes today
        if (
          userResponse.data.user_data.compute === true &&
          new Date(userResponse.data.created.toString()).getDate() === today
        ) {
          completeQuizToday++;

          this.setState({
            completeQuizToday
          });
        }

        // abandoned quizzes today
        if (
          userResponse.data.user_data.compute === false &&
          new Date(userResponse.data.created.toString()).getDate() === today
        ) {
          abandonedQuizToday++;

          this.setState({
            abandonedQuizToday
          });
        }

        // total quizzes prev day
        if (new Date(userResponse.data.created).getDate() === yesterday) {
          // console.log("yesterday's", userResponse.data.created);
          quizPrevDay++;
          this.setState({
            quizPrevDay
          });
        }

        // completed quizzes prev day
        if (
          userResponse.data.user_data.compute === true &&
          new Date(userResponse.data.created.toString()).getDate() === yesterday
        ) {
          completeQuizPrevDay++;

          this.setState({
            completeQuizPrevDay
          });
        }

        // abandoned quizzes prev day
        if (
          userResponse.data.user_data.compute === false &&
          new Date(userResponse.data.created.toString()).getDate() === yesterday
        ) {
          abandonedQuizPrevDay++;

          this.setState({
            abandonedQuizPrevDay
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
            // console.log(emails);
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
    let csv = [
      [
        "created_at",
        "email",
        "subtotal",
        "total",
        "lineitem_name",
        "lineitem_quantity",
        "billing_province",
        "shipping_province"
      ]
    ];
    // emails compute true
    for (let email of this.state.emails) {
      for (let order of this.state.orders) {
        if (
          // check for matching email

          email === order.email.toLocaleLowerCase()
        ) {
          console.log(order);
          csv.push([
            order.created_at,
            order.email,
            order.subtotal,
            order.total,
            order.lineitem_name,
            order.lineitem_quantity,
            order.billing_province,
            order.shipping_province
          ]);
          if (order.total) {
            totalSales += parseFloat(order.total);
          }
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
      abandonedQuiz,
      abandonedQuizToday,
      // klaviyoEmails,
      completeQuizToday,
      completeQuizPrevDay,
      abandonedQuizPrevDay,
      quizToday,
      quizPrevDay
    } = this.state;
    return (
      <div className="dashboard">
        <span>
          <Link to="/stylist-panel-list">
            <button id="list-view-btn">← LIST</button>
          </Link>
          <br />
          <br />
          LAUNCH 03-20-20
          <br />
          {/* {new Date().toString()} */}
          <br />
          TODAY
          <br />
          QUIZ COUNT: {quizToday}
          <br />
          COMPLETE: {completeQuizToday}
          <br />
          ABANDONED: {abandonedQuizToday}
          <br /> <br />
          PREVIOUS DAY: {quizPrevDay}
          <br />
          COMPLETE: {completeQuizPrevDay}
          <br />
          ABANDONED: {abandonedQuizPrevDay}
          <br />
          <br />
          TOTAL QUIZZES: {loading ? <ClipLoader size={6} /> : totalQuizCount}
          <br /> COMPLETED QUIZ COUNT/EMAILS ENTERED: {completedQuizCount}&nbsp;
          {!loading
            ? "(" +
              ((completedQuizCount / totalQuizCount) * 100).toFixed(2) +
              "%)"
            : ""}
          <br /> ABANDONED QUIZ COUNT: {abandonedQuiz}&nbsp;
          {!loading
            ? "(" + ((abandonedQuiz / totalQuizCount) * 100).toFixed(2) + "%)"
            : ""}
          {/* <br /> COMPUTE NULL: {this.state.computeNull} */}
          <br />
          {/* TOTAL KLAVIYO EMAILS: {klaviyoEmails} */}
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
