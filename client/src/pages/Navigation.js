import React, { Component, useContext } from "react";
import { NavLink, withRouter, Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import { removeUserSession } from "../utils/Common";
import { Context } from "../context";
import { Navbar, Nav } from "react-bootstrap";

export class Navigation extends Component {
  static contextType = Context;
  render() {
    const { logged } = this.context;
    return (
      <Navbar
        className="navbar-css"
        collapseOnSelect
        expand="lg"
        variant="dark"
        fixed="top"
      >
        <Navbar.Brand>
          <b>SlashIt</b>
        </Navbar.Brand>
        <Navbar.Toggle
          className="toogle-css"
          aria-controls="responsive-navbar-nav"
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          {logged ? <AuthNavbarBase logout={this.logout} /> : <NonAuthNavbar />}
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const AuthNavbar = (props) => {
  const { settingState } = useContext(Context);
  return (
    <>
      <Nav className="m-auto">
        <Nav.Link href={ROUTES.HOME_PAGE}>
          <Link className="nav-link active" to={ROUTES.HOME_PAGE}>
            Home <span className="sr-only">(current)</span>
          </Link>
        </Nav.Link>
        <Nav.Link href={ROUTES.SHORTEN}>
          <Link className="nav-link" to={ROUTES.SHORTEN}>
            Shorten <span className="sr-only"></span>
          </Link>
        </Nav.Link>
        <Nav.Link href={ROUTES.ALL_SHORTEN}>
          <Link className="nav-link" to={ROUTES.ALL_SHORTEN}>
            List All
          </Link>
        </Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#">
          <NavLink
            onClick={() => {
              removeUserSession();
              settingState(false, "", "");
              props.history.push("/");
            }}
            to={ROUTES.HOME_PAGE}
            className="nav-link"
          >
            SignOut
          </NavLink>{" "}
        </Nav.Link>
      </Nav>
    </>
  );
};

const AuthNavbarBase = withRouter(AuthNavbar);

const NonAuthNavbar = () => (
  <>
    <Nav className="ml-auto">
      <Nav.Link href={ROUTES.HOME_PAGE}>
        <NavLink className="nav-link" to={ROUTES.HOME_PAGE}>
          Home <span className="sr-only">(current)</span>
        </NavLink>
      </Nav.Link>
      <Nav.Link href={ROUTES.SIGN_IN}>
        <NavLink className="nav-link" to={ROUTES.SIGN_IN}>
          Sign In
        </NavLink>
      </Nav.Link>
      <Nav.Link href={ROUTES.SIGN_UP}>
        <NavLink className="nav-link" to={ROUTES.SIGN_UP}>
          Sign Up
        </NavLink>
      </Nav.Link>
    </Nav>
  </>
);

export default withRouter(Navigation);
