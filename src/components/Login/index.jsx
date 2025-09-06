import { Component } from "react"
import Cookies from "js-cookie"
import { Redirect } from "react-router-dom"
import "./index.css"

class Login extends Component {
  state = {
    username: "",
    password: "",
    errorMsg: "",
    showError: false,
  }

  handleLogin = async () => {
    try {
      const { username, password } = this.state
      const payload = { username, password }
      const api = "https://apis.ccbp.in/login"
      const options = {
        method: "POST",
        body: JSON.stringify(payload),
      }

      const response = await fetch(api, options)
      if (response.ok) {
        const data = await response.json()
        const jwtToken = data.jwt_token
        Cookies.set("jwt_token", jwtToken, { expires: 30 })
        const { history } = this.props
        history.replace("/")
        this.setState({ username: "", password: "", showError: false })
      } else {
        const data = await response.json()
        const errorMsg = data.error_msg
        this.setState({
          showError: true,
          errorMsg,
        })
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  handleFormSubmit = (event) => {
    event.preventDefault()
    this.handleLogin()
  }

  handleUsername = (event) => {
    this.setState({
      username: event.target.value,
    })
  }

  handlePassword = (event) => {
    this.setState({
      password: event.target.value,
    })
  }

  render() {
    const { username, password, showError, errorMsg } = this.state
    const token = Cookies.get("jwt_token")
    if (token) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-cnt">
        <form className="login-form" onSubmit={this.handleFormSubmit}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <div className="input-cnt">
            <label htmlFor="username">USERNAME</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              id="username"
              onChange={this.handleUsername}
            />
          </div>
          <div className="input-cnt">
            <label htmlFor="password">PASSWORD</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              id="password"
              onChange={this.handlePassword}
            />
          </div>
          <button className="login-btn" type="submit">
            Login
          </button>
          {showError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
