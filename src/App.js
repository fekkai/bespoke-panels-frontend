// Packages and Libraries
import React from "react";
import { Route, Link } from "react-router-dom";
import Fade from "react-reveal/Fade";

// Components
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import StylistPanelList from "./components/StylistPanelList";
import StylistPanelCustomer from "./components/StylistPanelCustomer";
import ProtectedRoute from "./components/ProtectedRoute";

// Assets
import bespokeImg from "./assets/bespoke-beta.svg";
import fekkaiLogo from "./assets/fekkai-logo.svg";
// Helper functions
import { login, getProfile, signUp } from "./services/apiService";
// Packages
import aws4 from "aws4";
import axios from "axios";
// Css
import "./styles/App.scss";
import authService from "./services/authService";
import { css } from "@emotion/core";

import Lightbox from "react-image-lightbox";
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
      isSignedIn: false,
      isSignedUp: false,
      user: {},

      orders: null,
      // selectedOrder: "",
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
      let response = await axios(signedRequest);
      // let response = await axios.get(https://bespoke-backend-db.herokuapp.com/)
      // console.log(response);
      this.setState({
        orders: response.data.orders
      });
      // console.log(this.state.orders);
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

  loginUser = async credentials => {
    try {
      const user = await login(credentials);
      this.setState(state => {
        return {
          isSignedIn: true,
          user: user
        };
      });
    } catch (e) {
      throw e;
    }
  };

  signOutUser = () => {
    authService.signOut();
    this.setState(state => {
      return {
        isSignedIn: false,
        user: {}
      };
    });
  };

  signUpUser = async credentials => {
    try {
      const user = await signUp(credentials);
      this.setState({
        isSignedIn: true,
        isSignedUp: true,
        user: user
      });
    } catch (error) {
      throw error;
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
      isSignedIn,
      isSignedUp,
      orders,
      user,
      thickness,
      texture,
      hairCondition,
      hairGoals,
      age,
      name,
      diet,
      zip,
      orderNumber,
      createdAt,
      city,
      wash,
      afterwash,
      hairGoals2,
      sideSelfie,
      frontSelfie,
      shampooFormula,
      conditionerFormula,
      isLoading,
      photoIndex,
      isOpen
    } = this.state;
    // const images = [frontSelfie, sideSelfie];
    return (
      <div className="app">
        {/* {isOpen && (
                  <Lightbox
                    mainSrc={images[photoIndex]}
                    nextSrc={images[(photoIndex + 1) % images.length]}
                    prevSrc={
                      images[(photoIndex + images.length - 1) % images.length]
                    }
                    onCloseRequest={() => this.setState({ isOpen: false })}
                    onMovePrevRequest={() =>
                      this.setState({
                        photoIndex:
                          (photoIndex + images.length - 1) % images.length
                      })
                    }
                    onMoveNextRequest={() =>
                      this.setState({
                        photoIndex: (photoIndex + 1) % images.length
                      })
                    }
                  />
                )} */}
        <div id="header">
          <Fade big>
            <header className="img-container">
              <img id="fekkai-logo" alt="fekkai-logo" src={fekkaiLogo} />
              <p
                id="bespoke-"
                style={{ marginLeft: "auto" }}
              >{this.state.isSignedIn ? `${this.state.user.name}_${this.state.user.role}` : ''}</p>
              <img alt="bespoke-logo" src={bespokeImg} />

              {/* <button type="button" onClick={() => this.setState({ isOpen: true })}>
          Open Lightbox
        </button> */}
            </header>
          </Fade>
          {this.state.isSignedIn === true ? (
            <div id="logout-approve-btn">
              <div style={{display: 'inlineBlock'}}>
              {/* <Link to="/stylist-panel-customer">
                <button className="btn">ORDERS</button>
              </Link> */}
                <button className="btn" onClick={this.signOutUser}>
                  LOGOUT
                </button>
              </div>
            </div>
          ) : null}
        </div>
        {isSignedIn && <div className="nav-links-signed-in"></div>}
        {!isSignedIn ? (
          <Fade big>
            <div className="signup-login">
              <Link to="/signup">
                <button>SIGN UP</button>
              </Link>

              <Link to="/login">
                <button>LOGIN</button>
              </Link>
            </div>
          </Fade>
        ) : (
          ""
        )}
        {this.state.isSignedIn === true ? null : (
          <Fade big>
            <p id="welcome">WELCOME TO BESPOKE ADMIN LOGIN</p>
          </Fade>
        )}
        <main id="main-page">
          <Route exact path="/" component={Home} />

          <ProtectedRoute
            path="/stylist-panel-list"
            user={user}
            component={StylistPanelList}
            createdAt={createdAt}
            orderNumber={orderNumber}
            name={name}
          />

          <ProtectedRoute
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
            orders={orders}
            component={StylistPanelCustomer}
          />
          <Fade big>
            <Route
              path="/login"
              render={props => (
                <Login
                  {...props}
                  handleLogin={this.loginUser}
                  isSignedIn={isSignedIn}
                />
              )}
            />
          </Fade>
          <Route
            path="/signup"
            render={props => (
              <SignUp
                {...props}
                signUp={this.signUpUser}
                isSignedUp={isSignedUp}
                isSignedIn={isSignedIn}
              />
            )}
          />
        </main>
        <footer></footer>
      </div>
    );
  }
}
export default App;
