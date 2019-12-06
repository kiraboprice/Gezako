import React, { Component } from 'react';

// nodejs library that concatenates classes
import classNames from "classnames";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import { Link } from 'react-router-dom';
import firebase from 'firebase';

//core components
import Footer from "components/Footer/Footer.js";

import {SidePanel} from './sidePanel';

// sections for this page
import SectionNavbars from "views/Sections/SectionNavbars.js";
import ReportsTable from "./Sections/ReportsTable";
import SideBar from "../../components/SideBar/SideBar";

//styles
import styles from "assets/jss/material-kit-react/views/spockReportsPage.js";

const useStyles = makeStyles(styles);

class SpockReportsPage extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('spock-reports');
    this.unsubscribe = null;
    this.state = {
      featureReports: [],
      endpointReports: []
    };
  }

  onCollectionUpdate = (querySnapshot) => {
    const featureReports = [];
    const endpointReports = [];
    querySnapshot.forEach((doc) => {
      const { service, reportType, reportTitle, feature, fileDownLoadUrl } = doc.data();
      if(reportType === "feature"){
        featureReports.push({
          key: doc.id,
          doc, // DocumentSnapshot
          service,
          reportTitle,
          feature,
          fileDownLoadUrl
        });
      }

      if(reportType === "endpoint"){
        endpointReports.push({
          key: doc.id,
          doc, // DocumentSnapshot
          service,
          reportTitle,
          feature,
          fileDownLoadUrl
        });
      }

    });
    this.setState({
      featureReports,
      endpointReports
    });
  }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
       <div style={{position: 'relative'}}>
          {/*<div>*/}
          {/*<div className={classNames(classes.main, classes.mainRaised)}>*/}
          <SectionNavbars />
          <SidePanel/>
          {/*</div>*/}

          {/*TODO Add this as one of the buttons in the InfoTable*/}
          {/*<h4><Link to="/create" class="btn btn-primary">Add Report</Link></h4>*/}

          <ReportsTable reports={this.state.featureReports} title={'Features'}/>
          <br/>
          <br/>
         <ReportsTable reports={this.state.endpointReports} title={'Endpoints'}/>
          <Footer />
        </div>

    );
  }

}


{/*<tbody>*/}
{/*{this.state.reports.map(report =>*/}
      {/*<tr>*/}
        {/*<td>{report.feature}</td>*/}
        {/*<td><a href = {report.fileDownLoadUrl}>Report</a></td>*/}
        {/*/!*TODO we could have the utc time displayed here as text for "report"*!/*/}
      {/*</tr>*/}
  {/*)}*/}
{/*</tbody>*/}
export default SpockReportsPage;
