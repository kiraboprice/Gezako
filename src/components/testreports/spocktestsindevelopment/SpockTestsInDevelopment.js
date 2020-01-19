import React, {useEffect, useState} from 'react'
import Report from "../Report";
import {Link} from "react-router-dom";
import {compose} from "redux";
import moment from 'moment'
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'
import {firestoreConnect} from "react-redux-firebase";
import {downloadReport} from "../../../store/actions/reportActions";
import createReportIcon from "../../../assets/Icons/create.png";
import {
  setPrevUrl
} from "../../../store/actions/authActions";
import {
  getAssigneeName,
  getFirstNameFromFullName
} from "../../../util/StringUtil";


const SpockTestsInDevelopment = (props) => {
  const { auth, reports } = props;
  const { setPrevUrl } = props;

  if (!auth.uid) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  console.log('report');
  console.log(reports);

  return (
        <div id='reports-section'>

          <Link to={'/development/upload-report'} >
            <div id="create-new-report" > <img src={createReportIcon} alt="Create a report" /> </div>
          </Link>

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

const mapStateToProps = (state, ownProps) => {
  //todo extract this to StringUtils
  function getServiceNameFromPathName(pathname) {
    return pathname.split('/development/')[1]
  }
  console.log('---------------state');
  console.log(state);
  return {
    auth: state.firebase.auth,
    reports: state.firestore.ordered.reports,
    collection: 'developmentreports',
    service: getServiceNameFromPathName(ownProps.location.pathname),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
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
          where: ['service', '==', props.service],
          storeAs: 'reports'
        }
      ]
    })
)(SpockTestsInDevelopment)
