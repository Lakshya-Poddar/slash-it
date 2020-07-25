import React, { Component, useContext } from "react";
import axios from "axios";
import { Context } from "../context";
import { withRouter } from "react-router-dom";
export class SignUpPage extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      error: "",
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    const { settingState } = this.context;
    e.preventDefault();
    axios
      .post("http://localhost:5000/signup", {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      })
      .then((resp) => {
          if (resp.data.error) {
            this.setState({ error: resp.data.error });
          } else {
            settingState(resp.data.token, resp.data.userid);
            
            this.props.history.push("/");
          }
      });
  };
componentWillUnmount(){
  this.setState({ name: "", email: "", password: "", error: "" });
}

  render() {
    return (
      <div className="App-header">
        <h1>Sign Up</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name :
            <input
              type="text"
              name="name"
              className="mx-2"
              onChange={this.handleChange}
              value={this.state.name}
              placeholder="Enter your name"
            />
          </label>
          <br />
          <label>
            E-mail :
            <input
              type="text"
              name="email"
              className="mx-2"
              onChange={this.handleChange}
              value={this.state.email}
              placeholder="Enter your email"
            />
          </label>
          <br />
          <label>
            Password :{" "}
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              className="mx-1"
              placeholder="Enter the password"
            />
          </label>
          <br />
          <button type="submit" className="text-center">
            Sign Up
          </button>{" "}
          {this.state.error}
        </form>
      </div>
    );
  }
}

export default withRouter(SignUpPage);
