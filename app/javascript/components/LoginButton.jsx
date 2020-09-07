import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="btn btn-lg custom-button"
      role="button"
      onClick={() => loginWithRedirect()}>Log In
    </button>
  );
};

export default LoginButton;
