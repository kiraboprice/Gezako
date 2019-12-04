import React, {Component} from 'react';
import firebase from './Firebase';
// import firebase from 'firebase';
import withFirebaseAuth from 'react-with-firebase-auth'
import LandingPage from "./views/LandingPage/LandingPage";
import SpockReportsPage from "./views/SpockReportsPage/SpockReportsPage";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      user,
      signOut,
      signInWithGoogle,
    } = this.props;
    return (
        <div class="container">
          <div class="panel panel-default">
            <div class="panel-heading">
            </div>
            {
              user
                  ? <SpockReportsPage/>
                  : <LandingPage/>
            }
          </div>
        </div>
    );
  }
}

const firebaseAppAuth = firebase.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
