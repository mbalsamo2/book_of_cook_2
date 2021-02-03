import React, { useState } from "react";
import { MDBContainer, MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBRow, MDBNavbarToggler, MDBCollapse } from 'mdbreact';
import '../../assets/stylesheets/application.css'
import logo from '../../assets/images/book_of_cook.jpg';
import Recipes from "../components/Recipes";
import PublicRecipes from "../components/PublicRecipes";
import { Link } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios'

export default function NavigationBar(props) {
  const [isOpen, setIsOpen] = useState(false)

  const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
     .then(response => {
       props.handleLogout()
       window.location.replace('/')
     })
     .catch(error => console.log(error));
  }

  const toggleCollapse = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div>
      <MDBContainer className="fluid">
        <MDBRow>
          <MDBNavbar
            style={{"backgroundColor":"#959595"}}
            dark
            expand="md"
            scrolling
            fixed="top"
            className="py-1">
            <MDBNavbarBrand href="/recipes">
              <img
                className="z-depth-1"
                style={{"height":"4rem"}}
                src={logo}
                alt={'The Book of Cook'}
              />
            </MDBNavbarBrand>

            <MDBNavbarToggler onClick={toggleCollapse} />
            <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
              <MDBNavbarNav left>
                { props.loggedInStatus &&
                  (Object.keys(props.user).length !== 0) &&
                  <MDBNavItem>
                    <strong id="nav_links">Hello, Chef {props.user.username}!</strong>
                  </MDBNavItem>
                }

                { !props.loggedInStatus &&
                  (Object.keys(props.user).length === 0) &&
                  <MDBNavItem>
                    <strong id="nav_links">Hello, future chef!</strong>
                  </MDBNavItem>
                }
              </MDBNavbarNav>

              <MDBNavbarNav right>
                { (Object.keys(props.user).length !== 0) &&
                  <MDBNavItem>
                    <Link
                      to="/recipes"
                      className="px-2 mx-2 my-3"
                      id="nav_links"
                    >
                      Your Cookbook
                    </Link>
                  </MDBNavItem>
                }

                <MDBNavItem>
                  <Link
                    to="/public_recipes"
                    className="px-2 mx-2 my-3"
                    id="nav_links"
                  >
                    Public Cookbook
                  </Link>
                </MDBNavItem>

                {
                  props.loggedInStatus &&
                  (Object.keys(props.user).length !== 0) &&
                  <MDBNavItem>
                    <Link
                      to="/logout"
                      onClick={handleClick}
                      className="px-2 mx-2 my-3"
                      id="nav_links"
                    >
                      Log Out!
                    </Link>
                  </MDBNavItem>
                }

                { !props.loggedInStatus &&
                  (Object.keys(props.user).length === 0) &&
                  <MDBNavItem>
                    <Link
                      to="/login"
                      className="px-2 mx-2 my-3"
                      id="nav_links"
                    >
                      Login
                    </Link>
                  </MDBNavItem>
                }
              </MDBNavbarNav>
            </MDBCollapse>

          </MDBNavbar>
        </MDBRow>
      </MDBContainer>
    </div>
  )
};
