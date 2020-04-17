import React, { Component } from "react";

// components
import { Link } from "react-router-dom";
import { ClipLoader, PulseLoader } from "react-spinners";

// styling
import "../styles/Panel.scss";
import "../styles/Table.scss";
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
      totalQuizLoading: true,
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
    // for (let i = 0; i < response.data.length; i++) {
    for (let i = 0; i < response.data.length; i++) {
      // console.log(response.data.orders[i].id);
    }

    let ordersPrevDay = [];
    let ordersToday = [];
    const today = new Date().getDate();
    const yesterday = new Date().getDate() - 1;
    // line items today
    let lineItemsToday = [];
    let lineItemsPrevDay = [];

    // for (let order of response.data) {
    for (let order of response.data) {
      if (
        order.discount_applications &&
        // change date here for line item query
        new Date(order.created_at).getDate() === today
      ) {
        for (let discount of order.discount_applications) {
          let title = discount && discount.title;
          if (title && title.toLocaleLowerCase() === "discount bundle") {
            lineItemsToday = lineItemsToday.concat(order.line_items);
            totalSalesToday += parseFloat(order.total_price);
            discountedItems++;
            orderCountToday++;
            ordersToday.push(order);
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
            lineItemsPrevDay = lineItemsPrevDay.concat(order.line_items);
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
            ordersPrevDay.push(order);
            // console.log(order)
          }
          break;
        }
      }
    }
    this.setState({
      totalSalesToday,
      totalSalesPrevDay,
      orderCountToday,
      orderCountPrevDay,
      ordersToday,
      ordersPrevDay,

      loading: false
    });
    // console.log(orderCountPrevDay);
    this.lineItemsQty(lineItemsToday);
    // this.lineItemsQty(lineItemsPrevDay);
  };

  lineItemsQty = lineItems => {
    let brilliantGlossShampoo = 0;
    let brilliantGlossConditioner = 0;
    let brilliantGlossCreme = 0;
    let superStrShampoo = 0;
    let superStrConditioner = 0;
    let superStrBalm = 0;
    let techColorShampoo = 0;
    let techColorConditioner = 0;
    let techColorMask = 0;
    let fullBlownShampoo = 0;
    let fullBlownConditioner = 0;
    let fullBlownMist = 0;
    let babyBlondeShampoo = 0;
    let babyBlondeCreme = 0;

    lineItems.map(e => {
      const lineItem = e.title;
      if (
        e &&
        lineItem.toLowerCase().includes("brilliant gloss shampoo") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        brilliantGlossShampoo++;
      } else if (
        e &&
        lineItem.toLowerCase().includes("brilliant gloss conditioner") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        brilliantGlossConditioner++;
      } else if (
        e &&
        lineItem
          .toLowerCase()
          .includes("brilliant gloss multi-tasker perfecting") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        brilliantGlossCreme++;
      } else if (
        e &&
        lineItem.toLowerCase().includes("super strength shampoo") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        superStrShampoo++;
      } else if (
        e &&
        lineItem.toLowerCase().includes("super strength conditioner") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        superStrConditioner++;
      } else if (
        e &&
        lineItem
          .toLowerCase()
          .includes("super strength roots-to-end strengthening balm") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        superStrBalm++;
      } else if (
        e &&
        lineItem.toLowerCase().includes("technician color shampoo") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        techColorShampoo++;
      } else if (
        e &&
        lineItem.toLowerCase().includes("technician color conditioner") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        techColorConditioner++;
      } else if (
        e &&
        lineItem
          .toLowerCase()
          .includes("technician color powerful flash mask") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        techColorMask++;
      } else if (
        e &&
        lineItem.toLowerCase().includes("full blown volume shampoo") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        fullBlownShampoo++;
      } else if (
        e &&
        lineItem.toLowerCase().includes("full blown volume conditioner") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        fullBlownConditioner++;
      } else if (
        e &&
        lineItem
          .toLowerCase()
          .includes("full blown volume dry texturizing mist") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        fullBlownMist++;
      } else if (
        e &&
        lineItem.toLowerCase().includes("baby blonde shampoo") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        babyBlondeShampoo++;
      } else if (
        e &&
        lineItem.toLowerCase().includes("baby blonde air-dry") &&
        lineItem.toLowerCase().indexOf("sample") === -1
      ) {
        babyBlondeCreme++;
      }
    });

    console.log(
      [
        brilliantGlossShampoo,
        brilliantGlossConditioner,
        brilliantGlossCreme,
        superStrShampoo,
        superStrConditioner,
        superStrBalm,
        techColorShampoo,
        techColorConditioner,
        techColorMask,
        fullBlownShampoo,
        fullBlownConditioner,
        fullBlownMist,
        babyBlondeShampoo,
        babyBlondeCreme
      ]
        .sort()
        .reverse()
    );

    console.log(
      "brilliantGlossShampoo",
      brilliantGlossShampoo,
      "brilliantGlossConditioner",
      brilliantGlossConditioner,
      "brilliantGlossCreme",
      brilliantGlossCreme,
      "superStrShampoo",
      superStrShampoo,
      "superStrConditioner",
      superStrConditioner,
      "superStrBalm",
      superStrBalm,
      "techColorShampoo",
      techColorShampoo,
      "techColorConditioner",
      techColorConditioner,
      "techColorMask",
      techColorMask,
      "fullBlownShampoo",
      fullBlownShampoo,
      "fullBlownConditioner",
      fullBlownConditioner,
      "fullBlownMist",
      fullBlownMist,
      "babyBlondeShampoo",
      babyBlondeShampoo,
      "babyBlondeCreme",
      babyBlondeCreme
    );
    this.setState({
      brilliantGlossShampoo,
      brilliantGlossConditioner,
      brilliantGlossCreme,
      superStrShampoo,
      superStrConditioner,
      superStrBalm,
      techColorShampoo,
      techColorConditioner,
      techColorMask,
      fullBlownShampoo,
      fullBlownConditioner,
      fullBlownMist,
      babyBlondeShampoo,
      babyBlondeCreme
    });
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
        // "http://localhost:4000/orders"
      );

      console.log(response);
      const orders = response.data;

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
      // console.log(totalQuizCount);

      // query user data instances w/ user_code
      for (
        let i = 0;
        // i < 300;
        userData.length;
        i++
      ) {
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
        totalQuizCount,
        totalQuizLoading: false
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
            console.log(totalQuizUserSales);
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
      totalQuizLoading,
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
      orderCountPrevDay,
      ordersToday,
      ordersPrevDay,
      brilliantGlossShampoo,
      brilliantGlossConditioner,
      brilliantGlossCreme,
      superStrShampoo,
      superStrConditioner,
      superStrBalm,
      techColorShampoo,
      techColorConditioner,
      techColorMask,
      fullBlownShampoo,
      fullBlownConditioner,
      fullBlownMist,
      babyBlondeShampoo,
      babyBlondeCreme
    } = this.state;

    const today = new Date();
    const yesterday = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);

    // console.log(this.state);
    return (
      <div className="dashboard">
        <span>
          <div style={{ width: "100%" }} class="quiz-data-row">
            <div class="button-column">
              {" "}
              <Link to="/stylist-panel-list">
                <button id="list-view-btn">← LIST</button>
              </Link>
            </div>
          </div>
          <br />
          <br />
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "50%" }}>
              <div class="quiz-data-row">
                <div class="quiz-data-column">LAUNCH 03-20-20</div>
              </div>
              <br />
              {/* {new Date().toString()} */}
              <div class="quiz-data-row">
                <div class="quiz-data-column">
                  <b>TODAY - {today.toDateString()}</b>
                </div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">QUIZ COUNT:</div>
                <div class="quiz-data-column">{quizToday}</div>{" "}
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">COMPLETE:</div>{" "}
                <div class="quiz-data-column">
                  {completeQuizToday}{" "}
                  {"(" +
                    ((completeQuizToday / quizToday) * 100).toFixed(2) +
                    "%)"}
                </div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">ABANDONED:</div>{" "}
                <div class="quiz-data-column">
                  {abandonedQuizToday} {"(" +
                    ((abandonedQuizToday / quizToday) * 100).toFixed(2) +
                    "%)"}
                </div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">COMPLETED QUIZ CONVERSION: </div>
                <div class="quiz-data-column">
                  {" "}
                  {((orderCountToday / completeQuizToday) * 100).toFixed(2) +
                    "%"}{" "}
                </div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column"> ORDER COUNT:</div>{" "}
                <div class="quiz-data-column">{orderCountToday}</div>
              </div>
              {/* <br /> */}
              {/* TOTAL QUIZ CONVERSION:{" "}
          {((orderCountToday / quizToday) * 100).toFixed(2) + "%"}{" "}
          {/* {orderCountToday} */}
              <div class="quiz-data-row">
                <div class="quiz-data-column"> TOTAL SALES:</div>{" "}
                <div class="quiz-data-column">
                  {" "}
                  {parseFloat(totalSalesToday).toFixed(2)}
                </div>
              </div>
              <div class="quiz-data-row">
                <div class="button-column">
                  {" "}
                  {!loading ? (
                    <Link
                      to={{
                        pathname: "/orders",
                        state: {
                          ordersToday: ordersToday
                        }
                      }}
                    >
                      <button id="list-view-btn">ORDERS</button>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <br /> <br />
              <div class="quiz-data-row">
                <div class="quiz-data-column">
                  {" "}
                  <b> PREVIOUS DAY - {yesterday.toDateString()}</b>
                </div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">QUIZ COUNT: </div>{" "}
                <div class="quiz-data-column"> {quizPrevDay}</div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">COMPLETE:</div>
                <div class="quiz-data-column">
                  {" "}
                  {completeQuizPrevDay}{" "}
                  {"(" +
                    ((completeQuizPrevDay / quizPrevDay) * 100).toFixed(2) +
                    "%)"}
                </div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">ABANDONED:</div>
                <div class="quiz-data-column">
                  {" "}
                  {abandonedQuizPrevDay}{" "}
                  {"(" +
                    ((abandonedQuizPrevDay / quizPrevDay) * 100).toFixed(2) +
                    "%)"}
                </div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">COMPLETED QUIZ CONVERSION: </div>
                <div class="quiz-data-column">
                  {" "}
                  {((orderCountPrevDay / completeQuizPrevDay) * 100).toFixed(
                    2
                  ) + "%"}{" "}
                </div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column"> ORDER COUNT:</div>
                <div class="quiz-data-column"> {orderCountPrevDay}</div>
              </div>
              {/* <br /> */}
              {/* TOTAL QUIZ CONVERSION:{" "}
          {((orderCountPrevDay / quizPrevDay) * 100).toFixed(2) + "%"}{" "}
          {/* {orderCountPrevDay} */}
              <div class="quiz-data-row">
                <div class="quiz-data-column"> TOTAL SALES:</div>{" "}
                <div class="quiz-data-column">
                  {parseFloat(totalSalesPrevDay).toFixed(2)}
                </div>
              </div>
              <br />
              <div class="quiz-data-row">
                <div class="button-column">
                  {" "}
                  {!loading ? (
                    <Link
                      to={{
                        pathname: "/orders",
                        state: {
                          ordersPrevDay: ordersPrevDay
                        }
                      }}
                    >
                      <button id="list-view-btn">ORDERS</button>
                    </Link>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>

            <div style={{ width: "50%" }}>
              <div class="quiz-data-row">
                <div class="quiz-data-column"></div>
                <br />
                <br />
              </div>
              <br />
              {/* {new Date().toString()} */}
              <div class="quiz-data-row">
                <div class="quiz-data-column">
                  <b>LINE ITEMS SOLD - {today.toDateString()}</b>
                </div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">brilliantGlossShampoo</div>
                <div class="quiz-data-column">{brilliantGlossShampoo}</div>{" "}
                <div class="quiz-data-column">fullBlownConditioner</div>
                <div class="quiz-data-column">{fullBlownConditioner}</div>
                {}
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">brilliantGlossConditioner</div>{" "}
                <div class="quiz-data-column">{brilliantGlossConditioner} </div>
                <div class="quiz-data-column">fullBlownMist</div>{" "}
                <div class="quiz-data-column">{fullBlownMist} </div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">brilliantGlossCreme</div>{" "}
                <div class="quiz-data-column">{brilliantGlossCreme}</div>
                <div class="quiz-data-column">babyBlondeShampoo</div>{" "}
                <div class="quiz-data-column">{babyBlondeShampoo}</div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column">techColorShampoo </div>
                <div class="quiz-data-column">{techColorShampoo}</div>
                <div class="quiz-data-column">babyBlondeCreme </div>
                <div class="quiz-data-column">{babyBlondeCreme}</div>
              </div>
              <div class="quiz-data-row">
                <div class="quiz-data-column"> techColorConditioner</div>{" "}
                <div class="quiz-data-column">{techColorConditioner}</div>
                <div class="quiz-data-column"> superStrShampoo</div>{" "}
                <div class="quiz-data-column">{superStrShampoo}</div>
              </div>
              {/* <br /> */}
              {/* TOTAL QUIZ CONVERSION:{" "}
          {((orderCountToday / quizToday) * 100).toFixed(2) + "%"}{" "}
          {/* {orderCountToday} */}
              <div class="quiz-data-row">
                <div class="quiz-data-column">techColorMask</div>{" "}
                <div class="quiz-data-column">{techColorMask}</div>
                <div class="quiz-data-column">superStrConditioner</div>{" "}
                <div class="quiz-data-column">{superStrConditioner}</div>
              </div>
              <div class="quiz-data-row">
                <div class="button-column">fullBlownShampoo</div>
                <div class="button-column">{fullBlownShampoo}</div>
                <div class="button-column">superStrBalm</div>
                <div class="button-column">{superStrBalm}</div>
              </div>
              <br /> <br />
           
            </div>
          </div>
          <br />
          <br />
          TOTAL QUIZZES: {loading ? <ClipLoader size={6} /> : totalQuizCount}
          <br /> COMPLETED QUIZ COUNT/EMAILS ENTERED: {completedQuizCount}&nbsp;
          {!totalQuizLoading
            ? "(" +
              ((completedQuizCount / totalQuizCount) * 100).toFixed(2) +
              "%)"
            : ""}
          <br /> ABANDONED QUIZ COUNT: {abandonedQuiz}&nbsp;
          {!totalQuizLoading
            ? "(" + ((abandonedQuiz / totalQuizCount) * 100).toFixed(2) + "%)"
            : ""}
          {/* <br /> COMPUTE NULL: {this.state.computeNull} */}
          <br />
          {/* TOTAL KLAVIYO EMAILS: {klaviyoEmails} */}
          <br /> <br />
          {/* <span style={{ display: "flex", flexDirection: "quiz-data-row" }}>
            QUIZ TO TRANSACTION SALES: {this.state.loading === false ? (
              <span>
                {parseFloat(totalSales).toFixed(2)}{" "} */}
          {/* <CSVLink data={this.state.csv}>DOWNLOAD CSV</CSVLink> */}
          {/* </span> */}
          {/* ) : ( */}
          {/* <span
                style={{
                  display: "flex",
                  flexDirection: "quiz-data-row",
                  marginLeft: "5px"
                }}
              > */}
          {/* COMPILING CSV  */}
          {/* <PulseLoader size={6} />
              </span>
            )}
          </span> */}
          {/* <span style={{ display: "flex", flexDirection: "quiz-data-row" }}>
            QUIZ USER RETURNING CUSTOMER SALES: {this.state.loading === false ? (
              <span>{parseFloat(returningTotalSales).toFixed(2)} </span>
            ) : (
              <span
                style={{
                  display: "flex",
                  flexDirection: "quiz-data-row",
                  marginLeft: "5px"
                }}
              >
                <PulseLoader size={6} />
              </span>
            )}
          </span> */}
          <span style={{ display: "flex", flexDirection: "quiz-data-row" }}>
            TOTAL SALES OF QUIZ USERS:{" "}
            {!totalQuizLoading ? (
              <span>{parseFloat(totalQuizUserSales).toFixed(2)} </span>
            ) : (
              <span
                style={{
                  display: "flex",
                  flexDirection: "quiz-data-row",
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
