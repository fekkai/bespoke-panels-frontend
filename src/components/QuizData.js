import React, { Component } from "react";

// components
import { Link } from "react-router-dom";
import { ClipLoader, PulseLoader } from "react-spinners";

// styling
import "../styles/Panel.scss";
import "../styles/Table.scss";

// dependencies
// import { CSVLink } from "react-csv";
import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;

export default class QuizData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      loading: true,
      shopifyLoading: true,
      totalQuizLoading: true,
      completedQuizCount: "",
      totalQuizCount: "",
      abandonedQuiz: ""
    };
  }

  async componentDidMount() {
    // this.chatQuizOrders();
    this.fetchPastOrders();
    await this.shopifyOrders();
    await this.fetchEmails();
    await this.fetchOrders();
    await this.fetchQuizData();
    await this.findOrders();
    await this.setState({
      loading: false
    });
  }

  // chatQuizOrders = async () => {
  //   const orders = await axios.get(
  //     `https://bespoke-backend.herokuapp.com/quiz-orders-json?apikey=AkZv1hWkkDH9W2sP9Q5WdX8L8u9lbWeO`
  //   );
  //   let response = await axios(
  //     `https://bespoke-backend.herokuapp.com/fekkai-backend?apikey=AkZv1hWkkDH9W2sP9Q5WdX8L8u9lbWeO`
  //   );
  //   let userData = response.data.reverse();

  //   let total = 0;
  //   let quizCount = 0;
  //   let completeQuizCount = 0;
  //   let abandonedQuizCount = 0;
  //   const today = new Date().getDate();
  //   const thisMonth = new Date().getMonth() + 1;

  //   let bundleOrders = [];
  //   // console.log(orders.data[0]);
  //   for (let order of orders.data) {
  //     if (
  //       order["discount_applications-title"]
  //         .toLowerCase()
  //         .includes("discount bundle")
  //     ) {
  //       // console.lo
  //       // console.log(order["line_items-name"])

  //       function checkNull(value) {
  //         return value === null;
  //       }
  //       order["line_items-name"].splice(
  //         order["line_items-name"].findIndex(checkNull),
  //         1
  //       );

  //       let split = order["discount_applications-title"].split("eD");

  //       let newSplit = [];
  //       for (let splitWord of split) {
  //         splitWord = "Discount Bundle";
  //         newSplit.push(splitWord);
  //       }

  //       order["discount_applications-title"] = newSplit;

  //       // get total sales
  //       total = total + order.total_price;
  //       bundleOrders.push({
  //         order_id: order.id,
  //         order_created: order.created_at,
  //         number: order.order_number,
  //         email: order.email,
  //         line_items: order["line_items-name"],
  //         discount_applications: order["discount_applications-title"],
  //         total_price: order.total_price
  //       });
  //     }
  //   }
  //   console.log("hello", bundleOrders);
  //   for (let i = 0; i < bundleOrders.length; i++) {
  //     axios.post(
  //       "http://bespoke-backend.herokuapp.com/quiz-orders",
  //       bundleOrders[i]
  //     );
  //   }
  // };

  fetchPastOrders = async () => {
    const response = await axios(
      `https://bespoke-backend.herokuapp.com/quiz-orders?apikey=AkZv1hWkkDH9W2sP9Q5WdX8L8u9lbWeO`
    );
    const orders = response.data.sort((a, b) =>
      a.order_created > b.order_created ? 1 : -1
    );

    // console.log(prevOrderMonth, prevOrderDay);
    let currentOrderDay;
    let currentOrderMonth;
    const arrOfOrderDays = [];
    let groupedOrdersbyDay = [];
    let prevOrderDay = new Date("2020-03-20T14:06:42").getDate();
    let prevOrderMonth = new Date("2020-03-20T14:06:42").getMonth() + 1;

    for (let order of orders) {
      currentOrderDay = new Date(order.order_created).getDate();
      currentOrderMonth = new Date(order.order_created).getMonth() + 1;
      console.log(prevOrderDay, prevOrderMonth);
      //  groups all orders by date and push into array
      if (
        prevOrderMonth === currentOrderMonth &&
        prevOrderDay === currentOrderDay
      ) {
        groupedOrdersbyDay.push(order);
      }
      if (
        // check for different prev day. if diff prev day true, push grouped array into sorted orders arr
        prevOrderDay !== currentOrderDay
      ) {
        arrOfOrderDays.push(groupedOrdersbyDay);
        // empty grouped orders by day for new group of orders on new day
        groupedOrdersbyDay = [];
        prevOrderMonth = currentOrderMonth;
        prevOrderDay = currentOrderDay;
      }
    }
    this.setState({ arrOfOrderDays });
    console.log(arrOfOrderDays);
  };

  shopifyOrders = async () => {
    let response = await axios(
      // "http://localhost:4000/fekkai"
      `https://bespoke-backend.herokuapp.com/fekkai?apikey=AkZv1hWkkDH9W2sP9Q5WdX8L8u9lbWeO`
    );
    let discountedItems = 0;
    let totalSalesToday = 0;
    let totalSalesPrevDay = 0;
    let orderCountToday = 0;
    let orderCountPrevDay = 0;
    let totalSalesPrevDayMinus1 = 0;
    let orderCountPrevDayMinus1 = 0;
    let ordersToday = [];
    let ordersPrevDay = [];
    let ordersPrevDayMinus1 = [];
    const today = new Date().getDate();
    const yesterday = new Date().getDate() - 1;

    // line items today
    let lineItemsToday = [];
    let lineItemsPrevDay = [];
    let lineItemsPrevDayMinus1 = [];

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
            orderCountPrevDay++;
            discountedItems++;
            ordersPrevDay.push(order);
          }
          break;
        }
      } else if (
        new Date(order.created_at).getDate() === yesterday - 1 &&
        order.discount_applications
      ) {
        for (let discount of order.discount_applications) {
          let title = discount && discount.title;
          if (title && title.toLocaleLowerCase() === "discount bundle") {
            lineItemsPrevDayMinus1 = lineItemsPrevDayMinus1.concat(
              order.line_items
            );
            totalSalesPrevDayMinus1 += parseFloat(order.total_price);
            orderCountPrevDayMinus1++;
            discountedItems++;
            ordersPrevDayMinus1.push(order);
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
      totalSalesPrevDayMinus1,
      orderCountPrevDayMinus1,
      ordersPrevDayMinus1,
      lineItemsPrevDayMinus1,
      shopifyLoading: false
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
        `https://bespoke-backend.herokuapp.com/klaviyo-emails?apikey=${REACT_APP_API_KEY}`
      );
      const klaviyoEmails = response.data.total_quiz_emails;
      console.log(response.data);
      this.setState({
        klaviyoEmails
      });
      // console.log(this.state.klaviyoEmails);
    } catch (error) {
      console.error(error);
    }
  };

  fetchOrders = async () => {
    try {
      let response = await axios(
        `https://bespoke-backend.herokuapp.com/orders?apikey=${REACT_APP_API_KEY}`
        // "http://localhost:4000/orders"
      );
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
        `https://bespoke-backend.herokuapp.com/fekkai-backend?apikey=${REACT_APP_API_KEY}`
      );
      const emails = [];
      let userData = response.data.reverse();
      let totalQuizCount = response.data.length;
      let uniqueEmails = [];
      let abandonedQuiz = 0;
      let abandonedQuizToday = 0;
      let abandonedQuizPrevDay = 0;
      let abandonedQuizPrevDayMinus1 = 0;
      let completedQuizCount = 0;
      let completeQuizToday = 0;
      let completeQuizPrevDay = 0;
      let completeQuizPrevDayMinus1 = 0;
      let quizPrevDay = 0;
      let quizToday = 0;
      let quizPrevDayMinus1 = 0;

      // where users dropped off quiz
      let drop_email = 0;
      let front_selfie = 0;
      let no_front_selfie_edit = 0;
      let front_selfie_edit = 0;
      let hair_thickness = 0;
      let hair_condition = 0;
      let hair_goals = 0;
      let weather = 0;
      let complete = 0;
      let totalAfterLaunch = 0;
      let testComputeTrue = 0;
      let testComputeFalse = 0;

      const today = new Date().getDate();
      const thisMonth = new Date().getMonth() + 1;
      const yesterday = new Date(today) - 1;

      this.setState({ totalQuizCount });
      console.log(totalQuizCount);

      // query user data instances w/ user_code
      for (let i = 0; userData.length; i++) {
        // check all instances after 03-20-20 launch
        if (userData[i].created > "2020-03-20T00:00:00") {
          let userResponse = await axios.get(
            `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${userData[i].user_code}`
          );

          const data = userResponse.data;

          if (data.user_data.compute === true) {
            testComputeTrue++;
          }
          if (data.user_data.compute === false) {
            testComputeFalse++;
          }
          console.log(testComputeTrue, testComputeFalse);
          if (data.user_code) totalAfterLaunch++;
          if (data.user_data.compute === true) {
            complete++;
          }
          //  selfie does not exist and no CV compute characteristics - only email
          else if (data.user_data.email && !data.user_data.answers)
            drop_email++;
          // selfie exists and any one of the cv data missing - user dropped off after selfie
          else if (
            data.user_data.front_selfie &&
            (!data.user_data.answers.hair_texture ||
              !data.user_data.answers.hair_length ||
              !data.user_data.answers.hair_color)
          )
            front_selfie_edit++;
          // no selfie and at least one cv characterist exists and at least one is missing - user dropped off while editing
          else if (
            !data.user_data.front_selfie &&
            (!data.user_data.answers.hair_texture ||
              !data.user_data.answers.hair_length ||
              !data.user_data.answers.hair_color)
          )
            no_front_selfie_edit++;
          else if (
            data.user_data.front_selfie &&
            !data.user_data.answers.hair_thickness
          )
            front_selfie++;
          //user dropped off before answering any of these questions
          else if (!data.user_data.answers.hair_thickness) hair_thickness++;
          else if (!data.user_data.answers.hair_condition) hair_condition++;
          else if (!data.user_data.answers.hair_goals) hair_goals++;
          // user did not finish quiz at end - same as compute false
          else if (!data.user_data.answers.weather) weather++;

          // total quizzes today
          if (
            new Date(userResponse.data.created).getMonth() + 1 === thisMonth &&
            new Date(userResponse.data.created).getDate() === today
          ) {
            // console.log("today's", userResponse.data.created);
            quizToday++;
            this.setState({
              quizToday
            });
          }

          // completed quizzes today
          if (
            userResponse.data.user_data.compute === true &&
            new Date(userResponse.data.created).getMonth() + 1 === thisMonth &&
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
            new Date(userResponse.data.created).getMonth() + 1 === thisMonth &&
            new Date(userResponse.data.created.toString()).getDate() === today
          ) {
            abandonedQuizToday++;

            this.setState({
              abandonedQuizToday
            });
          }

          // total quizzes prev day
          if (
            new Date(userResponse.data.created).getMonth() + 1 === thisMonth &&
            new Date(userResponse.data.created).getDate() === yesterday
          ) {
            // console.log("yesterday's", userResponse.data.created);
            quizPrevDay++;
            this.setState({
              quizPrevDay
            });
          }

          // completed quizzes prev day
          if (
            userResponse.data.user_data.compute === true &&
            new Date(userResponse.data.created).getMonth() + 1 === thisMonth &&
            new Date(userResponse.data.created.toString()).getDate() ===
              yesterday
          ) {
            completeQuizPrevDay++;

            this.setState({
              completeQuizPrevDay
            });
          }

          // abandoned quizzes prev day
          if (
            userResponse.data.user_data.compute === false &&
            new Date(userResponse.data.created).getMonth() + 1 === thisMonth &&
            new Date(userResponse.data.created.toString()).getDate() ===
              yesterday
          ) {
            abandonedQuizPrevDay++;

            this.setState({
              abandonedQuizPrevDay
            });
          }

          if (
            new Date(userResponse.data.created).getMonth() + 1 === thisMonth &&
            new Date(userResponse.data.created).getDate() === yesterday - 1
          ) {
            // console.log("yesterday's", userResponse.data.created);
            quizPrevDayMinus1++;
            this.setState({
              quizPrevDayMinus1
            });
          }

          // completed quizzes prev day
          if (
            userResponse.data.user_data.compute === true &&
            new Date(userResponse.data.created).getMonth() + 1 === thisMonth &&
            new Date(userResponse.data.created.toString()).getDate() ===
              yesterday - 1
          ) {
            completeQuizPrevDayMinus1++;

            this.setState({
              completeQuizPrevDayMinus1
            });
          }

          // abandoned quizzes prev day
          if (
            userResponse.data.user_data.compute === false &&
            new Date(userResponse.data.created).getMonth() + 1 === thisMonth &&
            new Date(userResponse.data.created.toString()).getDate() ===
              yesterday - 1
          ) {
            abandonedQuizPrevDayMinus1++;

            this.setState({
              abandonedQuizPrevDayMinus1
            });
          }

          // total abandoned quizzes
          if (userResponse.data.user_data.compute === false) {
            abandonedQuiz++;
            this.setState({
              abandonedQuiz
            });
          }

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
            completedQuizCount++;

            // increment completed quiz instance if quiz compute is true
            this.setState({
              completedQuizCount
            });
          }
        } else {
          break;
        }
      }

      this.setState({
        // totalQuizLoading: false
        emails,
        totalQuizCount,
        drop_email,
        front_selfie,
        no_front_selfie_edit,
        front_selfie_edit,
        hair_thickness,
        hair_condition,
        hair_goals,
        complete,
        weather,
        totalAfterLaunch
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
        "total"
        // "subtotal",
        // "lineitem_name",
        // "lineitem_quantity",
        // "billing_province",
        // "shipping_province"
      ]
    ];
    // emails compute true

    for (let email of this.state.emails) {
      for (let order of this.state.orders) {
        let userCreated = email && email.created;
        let userEmail = email && email.email;
        let quizCreated = new Date(userCreated).getDate();
        let orderEmail = order.email.toLocaleLowerCase();
        let orderCreated = new Date(order.created_at).getDate();
        let today = new Date().getDate();
        let yesterday = new Date().getDate() - 1;
        // console.log(order.total);
        if (
          // check for matching email
          userEmail === orderEmail
        ) {
          if (order.total) {
            totalQuizUserSales += parseFloat(order.total);

            // console.log(totalQuizUserSales);
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
          }
        }
      }
      this.setState({
        totalSales,
        returningTotalSales,
        totalQuizUserSales,
        totalQuizLoading: false,
        // totalSalesToday, totalSalesPrevDay,
        csv
      });
    }
  };

  render() {
    const {
      loading,
      shopifyLoading,
      totalQuizLoading,
      completedQuizCount,
      totalQuizCount,
      abandonedQuiz,
      abandonedQuizToday,
      klaviyoEmails,
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
      totalSalesPrevDayMinus1,
      orderCountPrevDayMinus1,
      ordersPrevDayMinus1,
      lineItemsPrevDayMinus1,
      abandonedQuizPrevDayMinus1,
      completeQuizPrevDayMinus1,
      quizPrevDayMinus1,
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
      babyBlondeCreme,
      drop_email,
      front_selfie,
      no_front_selfie_edit,
      front_selfie_edit,
      hair_thickness,
      hair_condition,
      hair_goals,
      weather,
      complete
    } = this.state;

    const today = new Date();
    const yesterday = new Date(today);
    const twoDaysPrior = new Date(today);

    yesterday.setDate(yesterday.getDate() - 1);
    twoDaysPrior.setDate(twoDaysPrior.getDate() - 2);

    // console.log(this.state);
    return (
      <div className="dashboard">
        <span>
          <div style={{ width: "100%" }} className="quiz-data-row">
            <div className="button-column">
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
              <div className="quiz-data-row">
                <div className="quiz-data-column">LAUNCH 03-20-20</div>
              </div>
              <br />
              {/* {new Date().toString()} */}
              <div className="quiz-data-row">
                <div className="quiz-data-column">
                  <b>TODAY - {today.toDateString()}</b>
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">QUIZ COUNT:</div>
                <div className="quiz-data-column">
                  {shopifyLoading ? <ClipLoader size={6} /> : quizToday}
                  {/* {console.log(quizToday)} */}
                </div>{" "}
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">COMPLETE:</div>{" "}
                <div className="quiz-data-column">
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    completeQuizToday +
                    "(" +
                    ((completeQuizToday / quizToday) * 100).toFixed(2) +
                    "%)"
                  )}{" "}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">ABANDONED:</div>{" "}
                <div className="quiz-data-column">
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    abandonedQuizToday +
                    "(" +
                    ((abandonedQuizToday / quizToday) * 100).toFixed(2) +
                    "%)"
                  )}{" "}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">
                  COMPLETED QUIZ CONVERSION:{" "}
                </div>
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    ((orderCountToday / completeQuizToday) * 100).toFixed(2) +
                    "%"
                  )}{" "}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column"> ORDER COUNT:</div>{" "}
                <div className="quiz-data-column">
                  {shopifyLoading ? <ClipLoader size={6} /> : orderCountToday}
                </div>
              </div>
              {/* <br /> */}
              {/* TOTAL QUIZ CONVERSION:{" "}
          {((orderCountToday / quizToday) * 100).toFixed(2) + "%"}{" "}
          {/* {orderCountToday} */}
              <div className="quiz-data-row">
                <div className="quiz-data-column"> TOTAL SALES:</div>{" "}
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    parseFloat(totalSalesToday).toFixed(2)
                  )}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="button-column">
                  {" "}
                  {!shopifyLoading ? (
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
              <br />
              <br />
              <div className="quiz-data-row">
                <div className="quiz-data-column">
                  {" "}
                  <b> PREVIOUS DAY - {yesterday.toDateString()}</b>
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">QUIZ COUNT: </div>{" "}
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? <ClipLoader size={6} /> : quizPrevDay}
                  {/* {console.log(quizPrevDay)} */}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">COMPLETE:</div>
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    completeQuizPrevDay +
                    "(" +
                    ((completeQuizPrevDay / quizPrevDay) * 100).toFixed(2) +
                    "%)"
                  )}{" "}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">ABANDONED:</div>
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    abandonedQuizPrevDay +
                    "(" +
                    ((abandonedQuizPrevDay / quizPrevDay) * 100).toFixed(2) +
                    "%)"
                  )}{" "}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">
                  COMPLETED QUIZ CONVERSION:{" "}
                </div>
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    ((orderCountPrevDay / completeQuizPrevDay) * 100).toFixed(
                      2
                    ) + "%"
                  )}{" "}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column"> ORDER COUNT:</div>
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? <ClipLoader size={6} /> : orderCountPrevDay}
                </div>
              </div>
              {/* <br /> */}
              {/* TOTAL QUIZ CONVERSION:{" "}
          {((orderCountPrevDay / quizPrevDay) * 100).toFixed(2) + "%"}{" "}
          {/* {orderCountPrevDay} */}
              <div className="quiz-data-row">
                <div className="quiz-data-column"> TOTAL SALES:</div>{" "}
                <div className="quiz-data-column">
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    parseFloat(totalSalesPrevDay).toFixed(2)
                  )}
                </div>
              </div>
              <br />
              <div className="quiz-data-row">
                <div className="button-column">
                  {" "}
                  {!shopifyLoading ? (
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
              <br />
              <div className="quiz-data-row">
                <div className="quiz-data-column">
                  {" "}
                  <b> TWO DAYS - {twoDaysPrior.toDateString()}</b>
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">QUIZ COUNT: </div>{" "}
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? <ClipLoader size={6} /> : quizPrevDayMinus1}
                  {/* {console.log(quizPrevDay)} */}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">COMPLETE:</div>
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    completeQuizPrevDayMinus1 +
                    "(" +
                    (
                      (completeQuizPrevDayMinus1 / quizPrevDayMinus1) *
                      100
                    ).toFixed(2) +
                    "%)"
                  )}{" "}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">ABANDONED:</div>
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    abandonedQuizPrevDayMinus1 +
                    "(" +
                    (
                      (abandonedQuizPrevDayMinus1 / quizPrevDayMinus1) *
                      100
                    ).toFixed(2) +
                    "%)"
                  )}{" "}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">
                  COMPLETED QUIZ CONVERSION:{" "}
                </div>
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    (
                      (orderCountPrevDayMinus1 / completeQuizPrevDayMinus1) *
                      100
                    ).toFixed(2) + "%"
                  )}{" "}
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column"> ORDER COUNT:</div>
                <div className="quiz-data-column">
                  {" "}
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    orderCountPrevDayMinus1
                  )}
                </div>
              </div>
              {/* <br /> */}
              {/* TOTAL QUIZ CONVERSION:{" "}
          {((orderCountPrevDay / quizPrevDay) * 100).toFixed(2) + "%"}{" "}
          {/* {orderCountPrevDay} */}
              <div className="quiz-data-row">
                <div className="quiz-data-column"> TOTAL SALES:</div>{" "}
                <div className="quiz-data-column">
                  {shopifyLoading ? (
                    <ClipLoader size={6} />
                  ) : (
                    parseFloat(totalSalesPrevDayMinus1).toFixed(2)
                  )}
                </div>
              </div>
              <br />
              <div className="quiz-data-row">
                <div className="button-column">
                  {" "}
                  {!shopifyLoading ? (
                    <Link
                      to={{
                        pathname: "/orders",
                        state: {
                          ordersPrevDayMinus1: ordersPrevDayMinus1
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
              <div className="quiz-data-row">
                <div className="quiz-data-column"></div>
                <br />
                <br />
              </div>
              <br />
              {/* {new Date().toString()} */}
              <div className="quiz-data-row">
                <div className="quiz-data-column">
                  <b>LINE ITEMS SOLD - {today.toDateString()}</b>
                </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">brilliantGlossShampoo</div>
                <div className="quiz-data-column">
                  {brilliantGlossShampoo}
                </div>{" "}
                <div className="quiz-data-column">fullBlownConditioner</div>
                <div className="quiz-data-column">{fullBlownConditioner}</div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">
                  brilliantGlossConditioner
                </div>{" "}
                <div className="quiz-data-column">
                  {brilliantGlossConditioner}{" "}
                </div>
                <div className="quiz-data-column">fullBlownMist</div>{" "}
                <div className="quiz-data-column">{fullBlownMist} </div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">brilliantGlossCreme</div>{" "}
                <div className="quiz-data-column">{brilliantGlossCreme}</div>
                <div className="quiz-data-column">babyBlondeShampoo</div>{" "}
                <div className="quiz-data-column">{babyBlondeShampoo}</div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column">techColorShampoo </div>
                <div className="quiz-data-column">{techColorShampoo}</div>
                <div className="quiz-data-column">babyBlondeCreme </div>
                <div className="quiz-data-column">{babyBlondeCreme}</div>
              </div>
              <div className="quiz-data-row">
                <div className="quiz-data-column"> techColorConditioner</div>{" "}
                <div className="quiz-data-column">{techColorConditioner}</div>
                <div className="quiz-data-column"> superStrShampoo</div>{" "}
                <div className="quiz-data-column">{superStrShampoo}</div>
              </div>
              {/* <br /> */}
              {/* TOTAL QUIZ CONVERSION:{" "}
          {((orderCountToday / quizToday) * 100).toFixed(2) + "%"}{" "}
          {/* {orderCountToday} */}
              <div className="quiz-data-row">
                <div className="quiz-data-column">techColorMask</div>{" "}
                <div className="quiz-data-column">{techColorMask}</div>
                <div className="quiz-data-column">superStrConditioner</div>{" "}
                <div className="quiz-data-column">{superStrConditioner}</div>
              </div>
              <div className="quiz-data-row">
                <div className="button-column">fullBlownShampoo</div>
                <div className="button-column">{fullBlownShampoo}</div>
                <div className="button-column">superStrBalm</div>
                <div className="button-column">{superStrBalm}</div>
              </div>
              <br /> <br />
            </div>
          </div>
          <br />
          <br />
          TOTAL QUIZZES: {totalQuizCount}
          <br /> COMPLETED QUIZ COUNT: {completedQuizCount}&nbsp;
          {!totalQuizLoading
            ? "(" +
              ((completedQuizCount / totalQuizCount) * 100).toFixed(2) +
              "%)"
            : ""}
          <br /> ABANDONED QUIZ COUNT: {abandonedQuiz}&nbsp;
          {!totalQuizLoading
            ? "(" + ((abandonedQuiz / totalQuizCount) * 100).toFixed(2) + "%)"
            : ""}
          <br />
          KLAVIYO EMAILS ENTERED: {klaviyoEmails}
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
          {/* <span style={{ display: "flex", flexDirection: "quiz-data-row" }}>
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
          </span> */}
        </span>
      </div>
    );
  }
}
