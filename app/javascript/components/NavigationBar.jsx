import React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import logo from '../../assets/images/logo_2.png';

const NavigationBar = () => {

  return (
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
        <NavDropdown title="" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#home">Hello, Mia</NavDropdown.Item>
          <NavDropdown.Item href="#home">Mia's Cookbook</NavDropdown.Item>
          <NavDropdown.Item href="#home">Cookbook Feed</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
