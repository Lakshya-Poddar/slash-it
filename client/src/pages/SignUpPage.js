import React, { Component } from "react";

export class SignUpPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("e", this.state.email, this.state.password);
  };
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
          </button>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
