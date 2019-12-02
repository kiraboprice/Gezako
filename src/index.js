import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages for this product
import LandingPage from "views/LandingPage/LandingPage.js";
import HomePage from "views/HomePage/HomePage.js";
import EditPage from "views/EditPage/EditPage.js";
import CreatePage from "views/CreatePage/CreatePage.js";
import ShowPage from "views/ShowPage/ShowPage.js";
import App from './App'; //this is actually needed here

ReactDOM.render(
    <Router>
      <div>
        <Route exact path='/' component={LandingPage} />
        <Route path="/reports" component={HomePage} />
        <Route path='/edit/:id' component={EditPage} />
        <Route path='/create' component={CreatePage} />
        <Route path='/show/:id' component={ShowPage} />
      </div>
    </Router>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();