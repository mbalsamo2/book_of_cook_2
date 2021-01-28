import React from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../assets/stylesheets/application.css'
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
      <MDBContainer>
        <MDBRow className="justify-content-md-center mt-3">
          <img
            className="text-center"
            src={logo}
            alt={'The Book of Cook'}
          />
        </MDBRow>

        <MDBRow className="justify-content-md-center mt-2 mb-5">
          <h2>
            The virtual cookbook and recipe organizer.
          </h2>
        </MDBRow>

        <MDBRow className="justify-content-md-center">
          <Login {...props}
            handleLogin={props.handleLogin}
            loggedInStatus={props.isLoggedIn}
            user={props.user}
          />
        </MDBRow>

      </MDBContainer>
    </div>
  );
};

export default Home;
