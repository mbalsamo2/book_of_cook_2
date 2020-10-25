import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import PublicRecipes from "../components/PublicRecipes";
import Login from "../components/Login";
import Logout from "../components/Logout";
import Signup from "../components/Signup";
import User from "../components/User";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: {}
     };
  }

  componentDidMount() {
      this.loginStatus()
    }

  loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              exact path='/'
              render={props => (
                <Home {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact path='/login'
              render={props => (
                <Login {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact path='/signup'
              render={props => (
                <Signup {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              path="/recipes" exact
              render={props => (
                <Recipes {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              path="/recipe/:id" exact
              render={props => (
                <Recipe {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              path="/recipe" exact
              render={props => (
                <NewRecipe {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              exact path="/users/:id"
              render={props => (
                <User {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              path="/public_recipes" exact
              render={props => (
                <PublicRecipes {...props}
                  handleLogin={this.handleLogin}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
            <Route
              path="/logout" exact
              render={props => (
                <Logout {...props}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.isLoggedIn}
                  user={this.state.user}
                />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
