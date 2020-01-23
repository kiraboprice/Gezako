import React, {useEffect, useState} from 'react'
import 'firebase/auth';
import 'firebase/firestore';
import {connect} from 'react-redux';
import {BrowserRouter, Link, Redirect} from 'react-router-dom'

import './completedspockreports.css';

import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import penIcon from "../../../assets/Icons/pen.png";
import Report from "../Report";
import LoadingScreen from "../../loading/LoadingScreen";

import createReportIcon from "../../../assets/Icons/create.png";
import {
  getCoverage,
  getEndpointReports,
  getFeatureReports,
  getReportStats,
  resetCreateReportSuccess,
  resetGetCoverage, resetGetEndpointReports,
  resetGetFeatureReports,
  resetGetReportStats,
  unsubscribeGetCoverage,
  unsubscribeGetEndpointReports,
  unsubscribeGetFeatureReports,
  unsubscribeGetReportStats
} from "../../../store/actions/reportActions";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";
import CoverageDialog from "./coverage/CoverageDialog";
import NoReportsScreen from "../../noreports/NoReportsScreen";
import {setPrevUrl} from "../../../store/actions/authActions";

const CompletedSpockTests = (props) => {
  const phase = 'completed';
  const [showCoverageDialog, setShowCoverageDialog] = useState();

  //variables
  const {auth, featureReports, endpointReports, service, reportStats, coverage} = props;

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
    if(featureReports && endpointReports) {
      if (featureReports.length === 0 && endpointReports.length === 0){
        setReportsAvailable(false);
      } else {
        setReportsAvailable(true);
      }
    }
    return function cleanup() {
      setReportsAvailable(true);
    };
  }, [props]);

  if (!auth.uid) {
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

          {endpointReports || featureReports ? null : <LoadingScreen />}

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
              Code Coverage
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
            { featureReports && featureReports.map(report => { //todo add the index back here!
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
  //todo extract this to StringUtils
  function getServiceNameFromPathName(pathname) {
    const service = pathname.split('/completed/')[1];

    return service
  }
  return {
    auth: state.firebase.auth,
    featureReports: state.report.featureReports,
    endpointReports: state.report.endpointReports,

    service: getServiceNameFromPathName(ownProps.location.pathname),

    reportStats: state.report.reportStats,
    coverage: state.report.coverage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),

    getFeatureReports: (phase, service) => dispatch(getFeatureReports(phase, service)),
    unsubscribeGetFeatureReports: (phase, service) => dispatch(unsubscribeGetFeatureReports(phase, service)),
    resetGetFeatureReports: () => dispatch(resetGetFeatureReports()),

    getEndpointReports: (phase, service) => dispatch(getEndpointReports(phase, service)),
    unsubscribeGetEndpointReports: (phase, service) => dispatch(unsubscribeGetEndpointReports(phase, service)),
    resetGetEndpointReports: () => dispatch(resetGetEndpointReports()),

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
