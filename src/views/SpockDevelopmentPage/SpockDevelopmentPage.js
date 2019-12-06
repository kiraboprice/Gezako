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
import {SidePanel} from "../SpockReportsPage/sidePanel";

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
        <div style={{marginTop: '65px'}}>
        <SectionNavbars />
          <SidePanel/>
          <table className="table table-stripe" style={{marginLeft: '250px'}}>
            <thead>
            <tr>
              <th>Service</th>
              <th>Feature</th>
              <th>Report</th>
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

          {/*//todo revert back to this below!*/}
          {/*<DevelopmentReportsTable reports={this.state.reports}/>*/}

          {/*<Footer />*/}
        </div>

    );
  }

}

export default SpockReportsPage;
