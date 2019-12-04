import React from "react";
import ReactDOM from "react-dom";
// import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import { Router, Route, Switch } from "react-router-dom";
import * as serviceWorker from './serviceWorker';

import "assets/scss/material-kit-react.scss?v=1.8.0";

// pages
import SpockReportsPage from "views/SpockReportsPage/SpockReportsPage.js";
import SpockDevelopmentPage from "views/SpockDevelopmentPage/SpockDevelopmentPage.js";
import EditPage from "views/EditPage/EditPage.js";
import CreatePage from "views/CreatePage/CreatePage.js";
import ShowPage from "views/ShowPage/ShowPage.js";
import App from './App';

ReactDOM.render(
    <Router>
      <div>
        <Route exact path='/' component={App} />
        <Route path="/spock-reports" component={SpockReportsPage} />
        <Route path="/spock-development" component={SpockDevelopmentPage} />
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