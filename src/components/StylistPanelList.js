import React, { Component } from "react";
import { Link } from "react-router-dom";

//components
import Color from "./Color";
import Conditions from "./Conditions";
import Goals from "./Goals";
import PopoverPie from "./common/PopoverPie";
import PopoverBar from "./common/PopoverBar";
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
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY


export default class StylistPanelList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reload: false,
      filter: "",
      data: [],
      ascending: false,
      loading: true,
      totalChartLoading: true,
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
    this.fetchQuizData();
    this.fetchQuizCount();
    await this.fetchPageQuizData();
    await this.answerCount();
    // await this.findSales();
    await this.setState({
      loading: false
    });
  }

  fetchOrders = async () => {
    try {
      let response = await axios(
        `https://bespoke-backend.herokuapp.com/orders?apikey=${REACT_APP_API_KEY}`
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
      `https://bespoke-backend.herokuapp.com/fekkai-backend?apikey=${REACT_APP_API_KEY}`
      // qa
      // `https://fekkai-backend.herokuapp.com/backend/get_user_codes?apikey=804727d788a44db68a47c64f10fa573f`
    );

    // response = JSON.parse(JSON.stringify(response));

    let totalAbandonedQuiz = 0;
    let abandonedQuizEmails = [];

    // for (let userCode of userData

    for (let userCode of response.data.reverse()) {
      let userResponse = await axios.get(
        `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${userCode.user_code}`
      );

      if (
        // userResponse.data.created > "2020-03-19T23:59:59" &&
        userResponse.data.user_data.compute === false
      ) {
        totalAbandonedQuiz++;
        abandonedQuizEmails.push(userResponse.data.user_data.email);
        // console.log(abandonedQuizEmails, "hello");
        this.setState({
          totalAbandonedQuiz
        });
      }
    }
    this.setState({
      abandonedQuizEmails
    });
  };

  fetchPageQuizData = async page => {
    try {
      let response = await axios(
        // prod
        `https://bespoke-backend.herokuapp.com/fekkai-backend?apikey=${REACT_APP_API_KEY}`
        // qa
        // `https://fekkai-backend.herokuapp.com/backend/get_user_codes?apikey=804727d788a44db68a47c64f10fa573f`
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
        // let i = 0;
        i < page * rowQty;
        // i<1000;
        i++ // let i = 0; // i < response.length; // i++
      ) {
        if (userData[i].created > "2020-03-20T00:00:00") {
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
            // abandonedQuizEmails.push(userResponse.user_data.email);
            // console.log(abandonedQuizEmails, "hello");
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
              emails.push(
                userResponse.data.user_data.email.toLocaleLowerCase()
              );
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
                shampooValue =
                  userResponse.data.ingredients.master.formula[key];
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
              airQuality:
                userResponse.data.user_data.weather.scores.air_quality,
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
        } else {
          break;
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

  fetchQuizData = async () => {
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
    let quizCount = 0;

    if (localStorage.getItem("short")) {
      let totalChartData1 = [
        {
          x: "short" + " " + parseInt(localStorage.getItem("short")),
          y: parseInt(localStorage.getItem("short"))
        },
        {
          x:
            "chin_length" + " " + parseInt(localStorage.getItem("chin_length")),
          y: parseInt(localStorage.getItem("chin_length"))
        },
        {
          x:
            "shoulder_length" +
            " " +
            parseInt(localStorage.getItem("shoulder_length")),
          y: parseInt(localStorage.getItem("shoulder_length"))
        },
        {
          x: "long" + " " + parseInt(localStorage.getItem("long")),
          y: parseInt(localStorage.getItem("long"))
        },
        {
          x: "straight" + " " + parseInt(localStorage.getItem("straight")),
          y: parseInt(localStorage.getItem("straight"))
        },
        {
          x: "wavy" + " " + parseInt(localStorage.getItem("wavy")),
          y: parseInt(localStorage.getItem("wavy"))
        },
        {
          x: "curly" + " " + parseInt(localStorage.getItem("curly")),
          y: parseInt(localStorage.getItem("curly"))
        },
        {
          x: "coily" + " " + parseInt(localStorage.getItem("coily")),
          y: parseInt(localStorage.getItem("coily"))
        }
      ];

      let totalChartData2 = [
        {
          x: "blonde" + " " + parseInt(localStorage.getItem("blonde")),
          y: parseInt(localStorage.getItem("blonde"))
        },
        {
          x: "brown" + " " + parseInt(localStorage.getItem("brown")),
          y: parseInt(localStorage.getItem("brown"))
        },
        {
          x: "black" + " " + parseInt(localStorage.getItem("black")),
          y: parseInt(localStorage.getItem("black"))
        },
        {
          x: "red" + " " + parseInt(localStorage.getItem("red")),
          y: parseInt(localStorage.getItem("red"))
        },
        {
          x: "silver" + " " + parseInt(localStorage.getItem("silver")),
          y: parseInt(localStorage.getItem("silver"))
        },
        {
          x: "fine" + " " + parseInt(localStorage.getItem("fine")),
          y: parseInt(localStorage.getItem("fine"))
        },
        {
          x: "medium" + " " + parseInt(localStorage.getItem("medium")),
          y: parseInt(localStorage.getItem("medium"))
        },
        {
          x: "thick" + " " + parseInt(localStorage.getItem("thick")),
          y: parseInt(localStorage.getItem("thick"))
        }
      ];

      let totalChartData3 = [
        {
          x:
            "color_treated" +
            " " +
            parseInt(localStorage.getItem("color_treated")),
          y: parseInt(localStorage.getItem("color_treated"))
        },
        {
          x: "highlights" + " " + parseInt(localStorage.getItem("highlights")),
          y: parseInt(localStorage.getItem("highlights"))
        },
        {
          x:
            "chemically_straightened" +
            " " +
            parseInt(localStorage.getItem("chemically_straightened")),
          y: parseInt(localStorage.getItem("chemically_straightened"))
        },
        {
          x: "split_ends" + " " + parseInt(localStorage.getItem("split_ends")),
          y: parseInt(localStorage.getItem("split_ends"))
        },
        {
          x:
            "frequent_heat_styling" +
            " " +
            parseInt(localStorage.getItem("frequent_heat_styling")),
          y: parseInt(localStorage.getItem("frequent_heat_styling"))
        },
        {
          x: "none" + " " + parseInt(localStorage.getItem("none")),
          y: parseInt(localStorage.getItem("none"))
        }
      ];

      let totalChartData4 = [
        {
          x:
            "color_protect" +
            " " +
            parseInt(localStorage.getItem("color_protect")),
          y: parseInt(localStorage.getItem("color_protect"))
        },
        {
          x: "uv_protect" + " " + parseInt(localStorage.getItem("uv_protect")),
          y: parseInt(localStorage.getItem("uv_protect"))
        },
        {
          x:
            "damage_repair" +
            " " +
            parseInt(localStorage.getItem("damage_repair")),
          y: parseInt(localStorage.getItem("damage_repair"))
        },
        {
          x:
            "frizz_control" +
            " " +
            parseInt(localStorage.getItem("frizz_control")),
          y: parseInt(localStorage.getItem("frizz_control"))
        },
        {
          x: "smoothing" + " " + parseInt(localStorage.getItem("smoothing")),
          y: parseInt(localStorage.getItem("smoothing"))
        },
        {
          x:
            "healthy_shine" +
            " " +
            parseInt(localStorage.getItem("healthy_shine")),
          y: parseInt(localStorage.getItem("healthy_shine"))
        },
        {
          x: "hydrate" + " " + parseInt(localStorage.getItem("hydrate")),
          y: parseInt(localStorage.getItem("hydrate"))
        },
        {
          x: "volumizing" + " " + parseInt(localStorage.getItem("volumizing")),
          y: parseInt(localStorage.getItem("volumizing"))
        }
      ];

      this.setState({
        totalChartData1,
        totalChartData2,
        totalChartData3,
        totalChartData4,
        totalChartLoading: false
      });
    } else {
      try {
        let response = await axios(
          `https://fekkai-backend.herokuapp.com/backend/get_user_codes?apikey=804727d788a44db68a47c64f10fa573f`
        );

        let userData = response.data.reverse();

        for (let i = 0; i < userData.length; i++) {
          if (userData[i].created > "2020-03-20T00:00:00") {
            quizCount++;
            let userCode = userData[i].user_code;
            let userResponse = await axios.get(
              `https://fekkai-backend.herokuapp.com/backend/formula?user_code=${userCode}`
            );

            if (
              userResponse.data.user_data.compute === true &&
              !userResponse.data.user_data.name
                .toLocaleLowerCase()
                .includes("jame kim")
            ) {
              if (userResponse.data.user_data.answers.hair_length === "short") {
                short++;
              }
              if (
                userResponse.data.user_data.answers.hair_length ===
                "chin_length"
              ) {
                chin_length++;
              }
              if (
                userResponse.data.user_data.answers.hair_length ===
                "shoulder_length"
              ) {
                shoulder_length++;
              }
              if (userResponse.data.user_data.answers.hair_length === "long") {
                long++;
              }
              if (
                userResponse.data.user_data.answers.hair_texture === "straight"
              ) {
                straight++;
              }
              if (userResponse.data.user_data.answers.hair_texture === "wavy") {
                wavy++;
              } else if (
                userResponse.data.user_data.answers.hair_texture === "curly"
              ) {
                curly++;
              }
              if (
                userResponse.data.user_data.answers.hair_texture === "coily"
              ) {
                coily++;
              }
              if (userResponse.data.user_data.answers.hair_color === "blonde") {
                blonde++;
              }
              if (userResponse.data.user_data.answers.hair_color === "brown") {
                brown++;
              }
              if (userResponse.data.user_data.answers.hair_color === "black") {
                black++;
              }
              if (userResponse.data.user_data.answers.hair_color === "red") {
                red++;
              }
              if (userResponse.data.user_data.answers.hair_color === "silver") {
                silver++;
              }
              if (
                userResponse.data.user_data.answers.hair_thickness === "fine"
              ) {
                fine++;
              }
              if (
                userResponse.data.user_data.answers.hair_thickness === "medium"
              ) {
                medium++;
              }
              if (
                userResponse.data.user_data.answers.hair_thickness === "thick"
              ) {
                thick++;
              }
              if (
                // rowData.hairCondition &&
                userResponse.data.user_data.answers.hair_condition.includes(
                  "color_treated"
                )
              ) {
                color_treated++;
              }
              if (
                userResponse.data.user_data.answers.hair_condition.includes(
                  "highlights"
                )
              ) {
                highlights++;
              }
              if (
                userResponse.data.user_data.answers.hair_condition.includes(
                  "chemically_straightened"
                )
              ) {
                chemically_straightened++;
              }
              if (
                userResponse.data.user_data.answers.hair_condition.includes(
                  "split_ends"
                )
              ) {
                split_ends++;
              }
              if (
                userResponse.data.user_data.answers.hair_condition.includes(
                  "frequent_heat_styling"
                )
              ) {
                frequent_heat_styling++;
              }
              if (
                userResponse.data.user_data.answers.hair_condition.includes(
                  "none"
                )
              ) {
                none++;
              }
              if (
                userResponse.data.user_data.answers.hair_goals.includes(
                  "color_protect"
                )
              ) {
                color_protect++;
              }
              if (
                userResponse.data.user_data.answers.hair_goals.includes(
                  "uv_protect"
                )
              ) {
                uv_protect++;
              }
              if (
                userResponse.data.user_data.answers.hair_goals.includes(
                  "damage_repair"
                )
              ) {
                damage_repair++;
              }
              if (
                userResponse.data.user_data.answers.hair_goals.includes(
                  "frizz_control"
                )
              ) {
                frizz_control++;
              }
              if (
                userResponse.data.user_data.answers.hair_goals.includes(
                  "smoothing"
                )
              ) {
                smoothing++;
              }
              if (
                userResponse.data.user_data.answers.hair_goals.includes(
                  "healthy_shine"
                )
              ) {
                healthy_shine++;
              }
              if (
                userResponse.data.user_data.answers.hair_goals.includes(
                  "hydrate"
                )
              ) {
                hydrate++;
              }
              if (
                userResponse.data.user_data.answers.hair_goals.includes(
                  "volumizing"
                )
              ) {
                volumizing++;
              }
            }
          } else {
            break;
          }
        }
      } catch (error) {
        console.error(error);
      }
      console.log(short);

      localStorage.setItem("short", short);
      localStorage.setItem("chin_length", chin_length);
      localStorage.setItem("shoulder_length", shoulder_length);
      localStorage.setItem("long", long);
      localStorage.setItem("straight", straight);
      localStorage.setItem("wavy", wavy);
      localStorage.setItem("curly", curly);
      localStorage.setItem("coily", coily);
      localStorage.setItem("blonde", blonde);
      localStorage.setItem("brown", brown);
      localStorage.setItem("black", black);
      localStorage.setItem("red", red);
      localStorage.setItem("silver", silver);
      localStorage.setItem("fine", fine);
      localStorage.setItem("medium", medium);
      localStorage.setItem("thick", thick);
      localStorage.setItem("color_treated", color_treated);
      localStorage.setItem("highlights", highlights);
      localStorage.setItem("chemically_straightened", chemically_straightened);
      localStorage.setItem("split_ends", split_ends);
      localStorage.setItem("frequent_heat_styling", frequent_heat_styling);
      localStorage.setItem("none", none);
      localStorage.setItem("color_protect", color_protect);
      localStorage.setItem("uv_protect", uv_protect);
      localStorage.setItem("damage_repair", damage_repair);
      localStorage.setItem("frizz_control", frizz_control);
      localStorage.setItem("smoothing", smoothing);
      localStorage.setItem("healthy_shine", healthy_shine);
      localStorage.setItem("hydrate", hydrate);
      localStorage.setItem("volumizing", volumizing);

      let totalChartData1 = [
        {
          x: "short" + " " + parseInt(localStorage.getItem("short")),
          y: parseInt(localStorage.getItem("short")) || short
        },
        {
          x:
            "chin_length" + " " + parseInt(localStorage.getItem("chin_length")),
          y: parseInt(localStorage.getItem("chin_length")) || chin_length
        },
        {
          x:
            "shoulder_length" +
            " " +
            parseInt(localStorage.getItem("shoulder_length")),
          y:
            parseInt(localStorage.getItem("shoulder_length")) || shoulder_length
        },
        {
          x: "long" + " " + parseInt(localStorage.getItem("long")),
          y: parseInt(localStorage.getItem("long")) || long
        },
        {
          x: "straight" + " " + parseInt(localStorage.getItem("straight")),
          y: parseInt(localStorage.getItem("straight")) || straight
        },
        {
          x: "wavy" + " " + parseInt(localStorage.getItem("wavy")),
          y: parseInt(localStorage.getItem("wavy")) || wavy
        },
        {
          x: "curly" + " " + parseInt(localStorage.getItem("curly")),
          y: parseInt(localStorage.getItem("curly")) || curly
        },
        {
          x: "coily" + " " + parseInt(localStorage.getItem("coily")),
          y: parseInt(localStorage.getItem("coily")) || coily
        }
      ];

      let totalChartData2 = [
        {
          x: "blonde" + " " + parseInt(localStorage.getItem("blonde")),
          y: parseInt(localStorage.getItem("blonde")) || blonde
        },
        {
          x: "brown" + " " + parseInt(localStorage.getItem("brown")),
          y: parseInt(localStorage.getItem("brown")) || brown
        },
        {
          x: "black" + " " + parseInt(localStorage.getItem("black")),
          y: parseInt(localStorage.getItem("black")) || black
        },
        {
          x: "red" + " " + parseInt(localStorage.getItem("red")),
          count: parseInt(localStorage.getItem("red")) || red
        },
        {
          x: "silver" + " " + parseInt(localStorage.getItem("silver")),
          y: parseInt(localStorage.getItem("silver")) || silver
        },
        {
          x: "fine" + " " + parseInt(localStorage.getItem("fine")),
          y: parseInt(localStorage.getItem("fine")) || fine
        },
        {
          x: "medium" + " " + parseInt(localStorage.getItem("medium")),
          y: parseInt(localStorage.getItem("medium")) || medium
        },
        {
          x: "thick" + " " + parseInt(localStorage.getItem("thick")),
          y: parseInt(localStorage.getItem("thick")) || thick
        }
      ];

      let totalChartData3 = [
        {
          x:
            "color_treated" +
            " " +
            parseInt(localStorage.getItem("color_treated")),
          y: parseInt(localStorage.getItem("color_treated")) || color_treated
        },
        {
          x: "highlights" + " " + parseInt(localStorage.getItem("highlights")),
          y: parseInt(localStorage.getItem("highlights")) || highlights
        },
        {
          x: "chemically_straightened",
          y:
            parseInt(localStorage.getItem("chemically_straightened")) ||
            chemically_straightened
        },
        {
          x: "split_ends" + " " + parseInt(localStorage.getItem("split_ends")),
          y: parseInt(localStorage.getItem("split_ends")) || split_ends
        },
        {
          x: "frequent_heat_styling",
          y:
            parseInt(localStorage.getItem("frequent_heat_styling")) ||
            frequent_heat_styling
        },
        {
          x: "none" + " " + parseInt(localStorage.getItem("none")),
          y: parseInt(localStorage.getItem("none")) || none
        }
      ];

      let totalChartData4 = [
        {
          x:
            "color_protect" +
            " " +
            parseInt(localStorage.getItem("color_protect")),
          y: parseInt(localStorage.getItem("color_protect")) || color_protect
        },
        {
          x: "uv_protect" + " " + parseInt(localStorage.getItem("uv_protect")),
          y: parseInt(localStorage.getItem("uv_protect")) || uv_protect
        },
        {
          x:
            "damage_repair" +
            " " +
            parseInt(localStorage.getItem("damage_repair")),
          y: parseInt(localStorage.getItem("damage_repair")) || damage_repair
        },
        {
          x:
            "frizz_control" +
            " " +
            parseInt(localStorage.getItem("frizz_control")),
          y: parseInt(localStorage.getItem("frizz_control")) || frizz_control
        },
        {
          x: "smoothing" + " " + parseInt(localStorage.getItem("smoothing")),
          y: parseInt(localStorage.getItem("smoothing")) || smoothing
        },
        {
          x:
            "healthy_shine" +
            " " +
            parseInt(localStorage.getItem("healthy_shine")),
          y: parseInt(localStorage.getItem("healthy_shine")) || healthy_shine
        },
        {
          x: "hydrate" + " " + parseInt(localStorage.getItem("hydrate")),
          y: parseInt(localStorage.getItem("hydrate")) || hydrate
        },
        {
          x: "volumizing" + " " + parseInt(localStorage.getItem("volumizing")),
          y: parseInt(localStorage.getItem("volumizing")) || volumizing
        }
      ];
      this.setState({
        totalChartData1,
        totalChartData2,
        totalChartData3,
        totalChartData4,
        totalChartLoading: false
      });
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
    await this.fetchPageQuizData();
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
    await this.fetchPageQuizData();
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

  renderPageCharts = () => {
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
        <PopoverBar
          styles={styles}
          data={chartData.data}
          title={chartData.title}
        />
      );
    });
  };

  renderTotalCharts = () => {
    const styles = this.getStyles();

    const {
      totalChartData1,
      totalChartData2,
      totalChartData3,
      totalChartData4
    } = this.state;
    const chartData = [
      { data: totalChartData1, title: "LENGTH/TEXTURE TOTAL" },
      { data: totalChartData2, title: "COLOR/THICKNESS TOTAL" },
      { data: totalChartData3, title: "CONDITIONS TOTAL" },
      { data: totalChartData4, title: "GOALS TOTAL" }
    ];

    return chartData.map(chartData => {
      return (
        <PopoverPie
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

            {!this.state.loading ? this.renderPageCharts() : ""}
            {this.state.loading ? (
              ""
            ) : !this.state.totalChartLoading ? (
              this.renderTotalCharts()
            ) : (
              <span>
                LOADING ALL QUIZ DATA: <PulseLoader size={6} />
              </span>
            )}
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
