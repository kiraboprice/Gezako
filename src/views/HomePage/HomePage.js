import React, { Component } from 'react';

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Link } from 'react-router-dom';
import 'App.css';
import firebase from 'firebase';

//core components
import Footer from "components/Footer/Footer.js";

// sections for this page
import SectionNavbars from "views/Sections/SectionNavbars.js";

import logo from 'logo.svg';
import withFirebaseAuth from 'react-with-firebase-auth'

import styles from "assets/jss/material-kit-react/views/components.js";

const useStyles = makeStyles(styles);

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('reports');
    this.unsubscribe = null;
    this.state = {
      reports: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const reports = [];
    querySnapshot.forEach((doc) => {
      const { service, feature, fileDownLoadUrl } = doc.data();
      reports.push({
        key: doc.id,
        doc, // DocumentSnapshot
        service,
        feature,
        fileDownLoadUrl
      });
    });
    this.setState({
      reports
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    // const classes = useStyles();
    return (
        <div>

          {/*<div className={classNames(classes.main, classes.mainRaised)}>*/}
            <div>
            <SectionNavbars />
          </div>

          <div >
            <div >
              <h3 >
                Spock Reports
              </h3>
            </div>
            <div >
              <h4><Link to="/create" class="btn btn-primary">Add Report</Link></h4>
              <table >
                <thead>
                <tr>
                  <th>Service</th>
                  <th>Feature</th>
                  <th>Spock Report</th>
                </tr>
                </thead>
                <tbody>
                {this.state.reports.map(report =>
                    <tr>
                      <td>{report.service}</td>
                      <td>{report.feature}</td>
                      <td><a href = {report.fileDownLoadUrl}>Report</a></td>
                      {/*TODO we could have the utc time displayed here as text for "report"*/}
                    </tr>
                )}
                </tbody>
              </table>
            </div>
          </div>

          <Footer />
        </div>

    );
  }

  // render() {
  //   const {
  //     user,
  //     signOut,
  //     signInWithGoogle,
  //   } = this.props;
  //   return (
  //     <div class="container">
  //       <div class="panel panel-default">
  //         <div class="panel-heading">
  //           <h3 class="panel-title">
  //             Gezako
  //           </h3>
  //         </div>
  //               {/*<img src={logo} className="App-logo" alt="logo" />*/}
  //               {
  //                 user
  //                     ? <p>Hello, {user.displayName}</p>
  //                     : <p>Please sign in.</p>
  //               }
  //               {
  //                 user
  //                     ? <button onClick={signOut}>Sign out</button>
  //                     : <button onClick={signInWithGoogle}>Sign in with Google</button>
  //               }
  //       </div>
  //     </div>
  //   );
  // }
}


// const firebaseAppAuth = firebase.auth();
// const providers = {
//   googleProvider: new firebase.auth.GoogleAuthProvider(),
// };
//
// export default withFirebaseAuth({
//   providers,
//   firebaseAppAuth,
// })(HomePage);

export default HomePage;
