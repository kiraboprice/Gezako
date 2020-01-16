import React, {useEffect, useState} from 'react'
import Report from "../Report";
import {Link} from "react-router-dom";
import {compose} from "redux";
import moment from 'moment'
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'
import {firestoreConnect} from "react-redux-firebase";
import {downloadReport} from "../../../store/actions/reportActions";
import {
  setPrevUrl
} from "../../../store/actions/authActions";
import * as StringUtils from "../../../util/StringUtil";


const SpockTestsInDevelopment = (props) => {
  const { auth, reports } = props;
  const { setPrevUrl } = props;

  if (!auth.uid) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  console.log('report');
  console.log(reports);

  function getAssigneeName(report) {
    return report.assignedTo ?
        StringUtils.getFirstNameFromFullName(report.assignedTo.displayName) :
        null
  }

  return (
        <div id='reports-section'>

          <Link to={'/upload-report'} >
            <button >Create New Report</button>
          </Link>

          <div id='features-reports'>
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='head-start' className='service'>Service</div>
              <div id='head'>Title</div>
              <div id='head'>Status</div>
              <div id='head'>Assigned To</div>
              <div id='head'>Created By</div>
              <div id='head-end'>Created At</div>
            </div>
            { reports && reports.map(report => {
                return (
                    <div>
                      <Link to={'/development/report/' + report.id} key={report.id}>
                        {console.log("assignedTo", report.assignedTo)}
                        <Report
                            service={report.service}
                            title={report.title}
                            status={report.status}
                            assignedTo={getAssigneeName(report)}
                            createdBy={StringUtils.getFirstNameFromFullName(report.createdBy)}
                            createdAt={moment(report.createdAt.toDate()).calendar()}
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
