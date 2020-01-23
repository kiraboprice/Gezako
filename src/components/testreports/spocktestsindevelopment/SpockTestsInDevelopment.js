import React, {useEffect, useState} from 'react'
import Report from "../Report";
import {Link} from "react-router-dom";
import {compose} from "redux";
import moment from 'moment'
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'
import {firestoreConnect} from "react-redux-firebase";
import {
  downloadReport,
  getCompletedFeatureReportsByService, getReportsInDevelopment,
  resetGetCompletedFeatureReportsByService,
  resetGetReportsInDevelopment,
  unsubscribeGetCompletedFeatureReportsByService, unsubscribeGetReportsInDevelopment
} from "../../../store/actions/reportActions";
import createReportIcon from "../../../assets/Icons/create.png";
import {
  setPrevUrl
} from "../../../store/actions/authActions";
import NoReportsScreen from "../../noreports/NoReportsScreen";

const SpockTestsInDevelopment = (props) => {
  const phase = 'development';

  //variables
  const { auth, service, reports } = props;

  //actions
  const { setPrevUrl } = props;

  const {getReports, unsubscribeGetReports, resetGetReports} = props;

  useEffect(() => {
    getReports(phase, service);

    return function cleanup() {
      unsubscribeGetReports(phase, service);
      resetGetReports();
    };
  }, [service]);

  const [reportsAvailable, setReportsAvailable] = useState(true);
  useEffect(() => {
    if(reports) {
      if (reports.length === 0){
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

  // console.log('report');
  // console.log(reports);

  return (
        <div id='reports-section'>

          <Link to={`/development/upload-report?service=${service}`} >
          <div id="create-new-report" style={{background: "#ffeead"}} > <img src={createReportIcon} alt="Create a report" /> </div>
          </Link>

          {reportsAvailable ? false : <NoReportsScreen
              service={service}
              phase={phase}
          />
          }

          <div id='features-reports'>
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='service'>Service</div>
              <div id='title'>Title</div>
              <div id='title'>Status</div>
              <div id='title'>Assigned To</div>
              <div id='title'>Created By</div>
              <div id='end-column'>Created At</div>
            </div>
            { reports && reports.map(report => {
                return (
                    <div>
                      <Link to={'/development/report/' + report.id} key={report.id}>
                        {console.log("assignedTo", report.assignedTo)}
                        <Report
                            report = {report}
                        />
                      </Link>
                      <hr></hr>
                    </div>
                )
              })
            }
          </div>
        </div>

  )
};

//todo extract this to StringUtils
function getServiceNameFromPathName(pathname) {
  return pathname.split('/development/')[1]
}

const mapStateToProps = (state, ownProps) => {
  // console.log('---------------state');
  // console.log(state);
  return {
    auth: state.firebase.auth,
    service: getServiceNameFromPathName(ownProps.location.pathname),
    reports: state.report.reportsInDevelopment
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),

    getReports: (phase, service) => dispatch(getReportsInDevelopment(phase, service)),
    unsubscribeGetReports: (phase, service) => dispatch(unsubscribeGetReportsInDevelopment(phase, service)),
    resetGetReports: () => dispatch(resetGetReportsInDevelopment())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps))(SpockTestsInDevelopment)
