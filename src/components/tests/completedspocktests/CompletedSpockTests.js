import React, {useEffect, useState} from 'react'

import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'

import './completedtests.css';

import {compose} from "redux";
import penIcon from "../../../assets/Icons/pen.png";
import SpockTest from "../SpockTest";
import LoadingScreen from "../../loading/LoadingScreen";

import createReportIcon from "../../../assets/Icons/create.png";
import {
  getCompletedEndpointReportsByService,
  getCompletedFeatureReportsByService,
  getServiceStats,
  resetCreateTestSuccess,
  resetGetCompletedEndpointReportsByService,
  resetGetCompletedFeatureReportsByService,
  resetGetserviceStats,
  unsubscribeGetCompletedEndpointReportsByService,
  unsubscribeGetCompletedFeatureReportsByService,
  unsubscribeGetServiceStats
} from "../../../store/actions/reportActions";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";
import NoReportsScreen from "../../noreports/NoReportsScreen";
import {setPrevUrl} from "../../../store/actions/authActions";
import {getFirstNameFromFullName} from "../../../util/StringUtil";
import moment from "moment";
import ServiceStatsDialog from "./servicestats/ServiceStatsDialog";

const CompletedSpockTests = (props) => {
  const phase = 'completed';
  const [showStatsDialog, setShowStatsDialog] = useState();

  //variables
  const {user, completedFeatureReports, endpointReports, service, serviceStats} = props;

  //actions
  const { setPrevUrl } = props;

  const {getServiceStats, unsubscribeGetServiceStats, resetGetServiceStats} = props;
  const {getFeatureReports, unsubscribeGetFeatureReports, resetGetFeatureReports} = props;
  const {getEndpointReports, unsubscribeGetEndpointReports, resetGetEndpointReports} = props;

  useEffect(() => {
    getServiceStats(service);
    getFeatureReports(phase, service);
    getEndpointReports(phase, service);

    return function cleanup() {
      unsubscribeGetServiceStats(service);
      resetGetServiceStats();

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

  if (!user) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  function setShowStatsDialogToTrue() {
    setShowStatsDialog(true);
  }

  function setShowStatsDialogToFalse() {
    setShowStatsDialog(false);
  }

  return (
      <div id='home'>
        <div id='reports-section'>

          {endpointReports || completedFeatureReports ? null : <LoadingScreen />}

          <Link to={`/completed/upload-report?service=${service}`} >
            <div id="create-new-item" style={{background: "#ffeead"}}> <img src={createReportIcon} alt="Create a report" /> </div>
          </Link>

          {
            serviceStats?
                <div id="status-card">
                  <div id="report-stats-titles">
                    Total number of {service} tests
                  </div>
                  <div id="report-stats-number-of-tests">
                    {serviceStats? serviceStats.numberOfTests : null}
                  </div>
                  <div id="report-stats-titles">
                    Code Coverage. Last updated: {serviceStats.coverageUpdatedAt? moment(serviceStats.coverageUpdatedAt.toDate()).calendar() : ''}  by {serviceStats.coverageUpdatedBy? getFirstNameFromFullName(serviceStats.coverageUpdatedBy.displayName) : ''}
                  </div>
                  <div id="report-stats-code-coverage">
                    <span id="report-stats-coverage-titles">Class:</span>
                    <span>{serviceStats.classCoverage}</span>
                  </div>
                  <div id="report-stats-code-coverage">
                    <span id="report-stats-coverage-titles">Method:</span>
                    <span>{serviceStats.methodCoverage}</span>
                  </div>
                  <div id="report-stats-code-coverage">
                    <span id="report-stats-coverage-titles">Line:</span>
                    <span>{serviceStats.lineCoverage}</span>
                  </div>

                  <div id='service-spec'>
                    <a href= {serviceStats.serviceSpec} target='_blank'>
                      {serviceStats.serviceSpec? 'Service Spec' : 'No Service Spec Added'}
                    </a>
                  </div>

                  <div id="update-status-options" style={{marginTop : '20px'}}>
                    <button onClick={setShowStatsDialogToTrue}>Update<img src={penIcon} alt="Update Service Info"/> </button>
                  </div>

                </div> :

                <div id="update-status-options" style={{marginTop : '20px'}}>
                  <button onClick={setShowStatsDialogToTrue}>Update<img src={penIcon} alt="Update Service Info"/> </button>
                </div>
          }


          {reportsAvailable ? false : <NoReportsScreen
              service = {service}
              phase = {phase}
          />
          }

          <div id='features-reports'>
            <h4>Features</h4>
            Sorted by Title
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='service'>Service</div>
              <div id='title'>Title</div>
              <div id='title'># of tests</div>
              <div id='title'>Created At</div>
              <div id='title'>Updated At</div>
              <div id='end-column'>Created By</div>
            </div>
            { completedFeatureReports && completedFeatureReports.map(report => { //todo add the index back here!
                return (
                    <div>
                      {/*<div key={index}>*/}
                      <Link to={'/completed/test/' + report.id} key={report.id}>
                        <SpockTest
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
            Sorted by Title
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='service'>Service</div>
              <div id='title'>Title</div>
              <div id='title'># of tests</div>
              <div id='title'>Created At</div>
              <div id='title'>Updated At</div>
              <div id='end-column'>Created By</div>
            </div>
            { endpointReports && endpointReports.map(report => { //todo add the index back here!
              return (
                  <div>
                    {/*<div key={index}>*/}
                    <Link to={'/completed/test/' + report.id} key={report.id}>
                      <SpockTest
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

        <ServiceStatsDialog
            showDialog = {showStatsDialog}
            setDialogStateToFalse = {setShowStatsDialogToFalse}
            service = {service}
            serviceStats = {serviceStats? serviceStats : null}
        />
      </div>
  )

};

const mapStateToProps = (state, ownProps) => {
  // console.log("STATE---------", state);
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
    serviceStats: state.report.serviceStats,
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

    getServiceStats: (service) => dispatch(getServiceStats(service)),
    unsubscribeGetServiceStats: (service) => dispatch(unsubscribeGetServiceStats(service)),
    resetGetServiceStats: () => dispatch(resetGetserviceStats()),

    //alerts
    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message)),
    resetCreateReportSuccess: (message) => dispatch(resetCreateTestSuccess(message)),
  };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps))(CompletedSpockTests)
