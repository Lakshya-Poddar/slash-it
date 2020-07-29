import React, { Component, useContext } from "react";
import axios from "axios";
import { Context } from "../context";
import { withRouter, Link } from "react-router-dom";
import { setUserSession } from "../utils/Common";
import * as ROUTES from "../constants/routes";
import Loader from "react-loader-spinner";

export class SignUpPage extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirm: "",
      error: "",
      isLoading: false,
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    const { settingState } = this.context;
    this.setState({ isLoading: true });
    e.preventDefault();
    axios
      .post("/signup", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then((resp) => {
        if (resp.data.error) {
          this.setState({ error: resp.data.error, isLoading: false });
        } else {
          this.setState({ isLoading: false });
          setUserSession(resp.data.token, resp.data.user);
          settingState(true, resp.data.user.name, resp.data.user._id);
          this.props.history.push("/");
        }
      })
      .catch((err) => this.setState({ error: err }));
  };
  componentWillUnmount() {
    this.setState({
      name: "",
      email: "",
      password: "",
      error: "",
      confirm: "",
    });
  }

  render() {
    return (
      <>
        <div className={this.state.isLoading ? "App-header" : "d-none"}>
          <Loader
            type="Oval"
            color="#45A29E"
            height={50}
            width={50}
            timeout={5000}
          />
        </div>
        <div
          className={
            this.state.isLoading ? "d-none" : "App-header text-center p-5"
          }
        >
          <h1 className="mb-3 signuptext-css">Sign Up</h1>
          <div className="my-2">
            <small className="text-danger text-center">
              {this.state.error}
            </small>
          </div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group form-inline">
              <label className="mx-2 label-css">Name :</label>
              <input
                type="text"
                name="name"
                className="mx-2 form-control"
                onChange={this.handleChange}
                value={this.state.name}
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group form-inline">
              <label className="mx-2 label-css">
                E-mail<span className="text-danger"> *</span> :
              </label>
              <input
                type="email"
                name="email"
                required
                className="mx-2 form-control"
                onChange={this.handleChange}
                value={this.state.email}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group form-inline">
              <label className="mx-2 label-css">
                Password<span className="text-danger"> *</span> :{" "}
              </label>
              <input
                type="password"
                name="password"
                required
                onChange={this.handleChange}
                value={this.state.password}
                className="mx-2 form-control"
                placeholder="Enter the password"
              />
            </div>
            <div className="form-group form-inline">
              <label className="mx-2 label-css">
                Confirm<span className="text-danger"> *</span> :{" "}
              </label>
              <input
                type="password"
                name="confirm"
                required
                onChange={this.handleChange}
                value={this.state.confirm}
                className="mx-2 form-control"
                placeholder="Re-Enter password"
              />
            </div>
            <button
              type="submit"
              className="text-center btn btn-outline-css px-3 my-2"
            >
              Sign Up
            </button>
            <div className="my-1">
              <p className="text-center">
                Already signed up?{" "}
                <Link className="link-css" to={ROUTES.SIGN_IN}>
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default withRouter(SignUpPage);
