import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios'
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";

export default function App(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({})

  useEffect( () => {
    loginStatus();
  }, [])

  const handleLogin = (data) => {
    setIsLoggedIn(true);
    setUser(data.user);
  }

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser({});
  }

  const loginStatus = () => {
    axios.get('http://localhost:3001/logged_in',
    {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        handleLogin(response)
      } else {
        handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/recipes" exact component={Recipes} />
          <Route path="/recipe/:id" exact component={Recipe} />
          <Route path="/recipe" exact component={NewRecipe} />
          <Route path='/login' exact component={Login}/>
          <Route path='/signup' exact component={SignUp}/>
        </Switch>
      </Router>
    </div>
  );

}
