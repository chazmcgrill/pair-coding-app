import React, { Component } from "react";
import { NavLink } from "react-router-dom";

class NavBar extends Component {

  render() {
    return (
      <header>
          <nav className="nav">
            <ul>
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/curriculum">Curriculum</NavLink>
              </li>
            </ul>
          </nav>
      </header>
    );
  }

}

export default NavBar;
