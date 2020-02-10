import React, {Component, useState} from 'react'
import 'firebase/auth';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './components/login/Login';
import CompletedSpockTests from './components/tests/completedtests/CompletedSpockTests';

import './assets/fonts/fonts.css';
import './app.css';
import SpockTestsInDevelopment from './components/tests/testsindevelopment/SpockTestsInDevelopment';

import Navigation from "./components/navbar/NavBar";
import SideBar from "./components/sidepanel/SideBar";
import Tasks from "./components/tasks/Tasks";
import CreateTask from "./components/tasks/CreateTask";

import TaskDetails from "./components/tasks/TaskDetails";
import { connect } from 'react-redux'
import ReportDetails from "./components/tests/testdetails/TestDetails";
import CreateTest from "./components/tests/createtestreport/CreateTestReport";
import PerformanceTests from "./components/perfomance/PerformanceTests";
import UpdateTest from "./components/tests/updatetest/UpdateTest";
import Home from "./components/tests/home/Home";
import CustomSnackbar from "./components/alerts/CustomSnackbar";
import ErrorBoundary from "./components/error/ErrorBoundary";
import Features from "./components/tests/features/viewfeatures/Features";
import CreateFeature
  from "./components/tests/features/createfeature/CreateFeature";
import FeatureDetails
  from "./components/tests/features/featuredetails/FeatureDetails";
import UpdateFeature
  from "./components/tests/features/updatefeature/UpdateFeature";


const App = (props) => {
  const { user } = props;

  return (
        <div>
          <BrowserRouter>
            <ErrorBoundary>

              {user? <Navigation/> : null}

              {user? <SideBar/> : null}

              {user?
                  <CustomSnackbar
                  showSuccessAlert = {true}
                  />
                  : null
              }

            <Switch>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/' component={Home}/>

              <Route exact path='/features/create' component={CreateFeature}/>
              <Route exact path='/features/:service' component={Features}/>
              <Route exact path='/features/:service/:id' component ={FeatureDetails}/>
              <Route exact path='/features/:service/update/:id' component={UpdateFeature}/>

              <Route exact path='/completed/upload-report' component={CreateTest}/>
              <Route exact path='/completed/:service' component={CompletedSpockTests}/>
              <Route exact path='/completed/update-report/:id' component={UpdateTest}/>
              <Route exact path='/completed/test/:id' component ={ReportDetails}/>

              <Route exact path='/development/upload-report' component={CreateTest}/>
              <Route exact path='/development/:service' component={SpockTestsInDevelopment}/>
              {/*<Route exact path='/report/development/:id'*/}
                     {/*render={(props) => <ReportDetails {...props} collectionUrl='developmentreports' />}/>*/}
              <Route exact path='/development/test/:id' component ={ReportDetails}/>
              <Route exact path='/development/update-report/:id' component={UpdateTest}/>

              <Route exact path='/performance' component={PerformanceTests}/>

              <Route exact path='/create-task' component={CreateTask}/>
              <Route exact path='/tasks' component={Tasks}/>
              <Route exact path='/task/:id' component={TaskDetails}/>
            </Switch>

            </ErrorBoundary>
          </BrowserRouter>
        </div>
    );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
};

export default connect(mapStateToProps)(App);
