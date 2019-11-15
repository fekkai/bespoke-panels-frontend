// Packages and Libraries
import React from "react";
import { Route, Link } from "react-router-dom";
// Components
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import StylistPanel from "./components/StylistPanel";
import ChemistPanel from "./components/ChemistPanel";
import PackerPanel from "./components/PackerPanel";

// Assets
import FekkaiLogo from "./assets/fekkai-logo.svg";
import Bespoke from "./assets/bespoke-beta.svg";

import ProtectedRoute from "./components/ProtectedRoute";
// Helper functions
import { login, getProfile, signUp } from "./services/apiService";
// Css
import "./styles/App.scss";
import authService from "./services/authService";
import dummyData from "../src/services/dummydata";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSignedIn: false,
      isSignedUp: false,
      user: {}
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
  }

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

  render() {
    // console.log(dummyData);
    const { isSignedIn, isSignedUp, user } = this.state;
    return (
      <div className="App">
        <div className="img-container">
          <img alt="fekkai-logo" src={FekkaiLogo} />
          <img alt="bespoke-logo" src={Bespoke} />
        </div>
        <nav>
          {/* <div className="nav-links">
            <Link to="/">Home</Link>
          </div> */}
          {isSignedIn && (
            <div className="nav-links-signed-in">
              {/* <Link to="/dashboard">Dashboard</Link> */}
              <div>
                <Link to="/stylist-panel">Stylist Panel</Link>
              </div>
              <div>
                <Link to="/chemist-panel">Chemist Panel</Link>
              </div>
              <div>
                <Link to="/packer-panel">Packer Panel</Link>
              </div>
            </div>
          )}
          {!isSignedIn ? (
            <div style={{display: 'flex', flexDirection: 'row'}}>
              <div className="nav-links">
                <Link to="/signup">Sign Up</Link>
              </div>
              <div className="nav-links">
                <Link to="/login">Login</Link>
              </div>
            </div>
          ) : (
            <div className="nav-links">
              <a onClick={this.signOutUser}>Sign Out</a>
            </div>
          )}
        </nav>

        <main>
          <Route exact path="/" component={Home} />
          {/* <ProtectedRoute path="/dashboard" user={user} component={Dashboard} /> */}
          <ProtectedRoute
            path="/stylist-panel"
            user={user}
            component={StylistPanel}
          />
          <ProtectedRoute
            path="/chemist-panel"
            user={user}
            component={ChemistPanel}
          />
          <ProtectedRoute
            path="/packer-panel"
            user={user}
            component={PackerPanel}
          />

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
      </div>
    );
  }
}
export default App;
