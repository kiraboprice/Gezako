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

import firebase from './fbConfig'
import TaskDetails from "./components/tasks/TaskDetails";
import { connect } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {firebaseAuthLoaded: false}
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({firebaseAuthLoaded: true})
    })
  }

  render() {
    const {firebaseUser} = this.props;

    return (
        <div className="container">
          <BrowserRouter>
            <Navigation/>
            <SidePanel/>
            <Switch>
              {firebaseUser.uid
                  ? <Route path='/' exact component={Home}/>
                  : <Route path='/' exact component={Login}/>}
              <Route path='/development' exact component={Development}/>
              <Route path='/create-spock-report' exact component={CreateSpockReport}/>
              <Route path='/tasks' exact component={Tasks}/>
              <Route path='/create-task' exact component={CreateTask}/>
              <Route path='/task/:id' component={TaskDetails}/>
            </Switch>
          </BrowserRouter>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log("state 1")
  console.log(state)
  return {
    firebaseUser: state.firebase.auth
  }
}

export default connect(mapStateToProps)(App);
