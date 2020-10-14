import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function User(props) {
  const [user, setUser] = useState({});

  const fetchUser = () => {
    const {
      match: {
        params: { id }
      }
    } = props

    const url = `/api/v1/users/show/${id}`;

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Network response was not ok.");
    })
    .then(response => setUser(response))
    .catch(() => props.history.push(`/users/${id}`));
  }

  useEffect( () => {
    fetchUser();
  }, [])


  return (
    <div>
      <NavigationBar user={user}/>
      <p>
        WE MADE IT!
      </p>
      { user &&
        <p> {user.username} </p>
      }
    </div>
  )
}
