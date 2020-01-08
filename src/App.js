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
import PerformanceTests from "./components/perfomance/PerformanceTests";
import CompletedReportDetails from "./components/testreports/completedspocktests/CompletedReportDetails";
import DevelopmentReportDetails from "./components/testreports/spocktestsindevelopment/DevelopmentReportDetails";
import UpdateReport from "./components/testreports/UpdateReport";


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div className="container">
          <BrowserRouter>
            <Navigation/>
            <SidePanel/>
            <Switch>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/upload-report' component={UploadReport}/>

              {/*we'll have a proper home screen later on. for now, redirect to loans page*/}
              <Route exact path='/' component={CompletedSpockTests}/>
              <Route exact path='/completed/loans' component={CompletedSpockTests}/>
              <Route exact path='/completed/update-report/:id' component={UpdateReport}/>

              {/*<Route*/}
                  {/*exact path='/report/completed/:id'*/}
                  {/*render={(props) => <ReportDetails {...props} collectionUrl='completedreports' />}/>*/}

              <Route exact path='/report/completed/:id' component ={CompletedReportDetails}/>

              <Route exact path='/development' component={SpockTestsInDevelopment}/>
              {/*<Route exact path='/report/development/:id'*/}
                     {/*render={(props) => <ReportDetails {...props} collectionUrl='developmentreports' />}/>*/}
              <Route exact path='/report/development/:id' component ={DevelopmentReportDetails}/>
              <Route exact path='/development/update-report/:id' component={UpdateReport}/>

              <Route exact path='/performance' component={PerformanceTests}/>

              <Route exact path='/create-task' component={CreateTask}/>
              <Route exact path='/tasks' component={Tasks}/>
              <Route exact path='/task/:id' component={TaskDetails}/>
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
