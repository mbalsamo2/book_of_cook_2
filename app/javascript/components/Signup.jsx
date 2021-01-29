import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../assets/stylesheets/application.css'
import axios from 'axios'
import logo from '../../assets/images/book_of_cook.jpg';
import {Link} from 'react-router-dom'

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
    axios.post('http://localhost:3001/api/v1/users/users/create', {user}, {withCredentials: true})
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
      <div>

        <MDBContainer className="fluid">
          <MDBRow className="justify-content-md-center mt-3">
            <img
              className="img-fluid z-depth-1"
              src={logo}
              alt={'The Book of Cook'}
            />
          </MDBRow>

          <MDBRow className="justify-content-md-center mt-2 mb-5">
            <div id="slogan" className="col">
              <h2>
                The virtual cookbook and recipe organizer.
              </h2>
            </div>
          </MDBRow>

          <MDBRow className="justify-content-md-center">
            <div className="card" style={{width: "50%", display: "block", margin: "0 auto"}}>

              <h5 id="book_blue" className="card-header text-center py-4">
                Sign Up
              </h5>

              <div className="card-body px-lg-5 pt-0">
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
                    className="btn btn-rounded btn-block my-4 waves-effect z-depth-0"
                    placeholder="submit"
                    id="book_blue"
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
