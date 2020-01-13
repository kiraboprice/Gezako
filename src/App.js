import React, {Component} from 'react'
import 'firebase/auth';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './components/login/Login';
import CompletedSpockTests from './components/testreports/completedspocktests/CompletedSpockTests';

import './assets/fonts/fonts.css';
import './app.css';
import SpockTestsInDevelopment from './components/testreports/spocktestsindevelopment/SpockTestsInDevelopment';

import Navigation from "./components/navigation/Navigation";
import SidePanel from "./components/sidepanel/Sidepanel";
import Tasks from "./components/tasks/Tasks";
import CreateTask from "./components/tasks/CreateTask";

import TaskDetails from "./components/tasks/TaskDetails";
import { connect } from 'react-redux'
import ReportDetails from "./components/testreports/reportdetails/ReportDetails";
import UploadReport from "./components/testreports/uploadreport/UploadReport";
import PerformanceTests from "./components/perfomance/PerformanceTests";
import UpdateReport from "./components/testreports/updatereport/UpdateReport";
import Home from "./components/testreports/home/Home";


class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <div>
          <BrowserRouter>
            <Navigation/>
            <SidePanel/>
            <Switch>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/' component={Home}/>

              <Route exact path='/upload-report' component={UploadReport}/>

              <Route exact path='/completed/:service' component={CompletedSpockTests}/>
              <Route exact path='/completed/update-report/:id' component={UpdateReport}/>
              <Route exact path='/completed/report/:id' component ={ReportDetails}/>

              <Route exact path='/development/:service' component={SpockTestsInDevelopment}/>
              {/*<Route exact path='/report/development/:id'*/}
                     {/*render={(props) => <ReportDetails {...props} collectionUrl='developmentreports' />}/>*/}
              <Route exact path='/development/report/:id' component ={ReportDetails}/>
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
    //authSuccess: state.auth.authSuccess,
  }
}

export default connect(mapStateToProps)(App);
