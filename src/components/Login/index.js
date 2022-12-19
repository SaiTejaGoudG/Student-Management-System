import React, {Component} from 'react'
import './index.css'
import {login} from './auth'

// We Use Class Components whenever the state is required
class Login extends Component {

  // Intialising State
  state = {
    email: '',
    password: '',
    showError: false,
  }

  // Updating State
  enterEmail = event => {
    this.setState({email: event.target.value})
  }

  enterPassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitDetails = async(event) => {
    // default action that belongs to the event will not occur
    event.preventDefault()
    const {email, password} = this.state
    
    if ( password === '' || email === '' ) {
      this.setState({ showError: true})
    } else {
     try{
      await login(this.state)
      window.open('/Home')
     }catch(err){
      this.setState({showError: true})
     }
      
    }
  }

  // render() method is the only required method in a class component. It returns the JSX element.
  // When the state object changes, the component re-renders.
  render() {
    const {email, password, showError} = this.state
    return (
      <div className="form">
        <form onSubmit={this.onSubmitDetails} className="form-container">
          <h1 className="heading">LOGIN FORM</h1>
          <div className="input-con">
            <label className="input-label" htmlFor="email">
              Email
            </label>
            <input
              className="user-input"
              // Controlled Input value (handled by a React State)
              value={email}
              type="email"
              onChange={this.enterEmail}
              id="email"
            />
          </div>

          <div className="input-con">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              className="user-input"
              value={password}
              onChange={this.enterPassword}
              type="password"
              id="password"
            />
            {/*Conditional Rendering Using Ternary Operators*/}
            {showError === true ? (
              <p className="errMsg">*Enter Valid Details</p>
            ) : null}
          </div>
          <div className="button-container">
            <button className="button" type="submit">
              Login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login

