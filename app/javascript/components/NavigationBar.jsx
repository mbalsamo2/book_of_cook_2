import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import logo from '../../assets/images/logo.png';

const NavigationBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated && (
    <div>
      <Navbar bg="light" variant="light">
        <Navbar.Brand href="#home">
          <img
            style={{"height":"4rem"}}
            src={logo}
            alt={'The Book of Cook'}
          />
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
        </Nav>
        <span className="navbar-brand mb-0 h1">
          <img
          className="img-thumbnail"
          style={{"height":"3rem"}}
          src={user.picture}
          alt={user.name}
          />
        </span>
        <NavDropdown title="" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#home">Hello, {user.name}</NavDropdown.Item>
          <NavDropdown.Item href="#home">{user.name}'s Cookbook</NavDropdown.Item>
          <NavDropdown.Item href="#home">Cookbook Feed</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </div>
    )
  );
};

export default NavigationBar;
