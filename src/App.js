// Packages and Libraries
import React from "react";
import { Route } from "react-router-dom";
import Fade from "react-reveal/Fade";

// Components

import StylistPanelList from "./components/StylistPanelList";
import StylistPanelCustomer from "./components/StylistPanelCustomer";

// Assets
import bespokeImg from "./assets/bespoke-beta.svg";
import fekkaiLogo from "./assets/fekkai-logo.svg";
// Helper functions
import { getProfile } from "./services/apiService";
// Packages
import aws4 from "aws4";
import axios from "axios";
// Css
import "./styles/App.scss";
import authService from "./services/authService";

import "./styles/Lightbox.scss";

//AWS4 auth
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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      orders: null,
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
      shampooFormula: null,
      photoIndex: 0,
      isOpen: false
    };
  }

  async componentDidMount() {
    try {
      const fetchedUser = await getProfile();
      this.setState(state => {
        return {
          isSignedIn: authService.isAuthenticated(),
          user: fetchedUser
        };
      });
    } catch (e) {
      throw e;
    }
    this.fetchOrders();
  }

  fetchOrders = async () => {
    try {
      let response = await axios.get(
        "https://bespoke-backend-db.herokuapp.com/"
      );
      console.log(response);
      this.setState({
        orders: response.data.orders
      });
      console.log(this.state.orders);
    } catch (error) {
      console.error(error);
    }
  };

  fetchUserCode = async () => {
    try {
      await axios
        .get(
          `https://fekk.ai/backend/get_formula?user_code=${this.state.note_attributes}`
        )
        .then(res => {
          this.setState({
            csv: res.data,
            thickness: res.data.user_data.answers.hair_thickness,
            texture: res.data.user_data.answers.hair_texture,
            hairCondition: res.data.user_data.answers["hair-condition"],
            hairGoals: res.data.user_data.answers["hair-goals"],
            age: res.data.user_data.answers.age,
            diet: res.data.user_data.answers.diet,
            zip: res.data.user_data.answers.zipcode.zip,
            //zips are populating differently each time
            city: res.data.user_data.weather.city,
            wash: res.data.user_data.answers.wash_frequency,
            afterwash: res.data.user_data.answers.afterwash,
            hairGoals2: res.data.user_data.answers["hair-goals-2"],
            sideSelfie: res.data.user_data["side_selfie"],
            frontSelfie: res.data.user_data["front_selfie"],
            shampooFormula: res.data.ingredients.shampoo.formula,
            conditionerFormula: res.data.ingredients.conditioner.formula
          });
        });
    } catch (error) {
      console.error(error);
    }
  };

  renderOrders = () => {
    return (
      <div>
        <ul
          style={{
            listStyle: "none",
            textAlign: "left",
            overflow: "scroll",
            height: `${400}px`,
            paddingLeft: "0",
            paddingRight: `${10}px`,
            marginBottom: 0
          }}
        >
          {!this.state.orders
            ? ""
            : this.state.orders.map(element => (
                <div
                  className="order"
                  onClick={async () => {
                    return (
                      await this.setState({
                        name: element.shipping_address.name,
                        address:
                          element.shipping_address.address1 +
                          (element.shipping_address.address2
                            ? " " + element.shipping_address.address2
                            : "") +
                          " " +
                          element.shipping_address.city +
                          " " +
                          element.shipping_address.province_code +
                          " " +
                          element.shipping_address.zip,
                        zip: element.shipping_address.zip,
                        email: element.email,
                        phone: element.phone,
                        orderNumber: element.order_number,
                        createdAt: element.created_at,
                        browserIp: element.browser_ip,
                        gateway: element.gateway,
                        note_attributes:
                          undefined || !element.note_attributes[0] || null
                            ? ""
                            : element.note_attributes[0].value,
                        isLoading: true
                      }),
                      await this.fetchUserCode()
                    );
                    // await this.setState({
                    //   isLoading: false
                    // });
                  }}
                >
                  <li key={element.id}>
                    <b>Order ID:</b> {element.id}
                  </li>
                  <li key={element.shipping_address.name}>
                    <b>Name:</b> {element.shipping_address.name}
                  </li>

                  <br />
                </div>
              ))}
        </ul>
      </div>
    );
  };

  render() {
    const {
      // isSignedIn,
      // isSignedUp,
      user,
      thickness,
      texture,
      hairCondition,
      hairGoals,
      age,
      name,
      diet,
      orderNumber,
      createdAt,
      city,
      wash,
      afterwash,
      hairGoals2,
      sideSelfie,
      frontSelfie,

      isLoading
    } = this.state;
    return (
      <div className="app">
        <div id="header">
          <Fade big>
            <header className="img-container">
              <img id="fekkai-logo" alt="fekkai-logo" src={fekkaiLogo} />
              <img id="bespoke-logo" alt="bespoke-logo" src={bespokeImg} />
            </header>
          </Fade>
        </div>

        <main id="main-page">
          <Route exact path="/" component={StylistPanelList} />
          <Route
            path="/stylist-panel-list"
            user={user}
            component={StylistPanelList}
            createdAt={createdAt}
            orderNumber={orderNumber}
            name={name}
          />
          <Route
            thickness={
              thickness
                ? thickness === 1
                  ? "finest"
                  : "" || thickness === 2
                  ? "finer"
                  : "" || thickness === 3
                  ? "fine"
                  : "" || thickness === 4
                  ? "medium"
                  : "" || thickness === 5
                  ? "thick"
                  : "" || thickness === 6
                  ? "thicker"
                  : "" || thickness === 7
                  ? "thickest"
                  : ""
                : ""
            }
            texture={
              texture
                ? texture === 1
                  ? "straight"
                  : "" || texture === 2
                  ? "wavy"
                  : "" || texture === 3
                  ? "curly"
                  : "" || texture === 4
                  ? "coily"
                  : ""
                : ""
            }
            hairCondition={hairCondition}
            hairGoals={hairGoals}
            age={age}
            diet={diet}
            zip={!this.state.zip ? "" : this.state.zip}
            orderNumber={orderNumber}
            city={city}
            wash={wash}
            afterwash={afterwash}
            hairGoals2={hairGoals2}
            sideSelfie={sideSelfie}
            frontSelfie={frontSelfie}
            isLoading={isLoading}
            path="/stylist-panel-customer"
            user={user}
            component={StylistPanelCustomer}
          />
        </main>
        <footer></footer>
      </div>
    );
  }
}
export default App;
