import React, { Component } from "react";
import { getUser } from "../utils/Common";
import {Link} from 'react-router-dom'
import * as ROUTES from '../constants/routes'
export class HomePage extends Component {
  render() {
    const user = getUser();
    return (
      <div className="App-header px-5mt-sm-5 p-sm-5">
        <h1 className="text-uppercase homepage-css text-center pb-5 pt-3">Customised<span> Url Shortner</span></h1>
        <h2 > </h2>
        <p className="text-center">Slash It is a free tool to shorten a URL.<br />
          Create URL's which are easy to remember.</p>
          <br />
          <br></br>
        {
          user?"":<span className="d-md-none d-lg-none">
            <Link to={ROUTES.SIGN_IN}>
              <button className="text-center m-2 btn btn-outline-css btn-outline-css-light mt-3">
                Sign In
              </button>
            </Link>
            <Link to={ROUTES.SIGN_UP}>
              <button className="text-center m-2 btn btn-outline-css btn-outline-css-dark mt-3">
                Sign Up
              </button>
            </Link>
          </span> 
        }  
           

      </div>
    );
  }
}

export default HomePage;
