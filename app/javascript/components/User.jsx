import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "./NavigationBar";

export default function User(props) {
  const [user, setUser] = useState(null);

  return (
    <div>
      <NavigationBar />
      <p>
        WE MADE IT!
      </p>
    </div>
  )
}
