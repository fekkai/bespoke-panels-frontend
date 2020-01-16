import React from "react";
import { Redirect } from "react-router-dom";
// Redirect renders a component that renders a component

import '../styles/LoginForm.scss'

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      showError: false
    };
  }

  handleSubmitForm = async event => {
    event.preventDefault();
    // console.log("submit form");
    const { email, password } = this.state;
    const { handleLogin } = this.props;

    try {
      await handleLogin({ email, password });
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
      return <Redirect to="/stylist-panel-list" />;
    }

    return (
      <div>
        {errorMessage}
        <form className="form" onSubmit={this.handleSubmitForm}>
          <h1>Login</h1>
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
              name="password"
              onChange={this.handleTextInput}
              value={this.state.password}
            />
          </div>
          <button>LOGIN</button>
        </form>
      </div>
    );
  }
}


