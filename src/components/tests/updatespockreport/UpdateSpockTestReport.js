import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  updateReport,
  getReport,
  unsubscribeGetReport, resetGetReport, resetUpdateReportState
} from "../../../store/actions/reportActions";
import * as firebase from "firebase";
import CustomSnackbar from "../../alerts/CustomSnackbar";
import {getTestPhaseFromPathName} from "../../../util/StringUtil";
import {compose} from "redux";
import {
  getUsersApartFromCurrentUser,
  unsubscribeGetUsersApartFromCurrentUser
} from "../../../store/actions/authActions";
import TextField from "@material-ui/core/TextField/TextField";
import {blue} from "@material-ui/core/colors";
import * as services from "../../../constants/Services";

const UpdateSpockTestReport = (props) => {
  const { report } = props;

  //report fields
  const [id, setId] = useState(null);
  const [title, setTitle] = useState(null);
  const [phase, setPhase] = useState(null);
  const [service, setService] = useState(null);
  const [type, setType] = useState(null);
  const [fileDownLoadUrl, setFileDownLoadUrl] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [numberOfTests, setNumberOfTests] = useState(null);
  const [githubPR, setGithubPR] = useState(null);
  const [postmanTest, setPostmanTest] = useState(null);
  const [productSpec, setProductSpec] = useState(null);
  const [techSpec, setTechSpec] = useState(null);

  //required to generate fileDownLoadUrl
  const [file, setFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  //set up UI
  const [displayTestDevelopmentFields, setDisplayTestDevelopmentFields] = useState();
  const [displayTestCompletedFields, setDisplayTestCompletedFields] = useState();

  useEffect(() => {
    props.getUsersApartFromCurrentUser();

    return function cleanup() {
      props.unsubscribeGetUsersApartFromCurrentUser()
    };
  }, []);

  useEffect(() => {
    setId(props.match.params.id);
    setPhase(getTestPhaseFromPathName(props.location.pathname));

    if (phase === 'development') {
      setDisplayTestDevelopmentFields('block');
      setDisplayTestCompletedFields('none');
    } else if (phase === 'completed') {
      setDisplayTestDevelopmentFields('none');
      setDisplayTestCompletedFields('block');
    }

    props.getReport(props.match.params.id);

    return function cleanup() {
      unsubscribeGetReport(props.match.params.id);
      resetGetReport();
    };
  }, [id]);

  useEffect(() => {
    if(report){

      setTitle(report.title);
      setPhase(report.phase);
      setService(report.service);
      setType(report.type);
      setFileDownLoadUrl(report.fileDownLoadUrl);
      setAssignedTo(report.assignedTo);
      setNumberOfTests(report.numberOfTests);
      setGithubPR(report.githubPR);
      setPostmanTest(report.postmanTest);
      setProductSpec(report.productSpec);
      setTechSpec(report.techSpec);
    }
    // console.log('REPORRRRRTTTTUU----', report);
  }, [report]);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log('handleChange: ', value);
    switch (e.target.name) {
      case 'title':
        setTitle(value);
        break;
      case 'phase':
        setPhase(value);
        break;
      case 'service':
        setService(value);
        break;

      case 'type':
        setType(value);
        break;

      case 'numberOfTests':
        setNumberOfTests(value);
        break;

      default:
        break;
    }

  };

  const handleChangeForTextField = (e) => {
    const value = e.target.value;
    // console.log('handleChange: ', value);
    switch (e.target.id) {
      case 'githubPR':
        setGithubPR(value);
        break;
      case 'postmanTest':
        setPostmanTest(value);
        break;
      case 'productSpec':
        setProductSpec(value);
        break;
      case 'techSpec':
        setTechSpec(value);
        break;
      default:
        break
    }

  };

  //store assignedTo as array of userId and DisplayName
  //because it's difficult to retrieve displayName using the userId when displaying
  //on a page with multiple assignees, like the allReportsInDevelopment Page
  const handleAssignedToChange = (e) => {
    const sel = document.getElementsByName('assignedTo')[0];
    const opt = sel.options[sel.selectedIndex];
    const value = e.target.value;
    setAssignedTo({'id': value, 'displayName': opt.text});
  };

  const handleFileSelected = (e) => {
    setFile(e.target.files[0])
  };

  const handleFileUploaded = (fileDownLoadUrl) => {
    // console.log("file download url----", fileDownLoadUrl)
    setFileDownLoadUrl(fileDownLoadUrl);
  }

  const handleUploadFile = (e) => {
    var metadata = {
      contentType: 'text/html'
    };
    var uploadTask = firebase.storage().ref().
    child('spock-reports/' + file.name)
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
        }, function (error) {

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
        }, function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadUrl) {
            handleFileUploaded(downloadUrl)
          });
        });

  };
