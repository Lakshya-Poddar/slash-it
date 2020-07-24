import React, { Component, createContext } from "react";

export const Context = createContext();

export class ContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      say: "HI",
      userData:{token:null}
    };
  }

  render() {
    return (
      <Context.Provider value={{ ...this.state }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ContextProvider;
