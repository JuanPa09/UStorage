import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/css/nucleo-icons.css";
import "assets/scss/blk-design-system-react.scss?v=1.2.0";
import "assets/demo/demo.css";

import Index from "views/Index.js";
import LandingPage from "views/examples/LandingPage.js";
import RegisterPage from "views/examples/RegisterPage.js";
import ProfilePage from "views/examples/ProfilePage.js";
import MyDrivePage from "views/examples/MyDrivePage";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/components" render={(props) => <Index {...props} />} />
      <Route
        path="/landing-page"
        render={(props) => <LandingPage {...props} />}
      />
      <Route
        path="/register-page"
        render={(props) => <RegisterPage {...props} />}
      />
      <Route
        path="/profile-page"
        render={(props) => sessionStorage.getItem("token") !== null
          ? <ProfilePage {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
      />
      <Route
        path="/mydrive-page"
        render={(props) => sessionStorage.getItem("token") !== null
          ? <MyDrivePage {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
      />
      <Redirect from="/" to="/components" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
