import React, { Component } from "react";

// components
import { Link } from "react-router-dom";
import { ClipLoader, PulseLoader } from "react-spinners";

// styling
import "../styles/Panel.scss";
import { css } from "@emotion/core";

// dependencies
import { CSVLink } from "react-csv";
import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

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
    await this.shopifyOrders();
    await this.fetchEmails();
    await this.fetchOrders();
    await this.fetchQuizData();
    await this.findOrders();
    await this.setState({
      loading: false
    });
  }

  shopifyOrders = async () => {
    let response = await axios(
      // "http://localhost:4000/fekkai"
      "https://bespoke-backend.herokuapp.com/fekkai"
    );
    let discountedItems = 0;
    let totalSalesToday = 0;
    let totalSalesPrevDay = 0;
    let orderCountToday = 0;
    let orderCountPrevDay = 0;

    console.log(response.data);
    for (let i = 0; i < response.data.orders.length; i++) {
      console.log(response.data.orders[i].id);
    }

    const today = new Date().getDate();
    const yesterday = new Date().getDate() - 1;

    for (let order of response.data.orders) {
      if (
        new Date(order.created_at).getDate() === today &&
        order.discount_applications
      ) {
        for (let discount of order.discount_applications) {
          let title = discount && discount.title;
          if (title && title.toLocaleLowerCase() === "discount bundle") {
            totalSalesToday += parseFloat(order.total_price);
            orderCountToday++;
            // console.log(
            //   order.name,
            //   order.number,
            //   order.total_price,
            //   order.created_at,
            //   "discountbundle"
            // );
            discountedItems++;
          }
          break;
        }
      } else if (
        new Date(order.created_at).getDate() === yesterday &&
        order.discount_applications
      ) {
        for (let discount of order.discount_applications) {
          let title = discount && discount.title;
          if (title && title.toLocaleLowerCase() === "discount bundle") {
            totalSalesPrevDay += parseFloat(order.total_price);
            // console.log(
            //   order.name,
            //   order.number,
            //   order.total_price,
            //   order.created_at,
            //   "discountbundle"
            // );
            orderCountPrevDay++;
            discountedItems++;
          }
          break;
        }
      }
    }
    this.setState({
      totalSalesToday,
      totalSalesPrevDay,
      orderCountToday,
      orderCountPrevDay
    });
    console.log(orderCountPrevDay);
  };

  fetchEmails = async () => {
    try {
      const response = await axios(
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
      const emails = [{ email: "asdf@asdf.com" }];
      let uniqueEmails = [];
      let completedQuizCount = 0;
      let abandonedQuiz = 0;
      let abandonedQuizToday = 0;
      let abandonedQuizPrevDay = 0;
      let totalQuizCount = 0;
      let completeQuizToday = 0;
      let completeQuizPrevDay = 0;
      let quizPrevDay = 0;
      let quizToday = 0;
      let userData = response.data.reverse();
      const today = new Date().getDate();
      const yesterday = new Date(today) - 1;

      for (let i = 0; i < userData.length; i++) {
        if (userData[i].created > "2020-03-20T00:00:00") {
          totalQuizCount++;
        }
      }
      console.log(totalQuizCount);

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
            !uniqueEmails.includes(
              userResponse.data.user_data.email.toLocaleLowerCase()
            )
          ) {
            uniqueEmails.push(
              userResponse.data.user_data.email.toLocaleLowerCase()
            );
            emails.push({
              email: userResponse.data.user_data.email.toLocaleLowerCase(),
              created: userResponse.data.created
            });
          }
          // console.log(uniqueEmails);
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
    let totalQuizUserSales = 0;
    let totalSales = 0;
    let returningTotalSales = 0;
    let totalSalesToday = 0;
    let totalSalesPrevDay = 0;
    let csv = [
      [
        "created_at",
        "name",
        "email",
        // "subtotal",
        "total"
        // "lineitem_name",
        // "lineitem_quantity",
        // "billing_province",
        // "shipping_province"
      ]
    ];
    // emails compute true
    for (let email of this.state.emails) {
      for (let order of this.state.orders) {
        let userCreated = email.created;
        let userEmail = email.email;
        let quizCreated = new Date(userCreated).getDate();
        let orderEmail = order.email.toLocaleLowerCase();
        let orderCreated = new Date(order.created_at).getDate();
        let today = new Date().getDate();
        let yesterday = new Date().getDate() - 1;

        if (
          // check for matching email
          userEmail === orderEmail
        ) {
          if (order.total) {
            totalQuizUserSales += parseFloat(order.total);
          }
        }

        if (
          // check for matching email
          userEmail === orderEmail &&
          quizCreated <= orderCreated
          // check if quiz date and order date are the same
        ) {
          if (order.total) {
            returningTotalSales += parseFloat(order.total);
          }
        }

        if (
          // check for matching email
          userEmail === orderEmail &&
          // check if quiz date and order date are the same
          quizCreated === orderCreated
        ) {
          console.log(
            userEmail,
            orderEmail,
            quizCreated,
            orderCreated,
            order.total
          );
          csv.push([
            order.created_at,
            order.name,
            order.email,
            // order.subtotal,
            order.total
            // order.lineitem_name,
            // order.lineitem_quantity,
            // order.billing_province,
            // order.shipping_province
          ]);
          // console.log(csv);

          if (order.total) {
            totalSales += parseFloat(order.total);
          }
        }

        //  today's orders through chat quiz
        if (
          // check for matching email in quiz db and fekkai shopify orders db
          userEmail === orderEmail &&
          // check for quiz email and order created same day
          quizCreated === today &&
          orderCreated === today
        ) {
          if (order.total) {
            totalSalesToday += parseFloat(order.total);
            // console.log(totalSalesToday);
          }
        }

        //  previous day's orders through chat quiz
        if (
          // check for matching email in quiz db and fekkai shopify orders db
          userEmail === orderEmail &&
          // check for quiz email and order created prev day
          quizCreated === yesterday &&
          orderCreated === yesterday
        ) {
          if (order.total) {
            totalSalesPrevDay += parseFloat(order.total);
            // console.log(totalSalesPrevDay);
          }
          // console.log(
          //   quizCreated,
          //   order,
          //   order.created_at,
          //   userEmail,
          //   userCreated,
          //   order.total
          // );
        }
      }
      this.setState({
        totalSales,
        returningTotalSales,
        totalQuizUserSales,
        // totalSalesToday, totalSalesPrevDay,
        csv
      });
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
      quizPrevDay,
      totalQuizUserSales,
      totalSales,
      returningTotalSales,
      totalSalesToday,
      totalSalesPrevDay,
      orderCountToday,
      orderCountPrevDay
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
          COMPLETE: {completeQuizToday}{" "}
          {"(" + ((completeQuizToday / quizToday) * 100).toFixed(2) + "%)"}
          <br />
          ABANDONED: {abandonedQuizToday}
          {"(" + ((abandonedQuizToday / quizToday) * 100).toFixed(2) + "%)"}
          <br />
          COMPLETED QUIZ CONVERSION:{" "}
          {((orderCountToday / completeQuizToday) * 100).toFixed(2) + "%"}{" "}
          {orderCountToday}
          <br />
          TOTAL QUIZ CONVERSION:{" "}
          {((orderCountToday / quizToday) * 100).toFixed(2) + "%"}{" "}
          {/* {orderCountToday} */}
          <br />
          TOTAL SALES: {parseFloat(totalSalesToday).toFixed(2)}
          <br /> <br />
          PREVIOUS DAY
          <br />
          QUIZ COUNT: {quizPrevDay}
          <br />
          COMPLETE: {completeQuizPrevDay}{" "}
          {"(" + ((completeQuizPrevDay / quizPrevDay) * 100).toFixed(2) + "%)"}
          <br />
          ABANDONED: {abandonedQuizPrevDay}{" "}
          {"(" + ((abandonedQuizPrevDay / quizPrevDay) * 100).toFixed(2) + "%)"}
          <br />
          COMPLETED QUIZ CONVERSION:{" "}
          {((orderCountPrevDay / completeQuizPrevDay) * 100).toFixed(2) +
            "%"}{" "}
          {orderCountPrevDay}
          <br />
          TOTAL QUIZ CONVERSION:{" "}
          {((orderCountPrevDay / quizPrevDay) * 100).toFixed(2) + "%"}{" "}
          {/* {orderCountPrevDay} */}
          <br />
          TOTAL SALES: {parseFloat(totalSalesPrevDay).toFixed(2)}
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
          {/* <span style={{ display: "flex", flexDirection: "row" }}>
            QUIZ TO TRANSACTION SALES: {this.state.loading === false ? (
              <span>
                {parseFloat(totalSales).toFixed(2)}{" "} */}
          {/* <CSVLink data={this.state.csv}>DOWNLOAD CSV</CSVLink> */}
          {/* </span> */}
          {/* ) : ( */}
          {/* <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "5px"
                }}
              > */}
          {/* COMPILING CSV  */}
          {/* <PulseLoader size={6} />
              </span>
            )}
          </span> */}
          {/* <span style={{ display: "flex", flexDirection: "row" }}>
            QUIZ USER RETURNING CUSTOMER SALES: {this.state.loading === false ? (
              <span>{parseFloat(returningTotalSales).toFixed(2)} </span>
            ) : (
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "5px"
                }}
              >
                <PulseLoader size={6} />
              </span>
            )}
          </span> */}
          <span style={{ display: "flex", flexDirection: "row" }}>
            TOTA SALES:{" "}
            {this.state.loading === false ? (
              <span>{parseFloat(totalQuizUserSales).toFixed(2)} </span>
            ) : (
              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft: "5px"
                }}
              >
                <PulseLoader size={6} />
              </span>
            )}
          </span>
        </span>
      </div>
    );
  }
}
