import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

function Header() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const capitalizeFirstLetter = (name) =>{
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
  const usernameCapitalizeFirstLetter = capitalizeFirstLetter(loggedInUser.username);



  return (
      <nav className="navbar navbar-expand-lg navbar-light border-bottom fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/dashboard">
            Expense
          </Link>
          <div className="d-flex align-items-center">
            <p className="my-0 fw-bold" style={{color:'white'}}>Hi, {usernameCapitalizeFirstLetter}!</p>
          </div>
        </div>
      </nav>
  );
}

export default Header;
