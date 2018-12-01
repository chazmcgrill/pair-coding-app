import React from "react";
import { NavLink } from "react-router-dom";
import './Footer.sass';

const Footer = () => (
    <div className="footer">
        <div className="footer-container">
            <div id="logo" className="logo">
                <h1 className="logo__nav">PEAR</h1>
            </div>
            <nav className="footer-nav">
                <NavLink exact activeClassName="active" to="/">Home</NavLink>
                <NavLink activeClassName="active" to="/curriculum">Curriculum</NavLink>
                <NavLink activeClassName="active" to="/Grid">Grid</NavLink>
            </nav>
        </div>
    </div>
    
);

export default Footer;