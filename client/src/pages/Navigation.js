import React, { Component, useContext } from "react";
import { NavLink, withRouter } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { removeUserSession } from "../utils/Common";
import { Context } from "../context";

export class Navigation extends Component {
  static contextType = Context;
  render() {
    const { logged, username } = this.context;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <NavLink className="navbar-brand" to="/">
          <b>UrlShortner</b>
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse text-center"
          id="navbarSupportedContent"
        >
          {logged ? <AuthNavbarBase logout={this.logout} /> : <NonAuthNavbar />}
        </div>
        <p className="text-light text-uppercase d-none d-md-block d-lg-block">
          {username ? username : ""}
        </p>
      </nav>
    );
  }
}

const AuthNavbar = (props) => {
  const { settingState } = useContext(Context);
  return (
    <ul className="navbar-nav m-auto">
      <li className="nav-item">
        <NavLink className="nav-link" to={ROUTES.HOME_PAGE}>
          Home <span className="sr-only">(current)</span>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={ROUTES.SHORTEN}>
          Shorten <span className="sr-only"></span>
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink className="nav-link" to={ROUTES.ALL_SHORTEN}>
          List All
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink
          onClick={() => {
            removeUserSession();
            settingState(false, "", "");
            props.history.push("/");
          }}
          to={ROUTES.HOME_PAGE}
          className="nav-link"
        >
          Sign Out
        </NavLink>
      </li>
    </ul>
  );
};

const AuthNavbarBase = withRouter(AuthNavbar);

const NonAuthNavbar = () => (
  <ul className="navbar-nav m-auto">
    <li className="nav-item active">
      <NavLink className="nav-link" to={ROUTES.HOME_PAGE}>
        Home <span className="sr-only">(current)</span>
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" to={ROUTES.SIGN_IN}>
        Sign In
      </NavLink>
    </li>

    <li className="nav-item">
      <NavLink className="nav-link" to={ROUTES.SIGN_UP}>
        Sign Up
      </NavLink>
    </li>
  </ul>
);

export default withRouter(Navigation);
