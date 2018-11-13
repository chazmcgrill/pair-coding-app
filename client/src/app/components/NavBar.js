import React from "react";
import { NavLink } from "react-router-dom";
import './Navbar.sass';

const NavBar = ({user, openModal}) => (
    <header className="header">
        <div className="header-container">
            <div id="logo" className="logo">
                <h1 className="logo__nav">PEAR</h1>
            </div>
            <nav className="nav">
                <ul>
                    <li>
                        <NavLink exact activeClassName="active" to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/curriculum">Curriculum</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/Grid">Grid</NavLink>
                    </li>
                    <li>{user.photo ? <img className="nav-user-image" src={user.photo} alt="user avatar" /> : <div onClick={openModal}>Login</div>}</li>
                </ul>
            </nav>
        </div>
    </header>
);

export default NavBar;
