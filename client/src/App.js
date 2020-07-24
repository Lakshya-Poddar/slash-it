import React, { useContext } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import ListShorten from "./pages/ListShorten";
import Shorten from "./pages/Shorten";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ErrorPage from "./pages/ErrorPage";
import { Route, Switch } from "react-router-dom";
import Navigation from "./pages/Navigation";
import * as ROUTES from "./constants/routes";
//import {Context} from './context'

function App() {
  // const {say}=useContext(Context);
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path={ROUTES.HOME_PAGE} exact component={HomePage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.ALL_SHORTEN} component={ListShorten} />
        <Route path={ROUTES.SHORTEN} component={Shorten} />
        <Route component={ErrorPage} />
      </Switch>
    </div>
  );
}

export default App;
