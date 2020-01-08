import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'
import {downloadReport} from "../../../store/actions/reportActions";

import '../../testreports/reportdetails.css';

/**
 * NOTE: Refactor so we can only use one ReportDetails class
 */

const DevelopmentReportDetails = (props) => {
  const {auth, report, downloadReport, reportDownload} = props;
  if (!auth.uid) return <Redirect to='/login' />;

  const id = props.match.params.id;

  if (report) {
    downloadReport(report);

    var htmlDoc = {__html: reportDownload};

    return (
        <div id='report-details-section'>
          <div >
            <div >
              <span >{report.title}</span>
              <p>Type: {report.type}</p>
              <p>Service: {report.service}</p>
            </div>
            <div >
              <div>Uploaded by {report.createdBy}</div>
              <div>{moment(report.createdAt.toDate()).calendar()}</div>

              <Link to={'/development/update-report/' + id} >
                <button >Update Report</button>
              </Link>

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
  const id = ownProps.match.params.id;
  const reports =  state.firestore.data.developmentreports;

  const report = reports ? reports[id] : null;

  let reportDownload = null;
  if (state.report != null) {
    reportDownload = state.report.reportDownload;
  }

  return {
    auth: state.firebase.auth,
    report: report,
    reportDownload: reportDownload
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    downloadReport: (report) => dispatch(downloadReport(report))
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      {
        collection: 'company',
        doc: 'tala',
        subcollections: [{ collection: 'developmentreports'}],
        storeAs: 'developmentreports'
      }
    ])
)(DevelopmentReportDetails)
