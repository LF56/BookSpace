import React from "react";


const AppNavbar = () => {
    //possible modals for login/signup
    // const [showModal, setShowModal] = useState(false);

    return (
        <>
        
<nav class="uk-navbar-container" uk-navbar>


<div class="uk-navbar-right" id="nav-right">
    <ul class="uk-navbar-nav" id="nav">
        <li ><a href="#">Have Read</a></li>
        <li>
            <a href="#">Want To Read</a>
        </li>
        <li><a href="#">Login</a></li>
    </ul>

</div>

</nav>

        </>
    )
};
export default AppNavbar




