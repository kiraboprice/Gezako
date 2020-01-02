import React, {Component} from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import Report from "../report/Report";
import {Link} from "react-router-dom";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {firestoreConnect} from "react-redux-firebase";

import {BASE_DOCUMENT} from "../../constants/Constants";

const SpockTestsInDevelopment = (props) => {
  const { reports } = props;

  return (
        <div id='reports-section'>
          <div id='features-reports'>
            <h4>Development</h4>
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='head-start' className='service'>Service</div>
              <div id='head'>Title</div>
              <div id='head-end'>Report</div>
            </div>
            { reports && reports.map(report => {
                return (
                    <div>
                      <Link to={'/report/' + report.id} key={report.id}>
                        <Report
                            service={report.service}
                            title={report.feature}
                            report={report.fileDownLoadUrl}
                        />
                      </Link>
                      <hr></hr>
                    </div>
                )
              }) }
          </div>
        </div>

  )
};

const mapStateToProps = (state) => {
  console.log("------")
  console.log(state)
  return {
    auth: state.firebase.auth,
    reports: state.firestore.ordered.reports
  }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {collection: 'reports'} //todo add BASE_DOCUMENT here! (after adding the create dev report page!) Also change this to dev rports now!!
    ])
)(SpockTestsInDevelopment)
