import React, { Component, createContext } from "react";
import { getUser } from "./utils/Common";
export const Context = createContext();

export class ContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      logged: false,
      username: "",
      userid: "",
    };
  }
  componentDidMount() {
    const user = getUser();
    if (user)
      this.setState({ logged: true, username: user.name, userid: user._id });
    else this.setState({ logged: false, username: "", userid: "" });
  }

  settingState = (status, name, id) => {
    this.setState({ logged: status, username: name, userid: id });
  };
  render() {
    return (
      <Context.Provider
        value={{ ...this.state, settingState: this.settingState }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default ContextProvider;
