import React from "react";
import { Link } from "react-router-dom";
import logo from './../../../public/the-book-of-cook.png';

export default () => (
  <div className="vw-100 vh-100 primary-color d-flex align-items-center justify-content-center">
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <img
          src={require(`./${logo}`)}
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
      </div>
    </div>
  </div>
);
