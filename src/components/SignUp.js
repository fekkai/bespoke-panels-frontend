import React from 'react'
import { Redirect } from 'react-router-dom'

export default class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      showError: false
    }
  }

  handleTextInput = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  handleSubmitForm = async event => {
    event.preventDefault()
    // console.log(' register user')
    const { name, email, password } = this.state
    const { signUp } = this.props
    try {
      await signUp({ name, email, password })
    } catch (error) {
      this.setState({
        showError: true
      })
      throw error
    }
  }

  render() {
    const { isSignedUp } = this.props
    const { showError } = this.state

    let errorMessage

    if (showError) {
      errorMessage = (
        <div className="errorMessage">
          <span>An error occurred, please try again.</span>
        </div>
      )
    }

    if (isSignedUp) {
      return <Redirect to="/stylist-panel-list" />
    }
    return (
      <div>
        {errorMessage}
        <form className="form" >
        <h1>Sign Up</h1>

          <div>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={this.handleTextInput}
              value={this.state.name}
            />
          </div>
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
          <button 
          onClick={this.handleSubmitForm}
          >SIGN UP</button>
        </form>
      </div>
    )
  }
}



