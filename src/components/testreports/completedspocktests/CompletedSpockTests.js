import React from 'react'
import 'firebase/auth';
import 'firebase/firestore';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'

import './completedspockreports.css';

import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import moment from "moment";
import Report from "../Report";

const CompletedSpockTests = (props) => {
  const {auth, featureReports, endpointReports} = props;
  if (!auth.uid) {return <Redirect to='/login'/>}


  return (
      <div id='home'>
        <div id='reports-section'>
          <div id='features-reports'>
            <h4>Features</h4>
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='head-start' className='service'>Service</div>
              <div id='head'>Title</div>
              <div id='head'>Uploaded At</div>
              <div id='head-end'>Uploaded At</div>
              <div id='head-end'>Uploaded By</div>
            </div>
            { featureReports && featureReports.map(report => { //todo add the index back here!
                return (
                    <div>
                      {/*<div key={index}>*/}
                      <Link to={'/report/completed/' + report.id} key={report.id}>
                      <Report
                          service={report.service}
                          title={report.title}
                          createdAt={moment(report.createdAt.toDate()).calendar()}
                          createdBy={report.createdBy}
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
              <div id='head-start' className='service'>Service</div>
              <div id='head'>Title</div>
              <div id='head'>Uploaded At</div>
              <div id='head-end'>Uploaded At</div>
              <div id='head-end'>Uploaded By</div>
            </div>
            { endpointReports && endpointReports.map(report => { //todo add the index back here!
              return (
                  <div>
                    {/*<div key={index}>*/}
                    <Link to={'/report/complete/' + report.id} key={report.id}>
                      <Report
                          service={report.service}
                          title={report.title}
                          createdAt={moment(report.createdAt.toDate()).calendar()}
                          createdBy={report.createdBy}
                      />
                    </Link>
                    <hr></hr>
                  </div>
              )
            })
            }

          </div>

          <Link to={'/upload-report'} >
            <button >Create New Report</button>
          </Link>

        </div>
      </div>
  )

};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    featureReports: state.firestore.ordered.featureReports,
    endpointReports: state.firestore.ordered.endpointReports,
  }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {
        collection: 'company',
        doc: 'tala',
        subcollections: [{ collection: 'completedreports' }],
        where: ['type', '==', 'feature'],
        storeAs: 'featureReports'
      }
    ]),
    firestoreConnect([
      {
        collection: 'company',
        doc: 'tala',
        subcollections: [{ collection: 'completedreports' }],
        where: ['type', '==', 'endpoint'],
        storeAs: 'endpointReports'
      }
    ])
)(CompletedSpockTests)
