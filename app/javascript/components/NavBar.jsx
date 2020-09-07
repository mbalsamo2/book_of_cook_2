import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./Profile";

const NavBar = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  return (
    isAuthenticated && (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <span className="navbar-brand mb-0 h1">
          <img
            className="img-thumbnail"
            style={{"height":"4rem"}}
            src={user.picture}
            alt={user.name}
          />
          <p>
            style={{"float":"right"}}
            {user.name}
          </p>
        </span>
      </nav>
    </div>
    )
  );
};

export default NavBar;
