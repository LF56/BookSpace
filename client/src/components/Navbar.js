import React from "react";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  return (
    <nav className="uk-navbar-container">
      <div className="uk-navbar-right" id="nav-right">
        <ul className="uk-navbar-nav" id="nav">
          <li>
            <Link to="/">Search Books</Link>
          </li>
          <li>
            <Link to="/want">Want To Read</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default AppNavbar;
