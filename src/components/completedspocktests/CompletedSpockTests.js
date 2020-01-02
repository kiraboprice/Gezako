import React, {Component} from 'react'
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom'

import './spockreports.css';
import Report from "../report/Report";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const CompletedSpockTests = (props) => {
  const {auth} = this.props;
  if (!auth.uid) {
    return <Redirect to='/login'/>
  }

  return (
      <div id='home'>

        <div id='reports-section'>
          <div id='features-reports'>
            <h4>Features</h4>
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='head-start'>Title</div>
              <div id='head-end'>Report</div>
            </div>
            {
              this.state.featureReports.map((report, index) => {
                return (
                    <div key={index}>
                      <Report
                          title={report.data().reportTitle}
                          report={report.data().fileDownLoadUrl}
                      />
                      <hr></hr>
                    </div>
                )
              })
            }
          </div>

          <div id='endpoints-reports'>
            <h4>Endpoints</h4>
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='head-start'>Title</div>
              <div id='head-end'>Report</div>
            </div>
            {
              this.state.endpointReports && this.state.endpointReports.map(
                  (report, index) => {
                    return (
                        <div key={index}>
                          <Report
                              title={report.data().reportTitle}
                              report={report.data().fileDownLoadUrl}
                          />
                          <hr></hr>
                        </div>
                    )
                  })
            }
          </div>
        </div>
      </div>
  )

};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    spockreports: state.firestore.ordered.spockreports
  }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {collection: 'spock-reports'} //todo add BASE_DOCUMENT here! (after adding the create dev report page!) Also change this to dev rports now!!
    ])
)(CompletedSpockTests)

//.collection('spock-reports').where('reportType', '==', 'feature')
//.collection('spock-reports').where('reportType', '==', 'endpoint')
