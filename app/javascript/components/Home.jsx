import React from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../assets/stylesheets/application.css'
import logo from '../../assets/images/book_of_cook.jpg';
import NavigationBar from "./NavigationBar";
import Login from "./Login";
import Signup from "./Signup";
import Logo from "./Logo";
import axios from 'axios'

const Home = (props) => {

  const handleClick = () => {
    axios.delete(`${window.location.origin}/logout`, {withCredentials: true})
     .then(response => {
       props.handleLogout()
       props.history.push('/')
     })
     .catch(error => console.log(error))
  }

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
