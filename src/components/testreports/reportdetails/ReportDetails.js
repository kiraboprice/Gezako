import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'
import {setPrevUrl} from "../../../store/actions/authActions";
import {downloadReport, getReport} from "../../../store/actions/reportActions";

import '../reportdetails/reportdetails.css';


const ReportDetails = (props) => {
  const {auth, setPrevUrl, report, getReport, downloadReport, reportDownload} = props;
  if (!auth.uid) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  const id = props.match.params.id;
  const pathName = props.location.pathname;
  let phase;
  if(pathName.includes('development')){
    phase = 'development'
  } else if (pathName.includes('completed')) {
    phase = 'completed'
  }

  getReport(id, phase);

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

const mapStateToProps = (state) => {
  console.log('state in Report Details');
  console.log(state);
  let report = null;
  let reportDownload = null;
  if (state.report != null) {
    report= state.report.getReport;
    reportDownload = state.report.reportDownload;
  }

  return {
    auth: state.firebase.auth,
    // report: report,
    report: state.report.getReport,
  reportDownload: reportDownload
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    downloadReport: (report) => dispatch(downloadReport(report)),
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    getReport: (id, phase) => dispatch(getReport(id, phase))
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ReportDetails)
