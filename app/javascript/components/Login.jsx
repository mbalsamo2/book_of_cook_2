import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBInput } from 'mdbreact';
import '../../assets/stylesheets/application.css'
import axios from 'axios'
import {Link} from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
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
    const {username, email, password} = this.state

    let user = {
      username: username,
      email: email,
      password: password
    }
    axios.post( `${window.location.origin}/login`, {user}, {withCredentials: true})
      .then(response => {
        if (response.data.logged_in) {
          this.props.handleLogin(response.data)
          this.redirect(response)
        } else {
          this.setState({
            errors: response.data.errors
          })
        }
      })
      .catch(error => console.log('api errors:', error))
  };

  redirect = (response) => {
    let id = response.data.user.id
    this.props.history.push(`/recipes`)
  }

  handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  }

  render() {
    const {username, email, password} = this.state
    return (
      <MDBCard className="justify-content-center px-0">

        <h5 id="book_blue" className="card-header text-center py-4">
          Log In
        </h5>

        <MDBCardBody>
          <form
            onSubmit={this.handleSubmit}
            className="text-center"
          >

            <div className="md-form mx-auto py-1 form-group" style={{width: "70%"}}>
              <input
                id="login_input"
                placeholder="email or username"
                type="text"
                name="username"
                className="form-control"
                value={username}
                onChange={this.handleChange}
              />
            </div>


            <div className="md-form mx-auto pt-1 form-group" style={{width: "70%"}}>
              <input
                id="login_input"
                placeholder="password"
                className="form-control"
                type="password"
                name="password"
                value={password}
                onChange={this.handleChange}
              />
            </div>

            <button
              className="btn btn-rounded btn-block mt-4"
              placeholder="submit"
              id="homepage_buttons"
              type="submit"
              role="button">
              Log In
            </button>

            <Link
              to='/signup'
              id="homepage_buttons"
              className="btn btn-rounded btn-block my-4"
              role="button">
              Create an Account
            </Link>

          </form>
        </MDBCardBody>

        <div>
          { this.state.errors ? this.handleErrors() : null }
        </div>

      </MDBCard>
    );
  }
}

export default Login;
