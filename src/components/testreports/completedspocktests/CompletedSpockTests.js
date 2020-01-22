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
  getReportStats,
  resetCreateReportSuccess,
  resetGetCoverage,
  resetGetReportStats, unsubscribeGetCoverage,
  unsubscribeGetReportStats
} from "../../../store/actions/reportActions";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";
import CoverageDialog from "./coverage/CoverageDialog";
import CustomSnackbar from "../../snackbar/CustomSnackbar";

const CompletedSpockTests = (props) => {
  const [showCoverageDialog, setShowCoverageDialog] = useState();

  //variables
  const {auth, featureReports, endpointReports, service, reportStats, coverage} = props;

  //actions
  const {getReportStats, unsubscribeGetReportStats, resetGetReportStats} = props;
  const {getCoverage, unsubscribeGetCoverage, resetGetCoverage} = props;

  useEffect(() => {
    getReportStats(service);
    return function cleanup() {
      unsubscribeGetReportStats(service);
      resetGetReportStats();
    };
  }, []);

  useEffect(() => {
    getCoverage(service);
    return function cleanup() {
      unsubscribeGetCoverage(service);
      resetGetCoverage();
    };
  }, []);

  //remove listeners and reset stats in props
  useEffect(() => {
    return function cleanup() {
      // unsubscribeGetReportStats(service);
      // resetGetReportStats();
    };
  }, [props]);

  if (!auth.uid) {return <Redirect to='/login'/>}

  function setShowCoverageDialogToTrue() {
    console.log(`setting show coverage dialog to true`);
    setShowCoverageDialog(true);
  }

  function setShowCoverageDialogToFalse() {
    console.log(`setting show coverage dialog to false`);
    setShowCoverageDialog(false);
  }
  console.log('showCoverageDialog in Completed Spokc Tests', showCoverageDialog);

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
              Class: {coverage? coverage.class : ''}
            </div>
            <div id="report-stats-code-coverage">
              Method: {coverage? coverage.method : ''}
            </div>
            <div id="report-stats-code-coverage">
              Line: {coverage? coverage.line : ''}
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
  console.log(state);
  return {
    auth: state.firebase.auth,
    featureReports: state.firestore.ordered.featureReports,
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
            ['type', '==', 'feature'],
            ['service', '==', props.service]
          ],
          storeAs: 'featureReports'
        }
      ]
    }),
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
