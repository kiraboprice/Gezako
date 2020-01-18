import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import {firestoreConnect} from "react-redux-firebase";
import moment from 'moment'
import {Link, Redirect} from 'react-router-dom'
import {setPrevUrl} from "../../../store/actions/authActions";
import {
  downloadReport,
  getReport,
  resetState
} from "../../../store/actions/reportActions";

import '../reportdetails/reportdetails.css';
import StatusCard from "../../status/StatusCard";

import * as StringUtils from "../../../util/StringUtil";
import {getReportPhaseFromPathName} from "../../../util/StringUtil";

const ReportDetails = (props) => {
  const {auth, report} = props;
  const {setPrevUrl, downloadReport, reportDownload, resetState} = props;
  const id = props.match.params.id;
  const pathName = props.location.pathname;

  let phase;
  if(pathName.includes('development')){
    phase = 'development'
  } else if (pathName.includes('completed')) {
    phase = 'completed'
  }

  //clean up after this component is unmounted
  useEffect(() => {
    return function cleanup() {
      resetState()
    };
  },[id]);

  if (!auth.uid) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  // console.log('report');
  // console.log(report);
  if (report) {
    downloadReport(report);

    var htmlDoc = {__html: reportDownload};

    return (
        <div id='report-details-section'>
          <div >
              <span >{report.title}</span>
            <div >
              <div>Uploaded by {report.createdBy}, {moment(report.createdAt.toDate()).calendar()}</div>

              <Link to={`${report.requirementsSpec}`} >
                <button >Product Requirements Spec</button>
              </Link>
              <Link to={`${report.designDoc}`} >
                <button >Technical Design Doc</button>
              </Link>
              <br/>
              <Link to={`/${report.phase}/update-report/${id}`} >
                <button >Update Report</button>
              </Link>

              <StatusCard
                  id = {id}
                  report = {report}
              />

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
  const phase = getReportPhaseFromPathName(ownProps.location.pathname);
  const reports = state.firestore.data.reports;
  const report = reports ? reports[id] : null;

  // console.log('state');
  // console.log(state);

  return {
    auth: state.firebase.auth,
    report: report,
    reportDownload: state.report.reportDownload,
    collection: `${phase}reports`
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    downloadReport: (report) => dispatch(downloadReport(report)),
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    resetState: () => dispatch(resetState())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
      return [
        {
          collection: 'company',
          doc: 'tala',
          subcollections: [{collection: props.collection}],
          storeAs: 'reports'
        }
      ]
    })
)(ReportDetails)
