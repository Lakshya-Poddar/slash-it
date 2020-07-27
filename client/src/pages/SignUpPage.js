import React, { Component, useContext } from "react";
import axios from "axios";
import { Context } from "../context";
import { withRouter, Link } from "react-router-dom";
import { setUserSession } from "../utils/Common";
import * as ROUTES from "../constants/routes";


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
    };
  }
  
  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    const { settingState } = this.context;
    e.preventDefault();
    axios
      .post("/signup", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then((resp) => {
        if (resp.data.error) {
          this.setState({ error: resp.data.error });
        } else {
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
      <div className="App-header text-center">
        <h1 className="mb-3">Sign Up</h1>
        <div className="my-2">
          <small className="text-danger text-center">{this.state.error}</small>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-inline">
            <label>Name :</label>
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
            <label>E-mail<span className="text-danger"> *</span> :</label>
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
            <label>Password<span className="text-danger"> *</span> : </label>
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
            <label>Confirm<span className="text-danger"> *</span> : </label>
            <input
              type="password"
              name="confirm"
              required
              onChange={this.handleChange}
              value={this.state.confirm}
              className="mx-2 form-control"
              placeholder="Confirm password"
            />
          </div>
          <button
            type="submit"
            className="text-center btn btn-outline-danger btn-block mt-3"
          >
            Sign Up
          </button>
          <div className="my-1">
            <small className="text-left">
              Already signed up? <Link to={ROUTES.SIGN_IN}>Sign in</Link>
            </small>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignUpPage);
