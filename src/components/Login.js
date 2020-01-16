import React from 'react'
import LoginForm from './LoginForm'

const Login = props => {
  console.log(props.handleLogin)

  return (
    <div>
      <LoginForm {...props} />
    </div>
  )
}


export default Login
