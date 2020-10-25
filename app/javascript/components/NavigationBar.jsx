import React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import logo from '../../assets/images/logo_2.png';
import Recipes from "../components/Recipes";
import PublicRecipes from "../components/PublicRecipes";
import { Link } from "react-router-dom";

export default function NavigationBar(props) {
  return (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="/">
          <img
            style={{"height":"4rem"}}
            src={logo}
            alt={'The Book of Cook'}
          />
        </Navbar.Brand>
        { (Object.keys(props.user).length !== 0) &&
          <Nav className="mr-auto">
            Hello, {props.user.username}!
          </Nav>
        }
        { (Object.keys(props.user).length === 0) &&
          <Nav className="mr-auto">
            Hello, future chef!
          </Nav>
        }
        { (Object.keys(props.user).length !== 0) &&
          <Nav className="mr-auto">
            <Link to="/recipes">
              Your Cookbook
            </Link>
          </Nav>
        }
        <Nav className="mr-auto">
          <Link to="/public_recipes">
            Public Cookbook
          </Link>
        </Nav>
        { (Object.keys(props.user).length !== 0) &&
          <Nav className="mr-auto">
            <Link to="/logout">
              Logout
            </Link>
          </Nav>
        }
        { (Object.keys(props.user).length === 0) &&
          <Nav className="mr-auto">
            <Link to="/login">
              Login
            </Link>
          </Nav>
        }
      </Navbar>
    </div>
  );
};
