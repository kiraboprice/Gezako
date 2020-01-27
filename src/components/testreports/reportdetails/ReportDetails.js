import React, {useEffect, useState} from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {firestoreConnect} from "react-redux-firebase";
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'
import {setPrevUrl} from "../../../store/actions/authActions";
import {
  downloadReport, getReport, resetGetReport, resetReportDownload, unsubscribeGetReport
} from "../../../store/actions/reportActions";

import '../reportdetails/reportdetails.css';
import StatusCard from "../../status/StatusCard";

import {getReportPhaseFromPathName} from "../../../util/StringUtil";

const ReportDetails = (props) => {
  const {user, report} = props;

  const {setPrevUrl, downloadReport, reportDownload, resetReportDownload} = props;
  const id = props.match.params.id;

  //clean up after this component is unmounted
  useEffect(() => {
    return function cleanup() {
      resetReportDownload()
    };
  },[id]);

  const [displayDevelopmentFields, setDisplayDevelopmentFields] = useState('');
  const [displayCompletedFields, setDisplayCompletedFields] = useState('');
  useEffect(() => {
    const phase = getReportPhaseFromPathName(props.location.pathname);
    if(phase === 'development') {
      setDisplayDevelopmentFields('block');
      setDisplayCompletedFields('none');
    } else if (phase === 'completed') {
      setDisplayDevelopmentFields('none');
      setDisplayCompletedFields('block');
    }

    props.getReport(props.match.params.id);

    return function cleanup() {
      unsubscribeGetReport(props.match.params.id);
      resetGetReport();
    };
  },[id]);

  if (!user.uid) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  // console.log('report');
  function goToExternalLink(productSpec) {
    window.open(productSpec) //open new tab
    // window.location.replace(productSpec) //stay on page
  }

  if (report) {
    if(report.toString == 'GET_REPORT_ERROR_NOT_EXISTS'.toString) {
      return (
          <div id='report-details-section'>
            <p>Report does not exist.</p>
          </div>
      )
    }
    else {
      downloadReport(report);

      var htmlDoc = {__html: reportDownload};

      return (
          <div id='report-details-section'>
            <div >
              <div id="report-details-positioning">
                <div id="section1">
                  <span id="report-title-section1">{report.title}</span>
                  <div id="uploaded-by">Uploaded by {report.createdBy}, {moment(report.createdAt.toDate()).calendar()}</div>

                  {report.assignedTo?<div id="uploaded-by" style={{display: displayDevelopmentFields}}>Assigned to {report.assignedTo.displayName}</div> : null }

                  <button id="report-button-section1"
                          style={{background: "#ff6f69", marginRight: "10px"}}
                          onClick={()=> goToExternalLink(report.productSpec)}>
                    Product Requirements Spec
                  </button>

                  <button id="report-button-section1"
                          style={{background: "#ffeead"}}
                          onClick={()=> goToExternalLink(report.techSpec)}>
                    Technical Design Doc
                  </button>

                  <br/>
                  <Link to={`/${report.phase}/update-report/${id}`} >
                    <button id="report-button-section1" style={{background: "#f0f0f0", marginTop: "25px"}}>Update Report</button>
                  </Link>
                </div>
                <div id="section2">
                  <StatusCard
                      id = {id}
                      report = {report}
                  />
                </div>


              </div>

              <div id="document-container">
                <div dangerouslySetInnerHTML= {htmlDoc} />
              </div>
            </div>
          </div>
      )
    }
  }
  else {
    return (
        <div id='report-details-section'>
          <p>Loading report...</p>
        </div>
    )
  }

};

const mapStateToProps = (state) => {
  // console.log('state');
  // console.log(state);

  return {
    user: state.auth.user,
    report: state.report.getReport,
    reportDownload: state.report.reportDownload,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReport: (id) => dispatch(getReport(id)),
    unsubscribeGetReport: (id) => dispatch(unsubscribeGetReport(id)),
    resetGetReport: () => dispatch(resetGetReport()),

    downloadReport: (report) => dispatch(downloadReport(report)),
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    resetReportDownload: () => dispatch(resetReportDownload())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps))
(ReportDetails)
