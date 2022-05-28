import React from "react";
import SearchBooks from "../pages/SearchBooks";
import WantToRead from "../pages/WantToRead";
import Login from "../components/LoginForm";
import SignUp from "../components/Signupform";
import { Link } from "react-router-dom";

const AppNavbar = () => {
  //possible modals for login/signup
  // const [showModal, setShowModal] = useState(false);

<<<<<<< HEAD
    return (
        <>
        
<nav class="uk-navbar-container" uk-navbar>

<div class="uk-navbar-right" id="nav-right">
    <ul class="uk-navbar-nav" id="nav">
        <li><Link to="/">Search Books</Link></li>
        <li><Link to="/have">Have Read</Link></li>
        <li><Link to="/want">Want To Read</Link></li>
        <li><Link to={<Login/>}>Login</Link></li>
        <li><Link to={<SignUp/>}>SignUp</Link></li>
    </ul>

</div>

</nav>

        </>
    )
=======
  return (
    <>
      <nav class="uk-navbar-container" uk-navbar>
        <div class="uk-navbar-right" id="nav-right">
          <ul class="uk-navbar-nav" id="nav">
            <li>
              <Link to="/">Search Books</Link>
            </li>
            <li>
              <Link to="/want">Want To Read</Link>
            </li>
            {/* <li><Link to={<Login/>}>Login</Link></li> */}
          </ul>
        </div>
      </nav>
    </>
  );
>>>>>>> 7ed741661fc48ee1e3e7abb1b3d8c8c12f858e6e
};
export default AppNavbar;
