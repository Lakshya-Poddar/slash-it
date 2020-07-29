import React, { Component } from "react";
import { getUser } from "../utils/Common";
export class HomePage extends Component {
  render() {
    const user = getUser();
    return (
      <div className="App-header">
        <h1 className="text-uppercase homepage-css">HELLO <span> {user ? user.name : "Visitor"}</span></h1>
        {}
      </div>
    );
  }
}

export default HomePage;
