import React from "react";
import { NavLink } from "react-router-dom";
import './Header.sass';

const NavBar = ({user, openModal}) => (
    <header className="header" style={{ backgroundColor: '#fff' }}>
        <h3 className="header_logo">PEAR</h3>
        <nav className="nav">
            <NavLink exact activeClassName="active" to="/">Home</NavLink>
            <NavLink activeClassName="active" to="/curriculum">Curriculum</NavLink>
            <NavLink activeClassName="active" to="/Grid">Grid</NavLink>
            {/* {user.photo ? <img className="nav-user-image" src={user.photo} alt="user avatar" /> : <div className="nav-link" onClick={openModal}>Login</div>} */}
        </nav>
    </header>
);

export default NavBar;
