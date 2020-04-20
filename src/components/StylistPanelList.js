import React, { Component } from "react";
import { Link } from "react-router-dom";

//components
import Color from "./Color";
import Conditions from "./Conditions";
import Goals from "./Goals";
import BarGraph from "./BarGraph";
import PopoverComponent from "./common/Popover";
import { Row } from "./common";
import Fade from "react-reveal/Fade";
import { Paper } from "@material-ui/core";
import { RingLoader, PulseLoader } from "react-spinners";

// styling
import "../styles/Panel.scss";
import { css } from "@emotion/core";
// loader styles

// react CSV
import { CSVLink, CSVDownload } from "react-csv";

// services
import axios from "axios";
import aws4 from "aws4";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

const override = css`
  display: block;
  margin: 0 auto;
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

const apiKey = process.env.REACT_APP_FEKKAI_BACKEND_API_KEY;

export default class StylistPanelList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reload: false,
      filter: "",
      data: [],
      ascending: false,
      loading: true,
      checked: false,
      colorOpen: false,
      conditionOpen: false,
      goalsOpen: false,
      page: 1,
      rowQty: 60
    };
  }

  async componentDidMount() {
    this.fetchOrders();
    await this.fetchQuizData();
    await this.answerCount();
    await this.findSales();
    await this.setState({
      loading: false
    });
  }

  fetchOrders = async () => {
    try {
      let response = await axios(
        "https://bespoke-backend.herokuapp.com/orders"
      );

      // const orders = response.data.orders;
      const orders = response.data;
      this.setState({ orders });
    } catch (error) {
      console.error(error);
    }
  };

  fetchQuizCount = async () => {
    let response = await axios(
      // // prod
      // `https://bespoke-backend.herokuapp.com/fekkai-backend`
      // qa
      `https://fekkai-backend.herokuapp.com/backend/get_user_codes?apikey=804727d788a44db68a47c64f10fa573f`
    );

    // response = JSON.parse(JSON.stringify(response));

    let totalAbandonedQuiz = 0;
    let userData = response.data.reverse();
    // for (let userCode of userData

    for (let usercodes of userData) {
      let userResponse = await axios.get(
        `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${usercodes.user_code}`
      );

      if (
        // userResponse.data.created > "2020-03-19T23:59:59" &&
        userResponse.data.user_data.compute === false
      ) {
        totalAbandonedQuiz++;

        this.setState({
          totalAbandonedQuiz
        });
      }
    }
  };

  fetchQuizData = async page => {
    try {
      let response = await axios(
        // prod
        // `https://bespoke-backend.herokuapp.com/fekkai-backend`
        // qa
        `https://fekkai-backend.herokuapp.com/backend/get_user_codes?apikey=804727d788a44db68a47c64f10fa573f`
      );

      // response = JSON.parse(JSON.stringify(response));
      const data = [];
      const emails = [];
      let completedQuizCount = 0;
      let abandonedQuiz = 0;
      let totalAbandonedQuiz = 0;
      let totalQuizCount = response.data.length;
      let userData = response.data.reverse();
      let page = this.state.page;
      const { rowQty } = this.state;
      this.setState({
        page: page
      });
      for (
        // page multiplied by number of rows items on each page
        let i = page * rowQty - rowQty;
        i < page * rowQty;
        i++ // let i = 0; // i < response.length; // i++
      ) {
        let userCode = userData[i].user_code;
        let userResponse = await axios.get(
          `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${userCode}`,
          { cancelToken: source.token }
        );

        // console.log(userResponse.data.user_data.email);

        if (
          // userResponse.data.created > "2020-03-19T23:59:59" &&
          userResponse.data.user_data.compute === false
        ) {
          abandonedQuiz++;

          this.setState({
            abandonedQuiz
          });
        }

        // arrays for sorting quiz scores
        const shampooScores = [];
        const conditionerScores = [];
        const thirdScores = [];
        const skeletons = [
          "moi1_SH",
          "moi1_CN",
          "moi1_TH",
          "col1_SH",
          "col1_CN",
          "col1_TH",
          "vol1_SH",
          "vol1_CN",
          "vol1_TH",
          "rep1_SH",
          "rep1_CN",
          "rep1_TH",
          "bl1_SH",
          "bl1_TH"
        ];

        // sort shampoo scores
        if (
          // userResponse.data.created > "2020-03-19T23:59:59" &&
          userResponse.data.user_data.compute === true &&
          !userResponse.data.user_data.name
            .toLocaleLowerCase()
            .includes("jame kim")
        ) {
          // console.log(userResponse.data)
          if (
            !emails.includes(
              userResponse.data.user_data.email.toLocaleLowerCase()
            )
          ) {
            emails.push(userResponse.data.user_data.email.toLocaleLowerCase());
          }
          let shampooKey;
          let conditionerKey;
          let thirdKey;
          let shampooValue;
          let conditionerValue;
          let thirdValue;
          completedQuizCount++;

          this.setState({
            completedQuizCount
          });

          for (let key in userResponse.data.ingredients.master.formula) {
            if (key.includes("SH") && skeletons.indexOf(key) > -1) {
              // indexOf returns first index where an element can be found. -1 is not present.
              shampooScores.push(
                parseInt(userResponse.data.ingredients.master.formula[key])
              );
              shampooScores.sort((a, b) => b - a);
            }
            if (
              shampooScores[0] ===
                userResponse.data.ingredients.master.formula[key] &&
              key.includes("SH")
            ) {
              shampooKey = key;
              shampooValue = userResponse.data.ingredients.master.formula[key];
            }
          }
          shampooScores.sort((a, b) => b - a);

          // sort conditioner scores
          for (let key in userResponse.data.ingredients.master.formula) {
            if (key.includes("CN") && skeletons.indexOf(key) > -1) {
              // indexOf returns first index where an element can be found. -1 is not present.
              conditionerScores.push(
                parseInt(userResponse.data.ingredients.master.formula[key])
              );
              conditionerScores.sort((a, b) => b - a);
            }
            if (
              conditionerScores[0] ===
                userResponse.data.ingredients.master.formula[key] &&
              key.includes("CN")
            ) {
              conditionerKey = key;
              conditionerValue =
                userResponse.data.ingredients.master.formula[key];
            }
          }
          conditionerScores.sort((a, b) => b - a);

          // sort third scores
          for (let key in userResponse.data.ingredients.master.formula) {
            if (key.includes("TH") && skeletons.indexOf(key) > -1) {
              // indexOf returns first index where an element can be found. -1 is not present.
              thirdScores.push(
                parseInt(userResponse.data.ingredients.master.formula[key])
              );
              thirdScores.sort((a, b) => b - a);
            }
            if (
              thirdScores[0] ===
                userResponse.data.ingredients.master.formula[key] &&
              key.includes("TH")
            ) {
              thirdKey = key;
              thirdValue = userResponse.data.ingredients.master.formula[key];
            }
          }
          thirdScores.sort((a, b) => b - a);

          data.push({
            id: userResponse.data._id,
            userCode: userData[i].user_code,
            locale: userData[i].created || userData[i].updated,
            name: userResponse.data.user_data.name,
            email: userResponse.data.user_data.email,
            hairThickness: userResponse.data.user_data.answers.hair_thickness,
            hairTexture: !userResponse.data.user_data.answers.hair_texture
              ? "n/a"
              : userResponse.data.user_data.answers.hair_texture,
            hairColor: !userResponse.data.user_data.answers.hair_color
              ? "n/a"
              : userResponse.data.user_data.answers.hair_color,
            hairCondition: userResponse.data.user_data.answers.hair_condition,
            hairGoals: !userResponse.data.user_data.answers.hair_goals
              ? "n/a"
              : userResponse.data.user_data.answers.hair_goals,
            hairLength: !userResponse.data.user_data.answers.hair_length
              ? "n/a"
              : userResponse.data.user_data.answers.hair_length,
            city: userResponse.data.user_data.weather.city,
            uvRisk: userResponse.data.user_data.weather.scores.uv_risk,
            airQuality: userResponse.data.user_data.weather.scores.air_quality,
            waterHardness:
              userResponse.data.user_data.weather.scores.water_hardness,
            humidity: userResponse.data.user_data.weather.scores.humidity,
            windSpeed: userResponse.data.user_data.weather.scores.wind_speed,
            shampooKey,
            conditionerKey,
            thirdKey,
            frontSelfie: userResponse.data.user_data.front_selfie,
            cvData: userResponse.data.user_data.cv_data,
            page: this.state.page
          });
          //     if (
          //       new Date(userData[i].created).getDate() === new Date().getDate()
          //     ) {
          //       console.log(data);
          //     }
        }
      }

      this.setState({
        data,
        emails,
        totalQuizCount,
        loading: false
      });
      await this.answerCount();
    } catch (error) {
      console.error(error);
    }
  };

  findSales = () => {
    let saleEmail = 0;
    let nonSaleEmail = 0;
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

  compareAsc = key => {
    this.setState({
      ascending: true
    });
    return function (a, b) {
      if (a[key] < b[key]) {
        return -1;
      }
    };
  };

  compareDsc = key => {
    this.setState({
      ascending: false
    });
    return function (a, b) {
      if (a[key] > b[key]) {
        return -1;
      }
    };
  };

  sortBy = key => {
    let arrayCopy = [...this.state.data];
    if (this.state.ascending === true) {
      arrayCopy.sort(this.compareDsc(key));
      this.setState({ data: arrayCopy });
    } else if (this.state.ascending === false) {
      arrayCopy.sort(this.compareAsc(key));
      this.setState({ data: arrayCopy });
    }
  };

  handleChange = e => {
    this.setState({
      filter: e.target.name || e.target.innerText,
      checked: true,
      colorOpen: false,
      conditionOpen: false,
      goalsOpen: false
    });
  };

  reset = e => {
    this.setState({
      filter: "",
      colorOpen: false,
      conditionOpen: false,
      goalsOpen: false
    });
  };

  handleColorBtn = () => {
    this.setState(state => {
      return {
        colorOpen: !state.colorOpen
      };
    });
  };

  handleConditionBtn = () => {
    this.setState(state => {
      return {
        conditionOpen: !state.conditionOpen
      };
    });
  };

  handleGoalsBtn = () => {
    this.setState(state => {
      return {
        goalsOpen: !state.goalsOpen
      };
    });
  };

  handleClickOutside = event => {
    if (
      this.container0.current &&
      !this.container0.current.contains(event.target)
    ) {
      this.setState({
        colorOpen: false
      });
    }
    if (
      this.container1.current &&
      !this.container1.current.contains(event.target)
    ) {
      this.setState({
        conditionOpen: false
      });
    }
    if (
      this.container2.current &&
      !this.container2.current.contains(event.target)
    ) {
      this.setState({
        goalsOpen: false
      });
    }
  };

  handlePage = async e => {
    // console.log(e.target.value);
    await this.setState({
      page: e.target.value
    });
    await this.fetchQuizData();
  };

  handlePrevPage = async e => {
    this.setState({
      page: this.state.page - 1,
      loading: true
    });
    this.fetchQuizData();
  };

  handleNextPage = async e => {
    await this.setState({
      page: this.state.page + 1,
      loading: true
    });
    await this.fetchQuizData();
  };

  handleFirstPage = async e => {
    await this.setState({
      page: 1
    });
    await this.fetchQuizData();
  };

  handlePageDrop = async e => {
    await this.setState({
      // display: "none",
      filteredData: [],
      page: e.target.value,
      loading: true
    });
    // await source.cancel("Operation canceled by the user.");
    await this.fetchQuizData();
  };

  handleAllPages = async e => {
    await this.setState({
      rowQty: this.state.totalQuizCount,
      loading: true
    });
  };

  renderPagination = () => {
    const { rowQty } = this.state;
    let numPages = Math.floor(this.state.totalQuizCount / rowQty);
    let pagesArr = [];
    for (let i = 0; i < numPages; i++) {
      pagesArr.push(i + 1);
    }

    // handleChartData = () => {

    //   this.setState({chartData})
    // }

    // dropdown
    return (
      <select className="select-css" onChange={this.handlePageDrop}>
        {pagesArr.map(num => {
          return <option>{num}</option>;
        })}
      </select>
    );
  };

  renderRows = () => {
    const { filter, data } = this.state;
    let filteredData = data.filter(item => {
      return Object.keys(item).some(key =>
        key === "hairCondition" || key === "hairGoals" || key === "hairColor"
          ? item[key]
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          : ""
      );
    });

    return filteredData.map(rowData => {
      // console.log(rowData);
      return (
        <Link
          key={rowData.id}
          style={{
            textDecoration: "none"
          }}
          to={{
            pathname: "/stylist-panel-user",
            state: {
              userCode: rowData.userCode,
              name: rowData.name,
              locale: rowData.locale,
              email: rowData.email,
              hairThickness: rowData.hairThickness,
              hairTexture: rowData.hairTexture,
              hairColor: rowData.hairColor,
              hairCondition: rowData.hairCondition,
              hairGoals: rowData.hairGoals,
              hairLength: rowData.hairLength,
              city: rowData.city,
              uvRisk: rowData.uvRisk,
              airQuality: rowData.airQuality,
              waterHardness: rowData.waterHardness,
              humidity: rowData.humidity,
              windSpeed: rowData.windSpeed,
              shampooKey: rowData.shampooKey,
              conditionerKey: rowData.conditionerKey,
              thirdKey: rowData.thirdKey,
              frontSelfie: rowData.frontSelfie,
              page: rowData.page
            }
          }}
        >
          <Row {...rowData} />
        </Link>
      );
    });
  };

  answerCount = () => {
    const { filter, data } = this.state;
    let filteredData = data.filter(item => {
      return Object.keys(item).some(key =>
        key === "hairCondition" || key === "hairGoals" || key === "hairColor"
          ? item[key]
              .toString()
              .toLocaleLowerCase()
              .includes(filter.toLocaleLowerCase())
          : ""
      );
    });

    let short = 0;
    let chin_length = 0;
    let shoulder_length = 0;
    let long = 0;
    let straight = 0;
    let wavy = 0;
    let curly = 0;
    let coily = 0;
    let blonde = 0;
    let brown = 0;
    let black = 0;
    let red = 0;
    let silver = 0;
    let fine = 0;
    let medium = 0;
    let thick = 0;
    let color_treated = 0;
    let highlights = 0;
    let chemically_straightened = 0;
    let split_ends = 0;
    let frequent_heat_styling = 0;
    let none = 0;
    let color_protect = 0;
    let uv_protect = 0;
    let damage_repair = 0;
    let frizz_control = 0;
    let smoothing = 0;
    let healthy_shine = 0;
    let hydrate = 0;
    let volumizing = 0;

    filteredData.map(rowData => {
      console.log(rowData.hairCondition[0]);
      if (rowData.hairLength === "short") {
        short++;
      }
      if (rowData.hairLength === "chin_length") {
        chin_length++;
      }
      if (rowData.hairLength === "shoulder_length") {
        shoulder_length++;
      }
      if (rowData.hairLength === "long") {
        long++;
      }
      if (rowData.hairTexture === "straight") {
        straight++;
      }
      if (rowData.hairTexture === "wavy") {
        wavy++;
      } else if (rowData.hairTexture === "curly") {
        curly++;
      }
      if (rowData.hairTexture === "coily") {
        coily++;
      }
      if (rowData.hairColor === "blonde") {
        blonde++;
      }
      if (rowData.hairColor === "brown") {
        brown++;
      }
      if (rowData.hairColor === "black") {
        black++;
      }
      if (rowData.hairColor === "red") {
        red++;
      }
      if (rowData.hairColor === "silver") {
        silver++;
      }
      if (rowData.hairThickness === "fine") {
        fine++;
      }
      if (rowData.hairThickness === "medium") {
        medium++;
      }
      if (rowData.hairThickness === "thick") {
        thick++;
      }
      if (
        // rowData.hairCondition &&
        rowData.hairCondition.includes("color_treated")
      ) {
        color_treated++;
      }
      if (rowData.hairCondition.includes("highlights")) {
        highlights++;
      }
      if (rowData.hairCondition.includes("chemically_straightened")) {
        chemically_straightened++;
      }
      if (rowData.hairCondition.includes("split_ends")) {
        split_ends++;
      }
      if (rowData.hairCondition.includes("frequent_heat_styling")) {
        frequent_heat_styling++;
      }
      if (rowData.hairCondition.includes("none")) {
        none++;
      }
      if (rowData.hairGoals.includes("color_protect")) {
        color_protect++;
      }
      if (rowData.hairGoals.includes("uv_protect")) {
        uv_protect++;
      }
      if (rowData.hairGoals.includes("damage_repair")) {
        damage_repair++;
      }
      if (rowData.hairGoals.includes("frizz_control")) {
        frizz_control++;
      }
      if (rowData.hairGoals.includes("smoothing")) {
        smoothing++;
      }
      if (rowData.hairGoals.includes("healthy_shine")) {
        healthy_shine++;
      }
      if (rowData.hairGoals.includes("hydrate")) {
        hydrate++;
      }
      if (rowData.hairGoals.includes("volumizing")) {
        volumizing++;
      }
    });

    let chartData1 = [
      { answer: "short", count: short },
      { answer: "chin_length", count: chin_length },
      { answer: "shoulder_length", count: shoulder_length },
      { answer: "long", count: long },
      { answer: "straight", count: straight },
      { answer: "wavy", count: wavy },
      { answer: "curly", count: curly },
      { answer: "coily", count: coily }
    ];

    let chartData2 = [
      { answer: "blonde", count: blonde },
      { answer: "brown", count: brown },
      { answer: "black", count: black },
      { answer: "red", count: red },
      { answer: "silver", count: silver },
      { answer: "fine", count: fine },
      { answer: "medium", count: medium },
      { answer: "thick", count: thick }
    ];

    let chartData3 = [
      { answer: "color_treated", count: color_treated },
      { answer: "highlights", count: highlights },
      { answer: "chemically_straightened", count: chemically_straightened },
      { answer: "split_ends", count: split_ends },
      { answer: "frequent_heat_styling", count: frequent_heat_styling },
      { answer: "none", count: none }
    ];

    let chartData4 = [
      { answer: "color_protect", count: color_protect },
      { answer: "uv_protect", count: uv_protect },
      { answer: "damage_repair", count: damage_repair },
      { answer: "frizz_control", count: frizz_control },
      { answer: "smoothing", count: smoothing },
      { answer: "healthy_shine", count: healthy_shine },
      { answer: "hydrate", count: hydrate },
      { answer: "volumizing", count: volumizing }
    ];
    this.setState({
      chartData1,
      chartData2,
      chartData3,
      chartData4
    });
    // console.log(this.state.chartData4);
  };

  renderPopOver = () => {
    const styles = this.getStyles();

    const { chartData1, chartData2, chartData3, chartData4 } = this.state;
    const chartData = [
      { data: chartData1, title: "LENGTH/TEXTURE" },
      { data: chartData2, title: "COLOR/THICKNESS" },
      { data: chartData3, title: "CONDITIONS" },
      { data: chartData4, title: "GOALS" }
    ];

    return chartData.map(chartData => {
      return (
        <PopoverComponent
          styles={styles}
          data={chartData.data}
          title={chartData.title}
        />
      );
    });
  };

  getStyles() {
    return {
      // DATA SET ONE
      axisOne: {
        axis: { stroke: "#545454", strokeWidth: 0 },
        tickLabels: {
          fontFamily: "avenir",
          fontSize: 6
        }
      },

      // DATA SET TWO
      axisTwo: {
        tickLabels: {
          fill: "#545454",
          fontFamily: "urwdin-regular",
          fontSize: 6
        }
      }
    };
  }

  render() {
    const { ascending } = this.state;

    return (
      <div className="dashboard">
        <div className="pagination-section">
          <span style={{ paddingLeft: "5px" }}>
            {!this.state.loading ? (
              <Link to={{ pathname: "/quiz-data" }}>
                <button style={{ width: "100%" }} id="list-view-btn">
                  QUIZ DATA
                </button>
              </Link>
            ) : (
              <span style={{ display: "flex" }}>
                LOADING <PulseLoader size={6} />
              </span>
            )}
            {!this.state.loading ? this.renderPopOver() : ""}
          </span>

          <span>
            {this.state.filter ? (
              <Fade style={{ marginLeft: "5px" }}>
                <span id="filter">
                  FILTER: &nbsp;
                  <span id="filter-box">
                    {this.state.filter}{" "}
                    <span id="filter-x" onClick={this.reset}>
                      &nbsp; x
                    </span>
                  </span>
                </span>
              </Fade>
            ) : (
              ""
            )}
            &nbsp; &nbsp; Page: {this.renderPagination()}{" "}
          </span>
        </div>

        <Fade>
          <Paper elevation={0}>
            <div className="table">
              <div className="list-header">
                <div
                  style={{
                    flex: 0.7
                  }}
                  onClick={() => this.sortBy("locale")}
                >
                  <div>
                    {" "}
                    DATE_TIME <span>{ascending ? "▲" : "▼"}</span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 0.4
                  }}
                  // onClick={() => this.sortBy("name")}
                >
                  <div>
                    NAME <span>{/* {ascending ? "▲" : "▼"} */}</span>
                  </div>
                </div>

                <div
                  style={{
                    flex: 0.7
                  }}
                  // onClick={() => this.sortBy("frontSelfie")}
                >
                  <div>SELFIE</div>
                </div>
                <div
                  style={{
                    flex: 0.5
                  }}
                  onClick={() => this.sortBy("hairThickness")}
                >
                  <div>
                    THICK <span>{ascending ? "▲" : "▼"}</span>
                  </div>
                </div>
                <div
                  style={{
                    flex: 0.5
                  }}
                  onClick={() => this.sortBy("hairTexture")}
                >
                  <div>
                    TEXTURE <span>{ascending ? "▲" : "▼"}</span>
                  </div>
                </div>

                <div
                  className="container"
                  id="conditions-goals"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    flex: 0.5
                  }}
                  ref={this.container0}
                >
                  <div onClick={this.handleColorBtn}>COLOR ☰</div>
                  {this.state.colorOpen && (
                    <Color
                      // checked={this.state.checked}
                      handleChange={this.handleChange}
                    />
                  )}
                </div>

                <div
                  style={{
                    flex: 0.5
                  }}
                  onClick={() => this.sortBy("hair_length" && "hairLength")}
                >
                  <div>
                    LENGTH <span>{ascending ? "▲" : "▼"}</span>
                  </div>
                </div>

                <div
                  className="container"
                  id="conditions-goals"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    flex: 1
                  }}
                  ref={this.container1}
                >
                  <div onClick={this.handleConditionBtn}>CONDITIONS ☰</div>
                  {this.state.conditionOpen && (
                    <Conditions
                      // checked={this.state.checked}
                      handleChange={this.handleChange}
                    />
                  )}
                </div>

                <div
                  id="conditions-goals"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    flex: 1
                  }}
                  ref={this.container2}
                >
                  <div onClick={this.handleGoalsBtn}>GOALS ☰</div>
                  {this.state.goalsOpen && (
                    <Goals handleChange={this.handleChange} />
                  )}
                </div>
              </div>

              <div style={{ display: this.state.display }}>
                {this.renderRows()}
                {/* <Loader className="loader-active" type="ball-triangle-path" /> */}
                <RingLoader
                  css={override}
                  size={150}
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
