import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {

  render() {
    return (
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
                    <li>
                    <NavLink activeClassName="active" to="/Login">Login</NavLink>
                    </li>
                </ul>
            </nav>
          </div>
      </header>
    );
  }

}

export default NavBar;
