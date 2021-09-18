import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "./assets/css/nucleo-icons.css";
import "./assets/scss/blk-design-system-react.scss?v=1.2.0";
import "./assets/demo/demo.css";

import Login from "./views/Login";
import RegisterPage from "./views/RegisterPage";
import MyDrivePage from "./views/MyDrivePage";
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/Login" render={(props) => <Login {...props} />} />
      <Route path="/register-page" render={(props) => <RegisterPage {...props} />} />
      <Route  path="/mydrive-page" render={(props) => sessionStorage.getItem("token") !== null
          ? <MyDrivePage {...props} />
          : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
      />
      <Redirect from="/" to="/Login" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
