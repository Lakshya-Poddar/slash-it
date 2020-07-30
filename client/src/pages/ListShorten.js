import React, { Component } from "react";
import { getToken } from "../utils/Common";
import { Link } from "react-router-dom";
import * as ROUTES from "../constants/routes";
import axios from "axios";
import Loader from "react-loader-spinner";

export class ListShorten extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    axios
      .get("/shorten/list", {
        headers: { "auth-shorten-token": getToken() },
      })
      .then((resp) => {
        this.setState({ items: resp.data, isLoading: false });
      })
      .catch((err) => console.log("err", err));
  }

  componentWillUnmount() {
    this.setState({ items: [] });
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
              <button className="text-center m-2 btn btn-outline-css mt-3">
                Sign In
              </button>
            </Link>
            <Link to={ROUTES.SIGN_UP}>
              <button className="text-center m-2 btn btn-outline-css mt-3">
                Sign Up
              </button>
            </Link>
          </span>
        </div>
      );
    return (
      <>
        <div className={this.state.isLoading ? "App-header" : "d-none"}>
          <Loader
            type="Oval"
            color="#45ACF1"
            height={50}
            width={50}
            timeout={500000000}
          />
        </div>
        <div className={!this.state.isLoading?"listbackground-css  pt-3 pt-md-5 mt-5 pb-2":"d-none"}>
          <div className="container">
            <div className="list-group p-3 text-light  w-100  mt-5 ">
              {this.state.items.length === 0 ? (
                <p className="text-center  text-light">NO ITEMS FOUND</p>
              ) : (
                this.state.items
                  .reverse()
                  .map((item) => (
                    <EachItem
                      key={item._id}
                      hash={item.hashed}
                      url={item.longUrl}
                    />
                  ))
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

const EachItem = ({ hash, url }) => (
  <div className="list-group-item my-1 mx-2 list-group-item-action flex-column align-items-center active ">
    <div className="row">
      <div className="col-12 col-md-12 col-lg-4 ">
        <a
          href={`https://slashit.herokuapp.com/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-1 list-style "
        ><p>{`https://slashit.herokuapp.com/${hash}`}</p></a>
      </div>
      <div className="col-12 col-md-12 col-lg-6 ">
        <p className="mb-1 text-light">
          {`URL : `}
          <span className="list-style-dark">{`${url}`}</span>
        </p>
      </div>
      <div className="col-12 col-md-12 col-lg-2 list-style">
        <p className="text-light">
          {`Hash : `}
          <span className="list-style">{`${hash}`}</span>
        </p>
      </div>
    </div>
  </div>
);

export default ListShorten;
