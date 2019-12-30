import React, { Component } from 'react'
// import firebase from 'firebase/app';
import 'firebase/auth';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

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


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {firebaseAuthLoaded: false}
  }

  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
        this.setState({firebaseAuthLoaded: true})
    })
  }

  render() {

    return (
        <div className="container">
          <Router>
            <Navigation />
            <SidePanel />
            <Switch>
              <Route path='/development' exact component={Development}/>
              <Route path='/create-spock-report' exact component={CreateSpockReport}/>
              <Route path='/tasks' exact component={Tasks}/>
              <Route path='/create-task' exact component={CreateTask}/>
              {this.state.firebaseAuthLoaded
                  ? <React.Fragment>
                          {firebase.auth().currentUser
                              ?
                              <React.Fragment>
                                  <Route path='/' exact component={Home}/>
                              </React.Fragment>

                              : <Route path='/' exact component={Login}/>
                          }
                      </React.Fragment>
                  : <Route path='/' exact component={null}/>
                }
              </Switch>
            </Router>
        </div>
    );
  }
}

export default App;
