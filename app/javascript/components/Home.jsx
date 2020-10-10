import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo_2.png';
import NavigationBar from "./NavigationBar";
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
    <div className="primary-color align-items-center">
      <div className="container secondary-color">
        <img
          src={logo}
          alt={'The Book of Cook'}
        />
        <p className="lead">
          The virtual cookbook and recipe organizer.
        </p>
        <hr className="my-4" />
        <Link
          to="/recipes"
          className="btn btn-lg custom-button"
          role="button">
          View Recipes
        </Link>
        <Link
          to='/login'
          className="btn btn-lg custom-button"
          role="button">
          LOG IN!!
        </Link>
        <Link
          to='/signup'
          className="btn btn-lg custom-button"
          role="button">
          SIGN UP!
        </Link>
        <br></br>
        {
          props.loggedInStatus ?
          <Link to='/logout' onClick={handleClick}>Log Out</Link> :
          null
        }
      </div>
    </div>
  );
};

export default Home;
