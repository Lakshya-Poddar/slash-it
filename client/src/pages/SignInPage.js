import React, { Component } from "react";

export class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    console.log("e", this.state.email , this.state.password);
  };
  render() {
    return (
      <div className="App-header">
        <h1>Sign In</h1>
        <form onSubmit={this.handleSubmit}>
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
          <br/>
          <label>
            Password :
            <input
              type="password"
              name="password"
              onChange={this.handleChange}
              value={this.state.password}
              className="mx-1"
              placeholder="Enter the password"
            />
          </label><br />
          <button type="submit" className="text-center">Sign In</button>
        </form>
      </div>
    );
  }
}

export default SignInPage;
