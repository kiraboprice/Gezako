import React, {useEffect} from 'react'
import 'firebase/auth';
import 'firebase/firestore';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'

import './completedspockreports.css';

import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import penIcon from "../../../assets/Icons/pen.png";
import Report from "../Report";
import LoadingScreen from "../../loading/LoadingScreen";

import createReportIcon from "../../../assets/Icons/create.png";
import {
  getReportStats,
  resetCreateReportSuccess, resetGetReportStats, unsubscribeGetReportStats
} from "../../../store/actions/reportActions";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";

const CompletedSpockTests = (props) => {
  //variables
  const {auth, featureReports, endpointReports, service, reportStats} = props;

  //actions
  const {getReportStats, unsubscribeGetReportStats, resetGetReportStats} = props;

  useEffect(() => {
    getReportStats(service);
    return function cleanup() {
    };
  }, []);

  //remove listeners and reset stats in props
  useEffect(() => {
    console.log('PROPSSSS', props);
    return function cleanup() {
      // unsubscribeGetReportStats(service);
      // resetGetReportStats();
    };
  }, [props]);

  if (!auth.uid) {return <Redirect to='/login'/>}

  return (
      <div id='home'>
        <div id='reports-section'>

          {featureReports ? null : <LoadingScreen />}

          <Link to={'/completed/upload-report'} >
            <div id="create-new-report" > <img src={createReportIcon} alt="Create a report" /> </div>
          </Link>

          <div id="status-card">
            <div id="status-description" style={{paddingTop: "25px"}}>
              Total number of {service} tests: {reportStats? reportStats.numberOfTests : null}
            </div>
            <div id="status-updated">
              Code Coverage
              <br/>
              Class, %:
              Method, %:
              Line, %:
            </div>
            <div id="update-status-options">
              <button >Update Coverage <img src={penIcon} alt="Update Coverage" /> </button>
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

    //report stats
    reportStats: state.report.reportStats
  }
};

const mapDispatchToProps = dispatch => {
  return {
    // setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    getReportStats: (service) => dispatch(getReportStats(service)),
    unsubscribeGetReportStats: (service) => dispatch(unsubscribeGetReportStats(service)),
    resetGetReportStats: () => dispatch(resetGetReportStats()),

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
