import React from "react";
import { Link } from "react-router-dom";
import Auth from '../utils/auth';

const AppNavbar = () => {
  const logout = event => {
    event.preventDefault();
    Auth.logout();
  }
  return (
    <nav className="uk-navbar-container">
      <div className="uk-navbar-right" id="nav-right">
        <ul className="uk-navbar-nav" id="nav">
          {/* <li>
            <Link to="/">Search Books</Link>
          </li>
         
          <li>
            <Link to="/login">Login</Link>
          </li> */}
          {/* <li>
            <Link to="/want">Want To Read</Link>
          </li>
          <li>
            <Link onClick={Auth.logout} to="/logout">Logout</Link>
          </li> */}
          
            {Auth.loggedIn() ? (
            <>
              <Link to="/want">Want To Read</Link>
              <Link to="/">Search Books</Link>

              <a href="/" onClick={logout}>
                Logout
              </a>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/">Search Books</Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default AppNavbar;
