import React from "react";
import "./App.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import HomePage from "./pages/HomePage";
import ListShorten from "./pages/ListShorten";
import Shorten from "./pages/Shorten";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import { Route, Switch, Redirect } from "react-router-dom";
import Navigation from "./pages/Navigation";
import * as ROUTES from "./constants/routes";

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path={ROUTES.HOME_PAGE} exact component={HomePage} />
        <Route path={ROUTES.SIGN_IN} exact component={SignInPage} />
        <Route path={ROUTES.SIGN_UP} exact component={SignUpPage} />
        <Route path={ROUTES.ALL_SHORTEN} exact component={ListShorten} />
        <Route path={ROUTES.SHORTEN} exact component={Shorten} />
        <Route path="/" component={HomePage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
