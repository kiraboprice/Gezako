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
  getCoverage, getFeatureReports,
  getReportStats,
  resetCreateReportSuccess,
  resetGetCoverage, resetGetFeatureReports,
  resetGetReportStats, unsubscribeGetCoverage, unsubscribeGetFeatureReports,
  unsubscribeGetReportStats
} from "../../../store/actions/reportActions";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";
import CoverageDialog from "./coverage/CoverageDialog";

const CompletedSpockTests = (props) => {
  const [showCoverageDialog, setShowCoverageDialog] = useState();

  //variables
  const {auth, featureReports, endpointReports, service, reportStats, coverage} = props;

  //actions
  const {getFeatureReports, unsubscribeGetFeatureReports, resetGetFeatureReports} = props;
  const {getReportStats, unsubscribeGetReportStats, resetGetReportStats} = props;
  const {getCoverage, unsubscribeGetCoverage, resetGetCoverage} = props;

  useEffect(() => {
    getReportStats(service);
    getCoverage(service);
    getFeatureReports('completed', service);
    return function cleanup() {
      unsubscribeGetReportStats(service);
      resetGetReportStats();

      unsubscribeGetCoverage(service);
      resetGetCoverage();

      unsubscribeGetFeatureReports(service);
      resetGetFeatureReports();
    };
  }, [service]);

  if (!auth.uid) {return <Redirect to='/login'/>}

  function setShowCoverageDialogToTrue() {
    setShowCoverageDialog(true);
  }

  function setShowCoverageDialogToFalse() {
    setShowCoverageDialog(false);
  }

  console.log('featureReports---', featureReports);
  return (
      <div id='home'>
        <div id='reports-section'>

          {featureReports ? null : <LoadingScreen />}

          <Link to={'/completed/upload-report'} >
            <div id="create-new-report" > <img src={createReportIcon} alt="Create a report" /> </div>
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

            <div id="update-status-options">
              <button onClick={setShowCoverageDialogToTrue}>Update Coverage <img src={penIcon} alt="Update Coverage"/> </button>
            </div>
          </div>

          <div id='features-reports'>
            <h4>Features</h4>
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='service'>Service</div>
              <div id='title'>Title</div>
              <div id='title'># of tests</div>
              <div id='title'>Created By</div>
              <div id='end-column'>Created At</div>
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
              <div id='title'>Created By</div>
              <div id='end-column'>Created At</div>
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
    endpointReports: state.firestore.ordered.endpointReports,
    collection: 'completedreports',
    service: getServiceNameFromPathName(ownProps.location.pathname),

    reportStats: state.report.reportStats,

    coverage: state.report.coverage
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    getFeatureReports: (phase, service) => dispatch(getFeatureReports(phase, service)),
    unsubscribeGetFeatureReports: (service) => dispatch(unsubscribeGetFeatureReports(service)),
    resetGetFeatureReports: () => dispatch(resetGetFeatureReports()),

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
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
      return [
        {
          collection: 'company',
          doc: 'tala',
          subcollections: [{collection: props.collection}],
          where: [
            ['type', '==', 'endpoint'],
            ['service', '==', props.service]
          ],
          storeAs: 'endpointReports'
        }
      ]
    })
)(CompletedSpockTests)
