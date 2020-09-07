import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
      <div>
        <Profile />
      </div>
        <img
          src={logo}
          alt={'The Book of Cook'}
        />
        <hr className="my-4" />
        <Link
          to="/recipes"
          className="btn btn-lg custom-button"
          role="button"
        >
          View Recipes
        </Link>
        <LogoutButton />
      </div>
    </div>
  </div>
);
