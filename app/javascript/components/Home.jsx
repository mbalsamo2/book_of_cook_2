import React from "react";
import { Link } from "react-router-dom";
import logo from '../../assets/images/logo.png';
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import Profile from "./Profile";
import NavigationBar from "./NavigationBar";

export default () => (
  <div className="primary-color align-items-center">
    <div className="container secondary-color">
    <div>
      <NavigationBar />
    </div>
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
        role="button"
      >
        View Recipes
      </Link>
      <LoginButton />
      <LogoutButton />
    </div>
  </div>
);
