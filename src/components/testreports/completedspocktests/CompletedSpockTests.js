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
import LoadingScreen from "../../loading/LoadingScreen";

const CompletedSpockTests = (props) => {
  const {auth, featureReports, endpointReports, service} = props;
  if (!auth.uid) {return <Redirect to='/login'/>}


  return (
      <div id='home'>
        <div id='reports-section'>

          {featureReports ? null : <LoadingScreen />}

          <Link to={'/completed/upload-report'} >
            <button >Create New Report</button>
          </Link>

          <div>
            Total number of {service} tests: 200 - this is hardcoded for now
          </div>

          <div>
            Code Coverage
            <br/>
            Class, %:
            Method, %:
            Line, %:
          </div>

          <div id='features-reports'>
            <h4>Features</h4>
            <div id='headers'>
              {/* TODO Upgrade Headers so that it is more scalable */}
              <div id='head-start' className='service'>Service</div>
              <div id='head'>Title</div>
              <div id='head'># of tests</div>
              <div id='head'>Created By</div>
              <div id='head-end'>Created At</div>
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
              <div id='head-start' className='service'>Service</div>
              <div id='head'>Title</div>
              <div id='head'># of tests</div>
              <div id='head'>Created By</div>
              <div id='head-end'>Created At</div>
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
    service: getServiceNameFromPathName(ownProps.location.pathname)
  }
};

export default compose(
    connect(mapStateToProps),
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
