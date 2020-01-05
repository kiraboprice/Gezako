import React from 'react'
import 'firebase/auth';
import 'firebase/firestore';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'

import './completedspockreports.css';
import Report from "../report/Report";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

const CompletedSpockTests = (props) => {
  const {auth, reports} = props;
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
            { reports && reports.map(report => { //todo add the index back here!
                return (
                    <div>
                      {/*<div key={index}>*/}
                      <Link to={'/complete-test-report/' + report.id} key={report.id}>
                      <Report
                          title={report.title}
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
              <div id='head-start'>Title</div>
              <div id='head-end'>Report</div>
            </div>
            { reports && reports.map(report => { //todo add the index back here!
              return (
                  <div>
                    {/*<div key={index}>*/}
                    <Link to={'/complete-test-report/' + report.id} key={report.id}>
                      <Report
                          title={report.title}
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

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    reports: state.firestore.ordered.completedreports
  }
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      {
        collection: 'company',
        doc: 'tala',
        subcollections: [{ collection: 'completedreports' }],
        storeAs: 'completedreports'
      }
    ])
)(CompletedSpockTests)

//.collection('spock-reports').where('reportType', '==', 'feature')
//.collection('spock-reports').where('reportType', '==', 'endpoint')
