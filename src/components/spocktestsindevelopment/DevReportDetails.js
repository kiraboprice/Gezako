import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router-dom'

import {downloadDevReport} from "../../store/actions/developmentReportActions";

import './devreports.css';

const DevReportDetails = (props) => {
  const { auth, report2, downloadDevReport, reportDownload} = props;
  if (!auth.uid) return <Redirect to='/login' />;

  const report = {url: 'url'}
  if (report) {
    //download report
    console.log("REPORT 1");
    console.log(report);
    downloadDevReport(report);

    var htmlDoc = {__html: reportDownload};

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
              {/*<div>{moment(report.createdAt.toDate()).calendar()}</div>*/}
              <div dangerouslySetInnerHTML= {htmlDoc} />
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
  console.log('state in dev report details');
  console.log(state);
  const id = ownProps.match.params.id;
  const reports = state.firestore.data.developmentreports;
  const report = reports ? reports[id] : null;

  // const reportDownloads = state.firestore.data.developmentreports; //state.reportdownloads??
  // const reportDownload = reportDownloads ? reportDownloads[id] : null;
  let reportDownload = null;
  if (state.developmentReport != null) {
    reportDownload = state.developmentReport.reportDownload;
  }


  return {
    auth: state.firebase.auth,
    report: report,
    reportDownload: reportDownload
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    downloadDevReport: () => dispatch(downloadDevReport())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      {
        collection: 'company',
        doc: 'tala',
        subcollections: [{ collection: 'developmentreports' }],
        storeAs: 'developmentreports'
      }
    ])
)(DevReportDetails)
