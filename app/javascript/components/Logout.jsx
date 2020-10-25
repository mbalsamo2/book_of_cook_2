import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function Logout(props) {

  useEffect(() => {
    logout()
  },[])

  const logout = () => {
    const url = "/sessions/destroy";
    fetch(url)
      .then(repsonse => {
        if (response.ok) {
          props.handleLogout();
          localStorage.clear();
          return response.json();
        }
        throw new Error("Network response not ok.");
      })
      .then((response) => {})
      .catch(() => props.history.push("/"));

  }

  return (
    <div>
      <button>
        Log me out!
      </button>
    </div>
  )
}
