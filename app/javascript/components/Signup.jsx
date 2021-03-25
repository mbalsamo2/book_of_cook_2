import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../assets/stylesheets/application.css'
import axios from 'axios'
import logo from '../../assets/images/book_of_cook.jpg';
import {Link} from 'react-router-dom'
import Logo from "./Logo";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
     };
  }

  handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password, password_confirmation} = this.state
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }
    // http://localhost:3001/api/v1/users/users/create
    axios.post('https://fast-shore-58175.herokuapp.com/api/v1/users/users/create', {user}, {withCredentials: true})
      .then(response => {
        if (response.data.status === 'created') {
          this.props.handleLogin(response.data)
          this.redirect()
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))
  };

  redirect = () => {
    this.props.history.push('/recipes')
  }

  handleErrors = () => {
      return (
        <div>
          <ul>{this.state.errors.map((error) => {
            return <li key={error}>{error}</li>
          })}</ul>
        </div>
      )
    }

  render() {
    const {username, email, password, password_confirmation} = this.state
    return (
      <div className="justify-content-md-center mb-3 pb-3">

        <MDBContainer className="fluid mb-3 pb-3">

          <Logo />

          <MDBRow className="justify-content-center">
            <Link
              to='/public_recipes'
              style={{width: "70%"}}
              id="book_blue"
              className="btn btn-rounded btn-block mb-4 mx-5 justify-content-center"
              role="button">
              Check out the Public Cookbook!
            </Link>
          </MDBRow>

          <MDBRow id="login_form" className="justify-content-md-center mx-4 px-4">
            <div className="card">

              <h5 id="book_blue" className="card-header text-center py-4">
                Sign Up
              </h5>

              <div className="card-body pt-0">
                <form
                  onSubmit={this.handleSubmit}
                  className="text-center"
                  style={{color: "#757575"}}>

                  <div className="md-form">
                    <input
                      style={{width: "70%"}}
                      placeholder="username"
                      type="text"
                      name="username"
                      value={username}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="md-form">
                    <input
                      style={{width: "70%"}}
                      placeholder="email"
                      type="text"
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="md-form">
                    <input
                      style={{width: "70%"}}
                      placeholder="password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>

                  <div className="md-form">
                    <input
                      style={{width: "70%"}}
                      placeholder="password confirmation"
                      type="password"
                      name="password_confirmation"
                      value={password_confirmation}
                      onChange={this.handleChange}
                    />
                  </div>

                  <button
                    className="btn btn-rounded btn-block my-4"
                    placeholder="submit"
                    id="homepage_buttons"
                    type="submit"
                    role="button">
                    Sign Up
                  </button>

                </form>

                <h5 style={{textAlign: "center"}}>
                  Already a member? &nbsp;
                  <Link to='/'>Log in!</Link>
                </h5>

              </div>

            </div>

            <div>
              { this.state.errors ? this.handleErrors() : null }
            </div>
          </MDBRow>
        </MDBContainer>
      </div>
    );
  }
}

export default Signup;
