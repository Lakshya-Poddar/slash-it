import React, { Component } from "react";
import axios from "axios";
import { getToken } from "../utils/Common";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";

export class Shorten extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hash: "",
      longUrl: "",
      error: "",
      newUrl: "",
      hashMsg: "",
      output: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "this.state.longUrl,this.state.hash",
      this.state.longUrl,
      this.state.hash
    );
    axios
      .post(
        "http://localhost:5000/shorten/",
        { hash: this.state.hash, longUrl: this.state.longUrl },
        { headers: { "auth-shorten-token": getToken() } }
      )
      .then((resp) => {
        console.log("resp", resp);
        if (resp.data.error) {
          this.setState({ error: resp.data.error });
        } else {
          this.setState({
            output: `http://localhost:5000/${resp.data.doc.hashed}/`,
            hash: "",
            error: "",
            newUrl: "",
            hashMsg: "",
          });
        }
      });
  };

  componentWillUnmount() {
    this.setState({
      hash: "",
      longUrl: "",
      error: "",
      newUrl: "",
      hashMsg: "",
      output: "",
    });
  }

  render() {
    if (!getToken())
      return (
        <div className="App-header text-center">
          <h1>
            You are not <span className="text-danger"> logged in</span>.
          </h1>
          <span>
            <Link to={ROUTES.SIGN_IN}>
              <button className="text-center m-2 btn btn-outline-danger mt-3">
                Sign In
              </button>
            </Link>
            <Link to={ROUTES.SIGN_UP}>
              <button className="text-center m-2 btn btn-outline-danger mt-3">
                Sign Up
              </button>
            </Link>
          </span>
        </div>
      );
    return (
      <div className="App-header text-center">
        <div className="my-2">
          <small className="text-danger text-center">{this.state.error}</small>
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group form-inline">
            <label>Long Url :</label>
            <input
              type="text"
              name="longUrl"
              className="mx-2 form-control"
              onChange={this.handleChange}
              value={this.state.longUrl}
              placeholder="Enter the url"
            />
          </div>
          <div className="form-group form-inline">
            <label>Preferred Hash* :</label>
            <input
              type="text"
              name="hash"
              onChange={this.handleChange}
              value={this.state.hash}
              className="mx-2 form-control"
              placeholder="Enter preferred hash"
            />
          </div>
          <small className="text-muted">
            *
            <i>
              If your preferred hash is not available, random url will be
              alloted
            </i>
          </small>
          <br />
          <button
            type="submit"
            className="text-center btn btn-outline-danger mt-3"
          >
            Short It
          </button>

          <div></div>
        </form>
        <p className={this.state.output ? "" : "d-none"}>
          OUTPUT :<a href={this.state.output}>{this.state.output}</a>
        </p>
      </div>
    );
  }
}

export default Shorten;
