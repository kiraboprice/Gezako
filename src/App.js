import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import Login from './components/login/Login';
import Dashboard from './components/dashboard/Dashboard';

import './Assets/Fonts/fonts.css';
import './App.css';
import Development from './components/reports/development/development';

firebase.initializeApp({
  apiKey: "AIzaSyCkXI9xk9GcwQ9IlVC5_NUitcH4n5tiukM",
  authDomain: "gezako-8a7aa.firebaseapp.com",
  // databaseURL: "YOUR_DATABASE_URL",
  projectId: "gezako-8a7aa",
  storageBucket: "gezako-8a7aa.appspot.com"
});


class App extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false}
  }

  // Excutes when the component renders
  componentDidMount () {
    firebase.auth().onAuthStateChanged(user => {
        this.setState({loggedIn: true})
    })
  }

  render() {

    return (
        <div className="container">
          <Router>
            <Switch>
              <Route path='/developments' exact component={Development}/>
              {this.state.loggedIn
                  ? <React.Fragment>
                          {firebase.auth().currentUser
                              ? 
                              <React.Fragment>
                                  <Route path='/' exact component={Dashboard}/>
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