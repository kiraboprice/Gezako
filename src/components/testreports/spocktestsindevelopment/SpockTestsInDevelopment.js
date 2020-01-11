import React from 'react'
import Report from "../Report";
import {Link} from "react-router-dom";
import {compose} from "redux";
import moment from 'moment'
import connect from "react-redux/es/connect/connect";
import {Redirect} from 'react-router-dom'
import {firestoreConnect} from "react-redux-firebase";
import {downloadReport} from "../../../store/actions/reportActions";
import {setPrevUrl} from "../../../store/actions/authActions";


const SpockTestsInDevelopment = (props) => {
  const { auth, setPrevUrl, reports } = props;
  if (!auth.uid) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
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
              <div id='head'>Uploaded At</div>
              <div id='head-end'>Uploaded By</div>
            </div>
            { reports && reports.map(report => {
                return (
                    <div>
                      <Link to={'/report/development/' + report.id} key={report.id}>
                        <Report
                            service={report.service}
                            title={report.title}
                            createdAt={moment(report.createdAt.toDate()).calendar()}
                            createdBy={report.createdBy.split(' ').slice(0, -1).join(' ')}
                        />
                      </Link>
                      <hr></hr>
                    </div>
                )
              }) }
          </div>
        </div>

  )
};

const mapStateToProps = (state) => {
  // console.log('state in SpockTestsInDevelopment');
  console.log(state);
  return {
    auth: state.firebase.auth,
    reports: state.firestore.ordered.developmentreports
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url))
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect([
      {
        collection: 'company',
        doc: 'tala',
        subcollections: [{ collection: 'developmentreports' }],
        storeAs: 'developmentreports'
      }
    ])
)(SpockTestsInDevelopment)
