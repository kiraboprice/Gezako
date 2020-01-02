import React, {Component} from 'react'
import 'firebase/auth';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

import Login from './components/login/Login';
import Home from './components/home/Home';

import './assets/fonts/fonts.css';
import './App.css';
import Development from './components/development/Development';
import Navigation from "./components/navigation/Navigation";
import SidePanel from "./components/sidepanel/Sidepanel";
import CreateSpockReport from "./components/reports/create/CreateSpockReport";
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
              <Route exact path='/' component={Home}/>
              <Route path='/development' component={Development}/>
              <Route path='/create-spock-report' component={CreateSpockReport}/>
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
  console.log("state in App.js")
  console.log(state)
  return {
    authSuccess: state.auth.authSuccess,
  }
}

export default connect(mapStateToProps)(App);
