import React, { Component } from 'react';
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

    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
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
      <div className="card" style={{width: "50%", display: "block", margin: "0 auto"}}>

        <h5 className="card-header info-color white-text text-center py-4">
          Log In
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

            <button
              className="btn btn-info btn-rounded btn-block my-4 waves-effect z-depth-0"
              placeholder="submit"
              type="submit"
              role="button">
              Log In
            </button>

            <Link
              to='/signup'
              className="btn btn-info btn-rounded btn-block my-4 waves-effect z-depth-0"
              role="button">
              Create an Account
            </Link>

          </form>

        </div>

        <div>
          { this.state.errors ? this.handleErrors() : null }
        </div>

      </div>
    );
  }
}

export default Login;
