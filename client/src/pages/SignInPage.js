import React, { Component, useContext } from "react";
import { Context } from "../context";
import Axios from "axios";
export class SignInPage extends Component {
  static contextType = Context;
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error:""
    };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = (e) => {
    e.preventDefault();
    const { settingState } = this.context;
    Axios.post('http://localhost:5000/login',{email:this.state.email,password:this.state.password})
    .then((resp)=>{
      if (resp.data.error) {
        this.setState({ error: resp.data.error });
      } else {
        settingState(resp.data.token, resp.data.userid);
        
        this.props.history.push("/");
      }
    })
  };
  componentWillUnmount() {
    this.setState({ name: "", email: "", password: "", error: "" });
  }
  
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
          <br />
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
          </label>
          <br />
          <button type="submit" className="text-center">
            Sign In
          </button>{" "}
          {this.state.error}
        </form>
      </div>
    );
  }
}

export default SignInPage;
