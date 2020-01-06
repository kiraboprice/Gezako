import React, {Component} from 'react'
import 'firebase/auth';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './components/login/Login';
import CompletedSpockTests from './components/testreports/completedspocktests/CompletedSpockTests';

import './assets/fonts/fonts.css';
import './App.css';
import SpockTestsInDevelopment from './components/testreports/spocktestsindevelopment/SpockTestsInDevelopment';

import Navigation from "./components/navigation/Navigation";
import SidePanel from "./components/sidepanel/Sidepanel";
import Tasks from "./components/tasks/Tasks";
import CreateTask from "./components/tasks/CreateTask";

import TaskDetails from "./components/tasks/TaskDetails";
import { connect } from 'react-redux'
import ReportDetails from "./components/testreports/ReportDetails";
import UploadReport from "./components/testreports/UploadReport";


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {authSuccess} = this.props;

    return (
        <div className="container">
          <BrowserRouter>
            <Navigation/>
            <SidePanel/>
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/upload-report' component={UploadReport}/>
              <Route exact path='/' component={CompletedSpockTests}/>
              <Route exact path='/report/completed/:id' component={ReportDetails}/>
              <Route path='/development' component={SpockTestsInDevelopment}/>
              <Route exact path='/report/development/:id' component={ReportDetails}/>

              <Route path='/create-task' component={CreateTask}/>
              <Route path='/tasks' component={Tasks}/>
              <Route path='/task/:id' component={TaskDetails}/>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authSuccess: state.auth.authSuccess,
  }
}

export default connect(mapStateToProps)(App);
