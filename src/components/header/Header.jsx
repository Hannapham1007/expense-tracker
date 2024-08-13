import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const [usernameCapitalizeFirstLetter, setUsernameCapitalizeFirstLetter] = useState("");

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setIsLogin(true);
      const capitalizeFirstLetter = (name) => {
        return name.charAt(0).toUpperCase() + name.slice(1);
      };
      setUsernameCapitalizeFirstLetter(capitalizeFirstLetter(loggedInUser.username));
    } else {
      setIsLogin(false);
      setUsernameCapitalizeFirstLetter(""); 
    }
  }, []); 

  return (
    <nav className="navbar navbar-expand-lg navbar-light border-bottom fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/dashboard">
          Expense
        </Link>
        <div className="d-flex align-items-center">
          {isLogin ? (
            <p className="my-0 fw-bold" style={{ color: "white" }}>
              Hi, {usernameCapitalizeFirstLetter}!
            </p>
          ) : (
            <p className="my-0 fw-bold" style={{ color: "white" }}>
              Welcome!
            </p>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
