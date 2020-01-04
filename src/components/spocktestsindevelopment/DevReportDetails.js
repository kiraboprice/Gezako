import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import './devreports.css';

const DevReportDetails = (props) => {
  const { auth, report, reportDownload } = props;
  if (!auth.uid) return <Redirect to='/login' />;

  if (report) {
    //download report

    return (
        <div id='report-details-section'>
          <div >
            <div >
              <span >{report.reportTitle}</span>
              <p>{report.reportType}</p>
              <p>{report.service}</p>
            </div>
            <div >
              <div>Uploaded by {report.createdBy}</div>
              <div>{moment(report.createdAt.toDate()).calendar()}</div>
              <div dangerouslySetInnerHTML= {reportDownload} />
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

  const reportDownloads = state.firestore.data.developmentreports; //state.reportdownloads??
  const reportDownload = reportDownloads ? reportDownloads[id] : null;

  return {
    auth: state.firebase.auth,
    report: report,
    reportDownload: reportDownload
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
