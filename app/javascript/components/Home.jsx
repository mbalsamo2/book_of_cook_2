import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/book_of_cook.jpg';
import NavigationBar from "./NavigationBar";
import Login from "./Login";
import Signup from "./Signup";
import axios from 'axios'

const Home = (props) => {

  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
     .then(response => {
       props.handleLogout()
       props.history.push('/')
     })
     .catch(error => console.log(error))
  }

  return (
    <div>

      <img
        style={{display: "block", margin: "0 auto", marginTop: "5%"}}
        src={logo}
        alt={'The Book of Cook'}
      />

      <h2 style={{textAlign: "center", padding: "1%"}}>
        The virtual cookbook and recipe organizer.
      </h2>

      <Login {...props}
        handleLogin={props.handleLogin}
        loggedInStatus={props.isLoggedIn}
        user={props.user}
      />

    </div>
  );
};

export default Home;