// console.log('REPORRRRRTTTTUU----', report);
  const handleUpdate = (e) => {
    e.preventDefault();
    const status = report.status; //this is not updated in this page. leave as is
    const reportForUpdate = {
      title,
      phase,
      service,
      type,
      fileDownLoadUrl,
      assignedTo,
      numberOfTests,
      githubPR,
      postmanTest,
      productSpec,
      techSpec,
      status
    };

    props.updateReport(id, reportForUpdate);

    //todo add a cloud function which deletes the previous report from cloud storage
    props.history.push(`/${report.phase}/test/${report.id}`);

    //todo check why this isnt working
    return <CustomSnackbar
        showSuccessAlert = {true}
        successAlertMessage = 'Updated Report!'
    />;
  };

  const { user, users } = props;
  if (!user) return <Redirect to='/login' />;

  if (title) {
    return (
        <div id='upload'>
          <h3 >Update Spock Report</h3>
          <div>
            <div>
              <input type='file' name='file' onChange={handleFileSelected} accept='html/*'/>
              <button onClick={handleUploadFile} style={{background: "#ffeead"}}>Upload File</button>
            </div>

            <form onSubmit={handleUpdate}>

              <div id='display-content'>
                <label>Report Title:</label>
                <textarea name='title'
                          onChange={handleChange}
                          value = {title}
                />
              </div>

              <div id='display-content'>
                <label>Phase: </label>
                <select name='phase' value={phase} onChange={handleChange}>
                  <option value='development'>Development</option>
                  <option value='completed'>Completed</option>
                </select>
              </div>

              <div id='display-content'>
                <label>Service: </label>
                <select name='service' value={service} onChange={handleChange}>
                <option value={services.SURVEYS_VALUE}>{services.SURVEYS_NAME}</option>
                <option value={services.RULES_VALUE}>{services.RULES_NAME}</option>
                <option value={services.LOANS_VALUE}>{services.LOANS_NAME}</option>
                <option value={services.USERS_VALUE}>{services.USERS_NAME}</option>
                <option value={services.AUTH_VALUE}>{services.AUTH_NAME}</option>
                <option value={services.RAILS_VALUE}>{services.RAILS_NAME}</option>
                <option value={services.COMMS_VALUE}>{services.COMMS_NAME}</option>
                <option value={services.APPROVAL_VALUE}>{services.APPROVAL_NAME}</option>
                <option value={services.SCHEDULER_VALUE}>{services.SCHEDULER_NAME}</option>
                <option value={services.DSROUTER_VALUE}>{services.DSROUTER_NAME}</option>
                <option value={services.ASSIGNMENT_VALUE}>{services.ASSIGNMENT_NAME}</option>
                <option value={services.DSS_VALUE}>{services.DSS_NAME}</option>
                <option value={services.KYC_VALUE}>{services.KYC_NAME}</option>
                <option value={services.ATTRIBUTION_VALUE}>{services.ATTRIBUTION_NAME}</option>
                <option value={services.SETTLEMENT_VALUE}>{services.SETTLEMENT_NAME}</option>
                <option value={services.VERIFICATION_VALUE}>{services.VERIFICATION_NAME}</option>
                <option value={services.LENDING_PARTNER_VALUE}>{services.LENDING_PARTNER_NAME}</option>
                <option value={services.PROVIDER_MEDIATOR_LEGACY_VALUE}>{services.PROVIDER_MEDIATOR_LEGACY_NAME}</option>
                <option value={services.ACCOUNT_LEGACY_VALUE}>{services.ACCOUNT_LEGACY_NAME}</option>
              </select>
            </div>

              <div id='display-content'>
                <label>Report Type: </label>
                <select name='type' value={type} onChange={handleChange}>
                  <option value='feature'>Feature</option>
                  <option value='endpoint'>Endpoint</option>
                </select>
              </div>

              <div id='display-content' style={{display: displayTestDevelopmentFields}}>
                <label>Assign To: </label>
                <select name='assignedTo' onChange={handleAssignedToChange}>
                  <option value=''></option>
                  {users && users.map(user => <option value={user.id}>{user.displayName}</option>)}
                </select>
              </div>

              <div id='display-content' style={{display: displayTestCompletedFields}}>
                <label>No. of Tests in Report: </label>
                <textarea name='numberOfTests'
                          onChange={handleChange}
                          value = {numberOfTests}
                />
              </div>

              <TextField
                  margin="dense"
                  id="githubPR"
                  label="Github Pull Request Link"
                  type="url"
                  fullWidth
                  value={githubPR}
                  onChange={handleChangeForTextField}
              />

              <TextField
                  margin="dense"
                  id="postmanTest"
                  label="Postman Tests Link"
                  type="url"
                  fullWidth
                  value={postmanTest}
                  onChange={handleChangeForTextField}
              />

              <TextField
                  margin="dense"
                  id="productSpec"
                  label="Product Requirement Spec"
                  type="url"
                  fullWidth
                  value={productSpec}
                  onChange={handleChangeForTextField}
              />

              <TextField
                  margin="dense"
                  id="techSpec"
                  label="Technical Design Spec"
                  type="url"
                  fullWidth
                  value={techSpec}
                  onChange={handleChangeForTextField}
              />

              {/*<span id='uploading'>*/}
                {/*Uploading report: {uploadProgress}%*/}
              {/*</span>*/}
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
    );

  } else {
    return (
        <div id='test-details-section'>
          <p>Loading report...</p>
        </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    report: state.report.getReport,
    users: state.auth.users
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getReport: (id) => dispatch(getReport(id)),
    unsubscribeGetReport: (id) => dispatch(unsubscribeGetReport(id)),
    resetGetReport: () => dispatch(resetGetReport()),

    updateReport: (id, report) => dispatch(updateReport(id, report)),
    resetUpdateReportState: () => dispatch(resetUpdateReportState()),

    getUsersApartFromCurrentUser: () => dispatch(getUsersApartFromCurrentUser()),
    unsubscribeGetUsersApartFromCurrentUser: () => dispatch(unsubscribeGetUsersApartFromCurrentUser())
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)(UpdateSpockTestReport))
