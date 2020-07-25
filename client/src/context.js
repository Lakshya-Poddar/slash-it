import React, { Component, createContext } from "react";

export const Context = createContext();

export class ContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      say: "HI",
      token:"",
      userid:""
    };
  }
  settingState=(token,userid)=>{
    this.setState({token,userid})
  }
  render() {
    return (
      <Context.Provider value={{ ...this.state,settingState:this.settingState }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ContextProvider;
