import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";

class Navbar extends Component {
  state = {};
  render() {
    const { user } = this.props;

    return (
      <nav className="navbar navbar-expand-lg navbar-light shadow-sm">
        <div className="container">
          <Link className="nav-item nav-link" to="/about">
            <span style={{ fontSize: "1.5em", color: "black" }}>
              <i className="fas fa-shopping-bag"></i> Busieasy
            </span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-item nav-link" to="/">
                  About
                </NavLink>
              </li>
              {user && (
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/all-cards">
                    Find Cards
                  </NavLink>
                </li>
              )}
              {user && !user.biz && (
                <li className="nav-item">
                  <NavLink className="nav-item nav-link" to="/favorites">
                    My Favorites
                  </NavLink>
                </li>
              )}
              <li className="nav-item">
                {user && user.biz && (
                  <NavLink className="nav-item nav-link" to="/my-cards">
                    My Cards
                  </NavLink>
                )}
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              {!user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/signin">
                      Signin
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/signup">
                      Signup for users
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/biz-signup">
                      Signup for Business
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
              {user && (
                <React.Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-item nav-link" to="/logout">
                      Logout
                    </NavLink>
                  </li>
                </React.Fragment>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
