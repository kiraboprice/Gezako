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
import ReportsTable from "./Sections/ReportsTable";
import SideBar from "../../components/SideBar/SideBar";

//styles
import styles from "assets/jss/material-kit-react/views/spockReportsPage.js";

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
    // const classes = useStyles(); //todo need to make this a function component
    return (
       <div style={{position: 'relative'}}>
          {/*<div>*/}
          {/*<div className={classNames(classes.main, classes.mainRaised)}>*/}
          <SectionNavbars />
          {/*</div>*/}

          {/*TODO Add this as one of the buttons in the InfoTable*/}
          {/*<h4><Link to="/create" class="btn btn-primary">Add Report</Link></h4>*/}

          
          <ReportsTable />
          <br/>
          <br/>
          <ReportsTable/>
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
