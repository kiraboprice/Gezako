import React from 'react'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { compose } from 'redux'
import moment from 'moment'
import { Redirect } from 'react-router-dom'
import { downloadReport } from "../../store/actions/reportActions";

import './reportdetails.css';

/**
 * NOTE: Couldnt get the correct collectionUrl to use with firestoreConnect. Created two different classes instead:
 * CompleteReportDetails and DevelopmentReportDetails. Will revisit this later!
 */

let collectionUrl = getCollectionUrl();
const ReportDetails = (props) => {
  // if((window.location.href).includes('completed') ){
  //   collectionUrl = 'completedreports'
  // } else if((window.location.href).includes('development') ){
  //   collectionUrl = 'developmentreports'
  // }
  const { collectionUrlProp, auth, report, downloadReport, reportDownload} = props;
  if (!auth.uid) return <Redirect to='/login' />;

  collectionUrl = collectionUrlProp;

  console.log('in ReportDetails');
  console.log(collectionUrl);

  if (report) {
    console.log("Report Sent");
    console.log(report);
    downloadReport(report);
    // downloadReport({url: 'url'});

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
              <div>{moment(report.createdAt.toDate()).calendar()}</div>
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
  console.log('state in report details');
  console.log(state);
  const id = ownProps.match.params.id;
  const reports =  getCollectionUrl() == 'completedreports'
      ?state.firestore.data.completedreports
      :state.firestore.data.developmentreports;

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
    downloadReport: () => dispatch(downloadReport())
  }
};

function getCollectionUrl(){
  if((window.location.href).includes('completed') ){
    return 'completedreports'
  } else if((window.location.href).includes('development') ){
    return 'developmentreports'
  }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      {
        collection: 'company',
        doc: 'tala',
        subcollections: [{ collection: collectionUrl}],
        storeAs: collectionUrl
      }
    ])
)(ReportDetails)
