import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {
  createReport,
  resetCreateReportSuccess
} from '../../../store/actions/reportActions';
import * as firebase from 'firebase';
import {
  getUsersApartFromCurrentUser,
  setPrevUrl
} from "../../../store/actions/authActions";

import './createReport.css';
import {getReportPhaseFromPathName} from "../../../util/StringUtil";
import {COMPLETED_PHASE, DEVELOPMENT_PHASE} from "../../../constants/Report";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";

const CreateReport = (props) => {

  //report fields
  const [title, setTitle] = useState('Test Report Title');
  const [phase, setPhase] = useState('development');
  const [service, setService] = useState('loans');
  const [type, setType] = useState('endpoint');
  const [fileDownLoadUrl, setFileDownLoadUrl] = useState('');
  const [assignedTo, setAssignedTo] = useState(null);
  const [numberOfTests, setNumberOfTests] = useState(0);


  //required to generate fileDownLoadUrl
  const [file, setFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  //set up UI
  const [displayDevelopmentFields, setDisplayDevelopmentFields] = useState();
  const [displayCompletedFields, setDisplayCompletedFields] = useState();

  useEffect(() => {
    props.getUsersApartFromCurrentUser();

    setPhase(getReportPhaseFromPathName(props.location.pathname));
    if (phase === 'development') {
      setDisplayDevelopmentFields('block');
      setDisplayCompletedFields('none');
    } else if (phase === 'completed') {
      setDisplayDevelopmentFields('none');
      setDisplayCompletedFields('block');
    }
  }, [props]);

  //on submit report is clicked
  useEffect(() => {
    if(props.createReportSuccess === 'success') {
      props.showSuccessAlert('Successfully created report');
      props.history.push(`/${phase}/${service}`);
      //todo reset createReportSuccess to null
    } else if (props.createReportSuccess === 'error') {
      props.showErrorAlert('Failed to create report');
    }
    return function cleanup() {
      props.resetCreateReportSuccess()
    };
  }, [props]);

  const {auth, setPrevUrl, users} = props;
  if (!auth.uid) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login'/>;
  }

  function handleChange(e) {
    const value = e.target.value;
    // console.log('handleChange: ', value);
    // console.log("state in handle change", this.state);
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;

      case 'service': //short version of the above snippet
        setService(e.target.value);
        break;

      case 'type':
        setType(e.target.value);
        break;

      case 'numberOfTests':
        setNumberOfTests(e.target.value);
        break;

      case 'assignedTo':
        //store assignedTo as array of userId and DisplayName
        //because it's difficult to retrieve displayName using the userId when displaying
        //on a page with multiple assignees, like the allReportsInDevelopment Page
        const sel = document.getElementsByName('assignedTo')[0];
        const opt = sel.options[sel.selectedIndex];
        const value = e.target.value;
        setAssignedTo({'id': value, 'displayName': opt.text});
        break;

      default:
        break;
    }

  }

  function handleFileUploaded(fileDownLoadUrl) {
    setFileDownLoadUrl(fileDownLoadUrl);
  }

  function handleFileSelected(e) {
    setFile(e.target.files[0])
  }

  //todo extract this to using actions and leave this component clean
  function handleUploadFile(e) {
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
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes)
              * 100;
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

  function validateFields(report) {
   if(!report.title.length > 0) {
     return ("Fill in the Title")
   }
   else if (!report.phase.length > 0) {
     return ("Select Phase")
   }
   else if (!report.service.length > 0) {
     return ("Select Service")
   }
   else if (!report.type.length > 0) {
     return ("Select Type")
   }
   else if (!report.fileDownLoadUrl.length > 0) {
     return ("First upload a Test Teport")
   }

   // else if (report.numberOfTests.length > 0) {
   //   console.log(`numberOfTests.length > 0`)
   //   if(isNaN(report.numberOfTests)){
   //     console.log(`isNaN(report.`)
   //     return ("Number of tests should be a valid number")
   //   }
   // }

   // else if (!report.assignedTo.length > 1) {
   //   return ("")
   // }
   // else if (!report.numberOfTests.length > 1) {
   //   return ("")
   // }
   else {
     return ("valid");
   }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log("PROPS---", props);

    const report = {
      title,
      phase,
      service,
      type,
      fileDownLoadUrl,
      assignedTo,
      numberOfTests
    };

    const validationText = validateFields(report);
    if(validationText!== 'valid'){
      props.showErrorAlert(validationText);
      return;
    }

    props.createReport(report);
  }

  return (
      <div id='upload'>
        <h3>Upload Spock Report</h3>
        {phase === 'completed' ? 'Upload Report for a Complete test'
            : 'Upload Report for a test in Development'}
        <div>
          <input type='file' name='file' onChange={handleFileSelected}
                 accept='html/*'/>
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
                        value={title}
              />
            </div>

            <div id='display-content'>
              <label>Service: </label>
              <select name='service' value={service}
                      onChange={handleChange}>
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
              <select name='type' value={type}
                      onChange={handleChange}>
                <option value='feature'>Feature</option>
                <option value='endpoint'>Endpoint</option>
              </select>
            </div>

            <div id='display-content'
                 style={{display: displayDevelopmentFields}}>
              <label>Assign To: </label>
              <select name='assignedTo' onChange={handleChange}>
                <option value=''></option>
                {users && users.map(user => <option
                    value={user.id}>{user.displayName}</option>)}
              </select>
            </div>

            <div id='display-content' style={{display: displayCompletedFields}}>
              <label>No. of Tests in Report: </label>
              <textarea name='numberOfTests'
                        onChange={handleChange}
                        value={numberOfTests}
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
    users: state.auth.users,
    createReportSuccess: state.report.createReportSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReport: (report) => dispatch(createReport(report)),
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    getUsersApartFromCurrentUser: () => dispatch(getUsersApartFromCurrentUser()),

    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message)),
    resetCreateReportSuccess: (message) => dispatch(resetCreateReportSuccess(message)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateReport);
