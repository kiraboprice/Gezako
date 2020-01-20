import React, {Component, useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {createReport} from '../../../store/actions/reportActions';
import * as firebase from 'firebase';
import {
  getUsersApartFromCurrentUser,
  setPrevUrl
} from "../../../store/actions/authActions";

import './createReport.css';
import {getReportPhaseFromPathName} from "../../../util/StringUtil";
import {COMPLETED_PHASE, DEVELOPMENT_PHASE} from "../../../constants/Report";

const CreateReport = (props) => {

  const [report, setReport] = useState();
  const [phase, setPhase] = useState();
  const [file, setFile] = useState();
const [uploadProgress, setUploadProgress] = useState(0);

  const [displayDevelopmentFields, setDisplayDevelopmentFields] = useState();
  const [displayCompletedFields, setDisplayCompletedFields] = useState();

  useEffect(() => {
    props.getUsersApartFromCurrentUser();
    setPhase(getReportPhaseFromPathName(props.location.pathname));
    if(phase === 'development') {
      setDisplayDevelopmentFields('block');
      setDisplayCompletedFields('none');
    } else if (phase === 'completed') {
      setDisplayDevelopmentFields('none');
      setDisplayCompletedFields('block');
    }

    setReport(
        {
          title: 'Test Report Title',
          phase: phase,
          service: 'loans',
          type: 'endpoint',
          fileDownLoadUrl: '',
          assignedTo: '',
          numberOfTests: '',
        }
    )
  }, [props]);

  const { auth, setPrevUrl, users } = props;
  if (!auth.uid) {
    setPrevUrl(this.props.location.pathname);
    return <Redirect to='/login' />;
  }

  function handleChange (e) {
    const value = e.target.value;
    // console.log('handleChange: ', value);
    // console.log("state in handle change", this.state);
    switch (e.target.name) {
      case 'title':
        setReport(report => {
          report.title = value;
          return report
        });
        console.log('report handleChange: ', report);

        break;
      case 'phase':
        setReport(report => {
          report.phase = value;
          return report
        });
        break;
      case 'service': //short version of the above snippet
        setReport(report => (report.service = value, report));
        break;

      case 'type':
        setReport(report => (report.type = value, report));
        break;

      case 'numberOfTests':
        setReport(report => (report.numberOfTests = value, report));
        break;

      default:
        break;
    }

  }

  //store assignedTo as array of userId and DisplayName
  //because it's difficult to retrieve displayName using the userId when displaying
  //on a page with multiple assignees, like the allReportsInDevelopment Page
  function handleAssignedToChange (e) {
    const sel = document.getElementsByName('assignedTo')[0];
    const opt = sel.options[sel.selectedIndex];
    const value = e.target.value;
    setReport(report => (report.assignedTo = {'id': value, 'displayName': opt.text}, report));
  }

  function handleFileUploaded (fileDownLoadUrl) {
    setReport(report => (report.fileDownLoadUrl = fileDownLoadUrl, report));
  }

  function handleFileSelected(e){
    setFile(e.target.files[0])
  }

  //todo extract this to using actions and leave this component clean
  function handleUploadFile (e) {
    var metadata = {
      contentType: 'text/html'
    };
    //todo update the spock-reports child
    //todo if uploading a dev report, upload to development-spock-reports child.
    //todo if uploading a complete report, upload to completed-spock-reports
    var uploadTask = firebase.storage().ref()

    .child('spock-reports/' + file.name)
    .put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log('Upload is running');
              break;
          }
        },
        function (error) {
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;

            case 'storage/canceled':
              // User canceled the upload
              break;

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadUrl) {
            handleFileUploaded(downloadUrl)
          });
        }
    );
  }

  function handleSubmit (e) {
    e.preventDefault();
    props.createReport(report);
    props.history.push(`/${report.phase}/${report.service}`);
  }
    // console.log("STATE---", report);

  return (
      <div id='upload'>
        <h3 >Upload Spock Report</h3>
        {phase === 'completed' ? 'Upload Report for a complete test' : 'Upload Report for a test in development' }
        <div>
          <input type='file' name='file' onChange={handleFileSelected} accept='html/*'/>
          <button onClick={handleUploadFile}>Upload File</button>
        </div>

        {/* ! Just a suggestion, maybe display this onSubmit? */}
        <span id='uploading'>
		  Uploading report: {uploadProgress}%
	  </span>
        <form onSubmit={handleSubmit} style={{marginTop: '25px'}}>
          <div>

            <div id='display-content'>
              <label>Report Title:</label>
              <textarea name='title'
                        onChange={handleChange}
                        value = {report? report.title : null}
              />
            </div>

            <div id='display-content'>
              <label>Service: </label>
              <select name='service' value={report? report.service : null} onChange={handleChange}>
                <option value='loans'>Loans</option>
                <option value='users'>Users</option>
                <option value='surveys'>Surveys</option>
                <option value='auth'>Auth</option>
                <option value='rails'>Rails</option>
                <option value='approval'>Comms</option>
                <option value='approval'>Approval</option>
                <option value='scheduler'>Scheduler</option>
                <option value='dsrouter'>DsRouter</option>
                <option value='rules'>Rules</option>
                <option value='assignment'>Assignment</option>
                <option value='dss'>Dss</option>
                <option value='kyc'>Kyc</option>
                <option value='attribution'>Attribution</option>
                <option value='settlement'>Settlement</option>
                <option value='verification'>Verification</option>
              </select>
            </div>

            <div id='display-content'>
              <label>Report Type: </label>
              <select name='type' value={report? report.type: null} onChange={handleChange}>
                <option value='feature'>Feature</option>
                <option value='endpoint'>Endpoint</option>
              </select>
            </div>

            <div id='display-content' style={{display: displayDevelopmentFields}}>
              <label>Assign To: </label>
              <select name='assignedTo' onChange={handleAssignedToChange}>
                <option value=''></option>
                {users && users.map(user => <option value={user.id}>{user.displayName}</option>)}
              </select>
            </div>

            <div id='display-content' style={{display: displayCompletedFields}}>
              <label>No. of Tests in Report: </label>
              <textarea name='numberOfTests'
                        onChange={handleChange}
                        value = {report? report.numberOfTests : null}
              />
            </div>

            {/* ! Make sure someone has actually uploaded and filled out the required spaces because
              I was able to submit (by accident) without uploading or filling out the spaces */}
            <button id='submit-report' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </div>
  );

};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    users: state.auth.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReport: (report) => dispatch(createReport(report)),
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    getUsersApartFromCurrentUser: () => dispatch(getUsersApartFromCurrentUser()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReport);
