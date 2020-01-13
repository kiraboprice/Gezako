import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'
import {setPrevUrl} from "../../../store/actions/authActions";
import {
  downloadReport,
  getReport,
  resetState
} from "../../../store/actions/reportActions";

import '../reportdetails/reportdetails.css';


const ReportDetails = (props) => {
  const {auth, report} = props;
  const {setPrevUrl, getReport, downloadReport, reportDownload, resetState} = props;
  const id = props.match.params.id;
  const pathName = props.location.pathname;

  let phase;
  if(pathName.includes('development')){
    phase = 'development'
  } else if (pathName.includes('completed')) {
    phase = 'completed'
  }

  useEffect(() => {
    getReport(id, phase);

    return function cleanup() {
      resetState()
    };
  },[id]);

  if (!auth.uid) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

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
              <p>Service: {report.phase}</p>
            </div>
            <div >
              <div>Uploaded by {report.createdBy}</div>
              <div>{moment(report.createdAt.toDate()).calendar()}</div>

              <Link to={`/${report.phase}/update-report/${id}`} >
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
  return {
    auth: state.firebase.auth,
    report: state.report.getReport,
    reportDownload: state.report.reportDownload
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    downloadReport: (report) => dispatch(downloadReport(report)),
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    getReport: (id, phase) => dispatch(getReport(id, phase)),
    resetState: () => dispatch(resetState())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ReportDetails)
