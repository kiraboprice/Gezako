import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import './devreports.css';

const DevReportDetails = (props) => {
  const { auth, report } = props;
  if (!auth.uid) return <Redirect to='/login' />;

  if (report) {
    return (
        <div id='report-details-section'>
          <div >
            <div >
              <span >{report.title}</span>
              <p>{report.content}</p>
            </div>
            <div >
              <div>Uploaded by {report.createdBy}</div>
              <div>{moment(report.createdAt.toDate()).calendar()}</div>
            </div>
          </div>
        </div>
    )
  } else {
    return (
        <div id='report-details-section'>
          <p>Loading report...</p>
        </div>
    )
  }
};

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const reports = state.firestore.data.developmentreports;
  const report = reports ? reports[id] : null;
  return {
    auth: state.firebase.auth,
    report: report
  }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {
        collection: 'company',
        doc: 'tala',
        subcollections: [{ collection: 'developmentreports' }],
        storeAs: 'developmentreports'
      }
    ])
)(DevReportDetails)
