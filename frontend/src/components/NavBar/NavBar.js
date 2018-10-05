import React, { Component } from "react";
import { Link } from "react-router-dom";

class NavBar extends Component {


  render() {
    return (
      <header>
          <nav className="nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
              <Link to="/curriculum">Curriculum</Link>
              </li>
            </ul>
          </nav>
      </header>
    );
  }
}

export default NavBar;
