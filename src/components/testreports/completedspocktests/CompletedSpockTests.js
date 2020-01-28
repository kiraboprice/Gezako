import React, {useEffect, useState} from 'react'

import firebase from "../../../fbConfig";
import firestore from "../../../fbConfig";

import {connect} from 'react-redux';
import {BrowserRouter, Link, Redirect} from 'react-router-dom'

import './completedspockreports.css';

import {compose} from "redux";
import penIcon from "../../../assets/Icons/pen.png";
import Report from "../Report";
import LoadingScreen from "../../loading/LoadingScreen";

import createReportIcon from "../../../assets/Icons/create.png";
import {
  getCoverage,
  getCompletedEndpointReportsByService,
  getCompletedFeatureReportsByService,
  getReportStats,
  resetCreateReportSuccess,
  resetGetCoverage, resetGetCompletedEndpointReportsByService,
  resetGetCompletedFeatureReportsByService,
  resetGetReportStats,
  unsubscribeGetCoverage,
  unsubscribeGetCompletedEndpointReportsByService,
  unsubscribeGetCompletedFeatureReportsByService,
  unsubscribeGetReportStats
} from "../../../store/actions/reportActions";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";
import CoverageDialog from "./coverage/CoverageDialog";
import NoReportsScreen from "../../noreports/NoReportsScreen";
import {setPrevUrl} from "../../../store/actions/authActions";
import {getFirstNameFromFullName} from "../../../util/StringUtil";
import moment from "moment";

