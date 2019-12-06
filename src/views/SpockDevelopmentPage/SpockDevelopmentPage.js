import React, { Component } from 'react';

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Link } from 'react-router-dom';
import firebase from 'firebase';

//core components
import Footer from "components/Footer/Footer.js";

// sections for this page
import SectionNavbars from "views/Sections/SectionNavbars.js";

import logo from 'logo.svg';
import withFirebaseAuth from 'react-with-firebase-auth'

import styles from "assets/jss/material-kit-react/views/components.js";
import DevelopmentReportsTable from "./Sections/DevelopmentReportsTable";

const useStyles = makeStyles(styles);

class SpockReportsPage extends Component {
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
          <SectionNavbars />
          {/*</div>*/}

          <DevelopmentReportsTable reports={this.state.reports}/>
          <Footer />
        </div>

    );
  }

}


{/*<tbody>*/}
{/*{this.state.reports.map(report =>*/}
      {/*<tr>*/}
        {/*<td>{report.service}</td>*/}
        {/*<td>{report.feature}</td>*/}
        {/*<td><a href = {report.fileDownLoadUrl}>Report</a></td>*/}
        {/*/!*TODO we could have the utc time displayed here as text for "report"*!/*/}
      {/*</tr>*/}
  {/*)}*/}
{/*</tbody>*/}
export default SpockReportsPage;
