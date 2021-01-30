import React from "react";
import { Link } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import '../../assets/stylesheets/application.css'
import logo from '../../assets/images/book_of_cook.jpg';

const Logo = (props) => {

  return (
    <div>
      <MDBRow className="justify-content-md-center mt-3">
        <img
          className="img-fluid z-depth-1"
          src={logo}
          alt={'The Book of Cook'}
        />
      </MDBRow>

      <MDBRow className="justify-content-md-center mt-1 mb-5">
        <div id="slogan" className="col">
          <h2>
            The virtual cookbook and recipe organizer.
          </h2>
        </div>
      </MDBRow>
    </div>
  )
}

export default Logo;