const CompletedSpockTests = (props) => {
  const phase = 'completed';
  const [showCoverageDialog, setShowCoverageDialog] = useState();

  //variables
  const {user, completedFeatureReports, endpointReports, service, reportStats, coverage} = props;

  //actions
  const { setPrevUrl } = props;

  const {getReportStats, unsubscribeGetReportStats, resetGetReportStats} = props;
  const {getCoverage, unsubscribeGetCoverage, resetGetCoverage} = props;
  const {getFeatureReports, unsubscribeGetFeatureReports, resetGetFeatureReports} = props;
  const {getEndpointReports, unsubscribeGetEndpointReports, resetGetEndpointReports} = props;

  useEffect(() => {
    getReportStats(service);
    getCoverage(service);
    getFeatureReports(phase, service);
    getEndpointReports(phase, service);

    return function cleanup() {
      unsubscribeGetReportStats(service);
      resetGetReportStats();

      unsubscribeGetCoverage(service);
      resetGetCoverage();

      unsubscribeGetFeatureReports(phase, service);
      resetGetFeatureReports();

      unsubscribeGetEndpointReports(phase, service);
      resetGetEndpointReports();
    };
  }, [service]);

  const [reportsAvailable, setReportsAvailable] = useState(true);
  useEffect(() => {
    if(completedFeatureReports && endpointReports) {
      if (completedFeatureReports.length === 0 && endpointReports.length === 0){
        setReportsAvailable(false);
      } else {
        setReportsAvailable(true);
      }
    }
    return function cleanup() {
      setReportsAvailable(true);
    };
  }, [props]);

  if (!user.uid) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  function setShowCoverageDialogToTrue() {
    setShowCoverageDialog(true);
  }

  function setShowCoverageDialogToFalse() {
    setShowCoverageDialog(false);
  }

  return (
      <div id='home'>
        <div id='reports-section'>

          {endpointReports || completedFeatureReports ? null : <LoadingScreen />}

          <Link to={`/completed/upload-report?service=${service}`} >
            <div id="create-new-report" style={{background: "#ffeead"}}> <img src={createReportIcon} alt="Create a report" /> </div>
          </Link>


          <div id="status-card">
            <div id="report-stats-titles">
              Total number of {service} tests
            </div>
            <div id="report-stats-number-of-tests">
              {reportStats? reportStats.numberOfTests : null}
            </div>
            <div id="report-stats-titles">
              Code Coverage. Last updated: {coverage? moment(coverage.updatedAt.toDate()).calendar() : ''}  by {coverage? getFirstNameFromFullName(coverage.updatedBy.displayName) : ''}
            </div>
            <div id="report-stats-code-coverage">
              <span id="report-stats-coverage-titles">Class:</span>
              <span>{coverage? coverage.class : ''}</span>
            </div>
            <div id="report-stats-code-coverage">
              <span id="report-stats-coverage-titles">Method:</span>
              <span>{coverage? coverage.method : ''}</span>
            </div>
            <div id="report-stats-code-coverage">
              <span id="report-stats-coverage-titles">Line:</span>
              <span>{coverage? coverage.line : ''}</span>
            </div>

            <div id="update-status-options" style={{marginTop : '20px'}}>
              <button onClick={setShowCoverageDialogToTrue}>Update Coverage <img src={penIcon} alt="Update Coverage"/> </button>
            </div>
          </div>

          {reportsAvailable ? false : <NoReportsScreen
              service = {service}
              phase = {phase}
          />
          }

          <div id='features-reports'>
            <h4>Features</h4>
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='service'>Service</div>
              <div id='title'>Title</div>
              <div id='title'># of tests</div>
              {/*<div id='title'>Updated At</div>*/}
              <div id='title'>Created At</div>
              <div id='end-column'>Created By</div>
            </div>
            { completedFeatureReports && completedFeatureReports.map(report => { //todo add the index back here!
                return (
                    <div>
                      {/*<div key={index}>*/}
                      <Link to={'/completed/report/' + report.id} key={report.id}>
                        <Report
                            report={report}
                        />
                      </Link>
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
              <div id='service'>Service</div>
              <div id='title'>Title</div>
              <div id='title'># of tests</div>
              {/*<div id='title'>Updated At</div>*/}
              <div id='title'>Created At</div>
              <div id='end-column'>Created By</div>
            </div>
            { endpointReports && endpointReports.map(report => { //todo add the index back here!
              return (
                  <div>
                    {/*<div key={index}>*/}
                    <Link to={'/completed/report/' + report.id} key={report.id}>
                      <Report
                          report={report}
                      />
                    </Link>
                    <hr></hr>
                  </div>
              )
            })
            }

          </div>
        </div>

        <CoverageDialog
            showDialog = {showCoverageDialog}
            setDialogStateToFalse = {setShowCoverageDialogToFalse}
            service = {service}
            coverage = {coverage? coverage : null}
        />
      </div>
  )

};

const mapStateToProps = (state, ownProps) => {
  console.log("STATE---------", state);
  //todo extract this to StringUtils
  function getServiceNameFromPathName(pathname) {
    const service = pathname.split('/completed/')[1];

    return service
  }
  return {
    user: state.auth.user,
    completedFeatureReports: state.report.completedFeatureReports,
    endpointReports: state.report.endpointReports,

    service: getServiceNameFromPathName(ownProps.location.pathname),

    reportStats: state.report.reportStats,
    coverage: state.report.coverage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),

    getFeatureReports: (phase, service) => dispatch(getCompletedFeatureReportsByService(phase, service)),
    unsubscribeGetFeatureReports: (phase, service) => dispatch(unsubscribeGetCompletedFeatureReportsByService(phase, service)),
    resetGetFeatureReports: () => dispatch(resetGetCompletedFeatureReportsByService()),

    getEndpointReports: (phase, service) => dispatch(getCompletedEndpointReportsByService(phase, service)),
    unsubscribeGetEndpointReports: (phase, service) => dispatch(unsubscribeGetCompletedEndpointReportsByService(phase, service)),
    resetGetEndpointReports: () => dispatch(resetGetCompletedEndpointReportsByService()),

    getReportStats: (service) => dispatch(getReportStats(service)),
    unsubscribeGetReportStats: (service) => dispatch(unsubscribeGetReportStats(service)),
    resetGetReportStats: () => dispatch(resetGetReportStats()),

    getCoverage: (service) => dispatch(getCoverage(service)),
    unsubscribeGetCoverage: (service) => dispatch(unsubscribeGetCoverage(service)),
    resetGetCoverage: () => dispatch(resetGetCoverage()),

    //alerts
    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message)),
    resetCreateReportSuccess: (message) => dispatch(resetCreateReportSuccess(message)),
  };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps))(CompletedSpockTests)
