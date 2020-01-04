import React, {Component} from 'react'
import 'firebase/auth';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './components/login/Login';
import CompletedSpockTests from './components/completedspocktests/CompletedSpockTests';

import './assets/fonts/fonts.css';
import './App.css';
import SpockTestsInDevelopment from './components/spocktestsindevelopment/SpockTestsInDevelopment';
import Navigation from "./components/navigation/Navigation";
import SidePanel from "./components/sidepanel/Sidepanel";
import UploadReportInDevelopment from "./components/spocktestsindevelopment/UploadReportInDevelopment";
import Tasks from "./components/tasks/Tasks";
import CreateTask from "./components/tasks/CreateTask";

import TaskDetails from "./components/tasks/TaskDetails";
import { connect } from 'react-redux'

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
              <Route exact path='/' component={CompletedSpockTests}/>
              {/*<Route path='/complete-test-report/:id' component={DevReportDetails}/>*/}
              <Route path='/development' component={SpockTestsInDevelopment}/>
              {/*<Route path='/dev-test-report/:id' component={DevReportDetails}/>*/}
              <Route path='/upload-dev-report' component={UploadReportInDevelopment}/>
              <Route path='/tasks' component={Tasks}/>
              <Route path='/create-task' component={CreateTask}/>
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
