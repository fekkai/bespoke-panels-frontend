import React from "react";
import { Redirect } from "react-router-dom";
// Redirect renders a component that renders a component
import "../styles/LoginForm.scss";

import QRCode from "qrcode.react";


export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //changed role from email below
      email: '',
      role: "stylist",
      password: "",
      showError: false
    };
  }

  componentDidMount(){
    this.refs.input.focus();
  }

  handleSubmitForm = async event => {
    event.preventDefault();
    // console.log("submit form");
    //changed role from email below
    const { email, 
    // role, 
    password } = this.state;
    const { handleLogin } = this.props;

    try {
      // changed role from email below
      await handleLogin({ email, 
      // role, 
      password });
    } catch (error) {
      this.setState({
        showError: true
      });
      throw error;
    }
  };

  handleTextInput = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    const { isSignedIn } = this.props;
    const { showError } = this.state;

    

    let errorMessage;

    if (showError) {
      errorMessage = (
        <div className="errorMessage">
          <span>An error occurred, please try again.</span>
        </div>
      );
    }

    if (isSignedIn) {
      // console.log(isSignedIn);
      return <Redirect to="/stylist-panel-customer" />;
    }

    return (
      <div>
        {errorMessage}
        <form className="form" onSubmit={this.handleSubmitForm}>
          <h1>Login</h1>
          {/* <div style={{ display: "none" }}> */}
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={this.handleTextInput}
              value={this.state.email}
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              ref="input"
              name="password"
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>
          <button>LOGIN</button>
        </form>
        {/* <QRCode
id="Fekkai1!"
value='Clean1!'
size={290}
level={"H"}
includeMargin={true}
/> */}
      </div>
    );
  }
}
