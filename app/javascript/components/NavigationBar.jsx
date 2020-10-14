import React from "react";
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import logo from '../../assets/images/logo_2.png';

export default function NavigationBar(props) {

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
        <NavDropdown title="" style={{"paddingRight":"10rem"}}>
          <NavDropdown.Item href="#home">Hello, {props.user.username}!</NavDropdown.Item>
          <NavDropdown.Item href="#home">Your Cookbook</NavDropdown.Item>
          <NavDropdown.Item href="#home">Public Cookbook</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#logout">Logout</NavDropdown.Item>
        </NavDropdown>
      </Navbar>
    </div>
  );
};
