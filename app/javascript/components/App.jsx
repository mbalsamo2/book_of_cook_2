import React, { useState, useEffect } from "react";
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import PublicRecipes from "../components/PublicRecipes";
import Login from "../components/Login";
import Signup from "../components/Signup";
import User from "../components/User";
import EditRecipe from "../components/EditRecipe";
import CopyRecipe from "../components/CopyRecipe";

export default function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  document.body.style.backgroundColor = "#F8F8F8";

  useEffect( () => {
    loginStatus();
  }, [])

  const loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        handleLogin(response)
      } else {
        handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user)
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
  }

  return (
    <div className="container">
      <BrowserRouter>
        <Switch>
          <Route
            exact path='/'
            render={props => (
              <Home {...props}
                handleLogout={handleLogout}
                handleLogin={handleLogin}
                loggedInStatus={isLoggedIn}
                user={user}
              />
            )}
          />
          <Route
            exact path='/login'
            render={props => (
              <Login {...props}
                handleLogin={handleLogin}
                loggedInStatus={isLoggedIn}
                user={user}
              />
            )}
          />
          <Route
            exact path='/signup'
            render={props => (
              <Signup {...props}
                handleLogin={handleLogin}
                loggedInStatus={isLoggedIn}
                user={user}
              />
            )}
          />
          <Route
            path="/recipes" exact
            render={props => (
              <Recipes {...props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={isLoggedIn}
                user={user}
              />
            )}
          />
          <Route
            path="/recipe/:id" exact
            render={props => (
              <Recipe {...props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={isLoggedIn}
                user={user}
              />
            )}
          />
          <Route
            path="/recipe" exact
            render={props => (
              <NewRecipe {...props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={isLoggedIn}
                user={user}
              />
            )}
          />
          <Route
            exact path="/users/:id"
            render={props => (
              <User {...props}
                handleLogout={handleLogout}
                handleLogout={handleLogout}
                loggedInStatus={isLoggedIn}
                user={user}
              />
            )}
          />
          <Route
            path="/public_recipes" exact
            render={props => (
              <PublicRecipes {...props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={isLoggedIn}
                user={user}
              />
            )}
          />
          <Route
            path="/recipe/:id/edit" exact
            render={props => (
              <EditRecipe {...props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={isLoggedIn}
                user={user}
              />
            )}
          />
          <Route
            path="/recipes/copy" exact
            render={props => (
              <CopyRecipe {...props}
                handleLogin={handleLogin}
                handleLogout={handleLogout}
                loggedInStatus={isLoggedIn}
                user={user}
              />
            )}
          />

        </Switch>
      </BrowserRouter>
    </div>
  );
}
