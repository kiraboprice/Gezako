import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  updateReport,
  resetState,
  getFeatureReports,
  getReport,
  unsubscribeGetFeatureReports,
  resetGetFeatureReports, unsubscribeGetReport, resetGetReport
} from "../../../store/actions/reportActions";
import * as firebase from "firebase";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import {getReportPhaseFromPathName} from "../../../util/StringUtil";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";
import {getUsersApartFromCurrentUser} from "../../../store/actions/authActions";
import TextField from "@material-ui/core/TextField/TextField";
import {blue} from "@material-ui/core/colors";

const UpdateReport = (props) => {
  //report fields
  const [id, setId] = useState();
  const [title, setTitle] = useState();
  const [phase, setPhase] = useState();
  const [service, setService] = useState();
  const [type, setType] = useState();
  const [fileDownLoadUrl, setFileDownLoadUrl] = useState();
  const [assignedTo, setAssignedTo] = useState();
  const [numberOfTests, setNumberOfTests] = useState();
  const [productSpec, setProductSpec] = useState();
  const [techSpec, setTechSpec] = useState();

  //required to generate fileDownLoadUrl
  const [file, setFile] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);

  //set up UI
  const [displayDevelopmentFields, setDisplayDevelopmentFields] = useState();
  const [displayCompletedFields, setDisplayCompletedFields] = useState();

  useEffect(() => {
    setId(props.match.params.id);
    setPhase(getReportPhaseFromPathName(props.location.pathname));

    if (phase === 'development') {
      setDisplayDevelopmentFields('block');
      setDisplayCompletedFields('none');
    } else if (phase === 'completed') {
      setDisplayDevelopmentFields('none');
      setDisplayCompletedFields('block');
    }

    getReport(id, phase);

    return function cleanup() {
      unsubscribeGetReport(service);
      resetGetReport();
    };
  }, [service]);

  useEffect(() => {
    props.getUsersApartFromCurrentUser();

    setTitle(props.report.title);
    setPhase(props.report.phase);
    setService(props.report.service);
    setType(props.report.type);
    setFileDownLoadUrl(props.report.fileDownLoadUrl);
    setAssignedTo(props.report.assignedTo);
    setNumberOfTests(props.report.numberOfTests);
    setProductSpec(props.report.productSpec);
    setTechSpec(props.report.techSpec);

    return function cleanup() {
      props.resetState()
    };
  }, [props]);

  const handleChange = (e) => {
    const value = e.target.value;
    console.log('handleChange: ', value);
    // console.log("state in handle change", this.state);
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
        return this.state;
    }

  };

  const handleChangeForTextField = (e) => {
    const value = e.target.value;
    // console.log('handleChange: ', value);
    switch (e.target.id) {
      case 'productSpec':
        setProductSpec(value);
        break;
      case 'techSpec':
        setTechSpec(value);
        break;
      default:
        return this.state;
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
    console.log("file download url----", fileDownLoadUrl)
    setFileDownLoadUrl(fileDownLoadUrl);
  }

  const handleUploadFile = (e) => {
    const state = this.state;
    var metadata = {
      contentType: 'text/html'
    };
    var uploadTask = firebase.storage().ref().
    child('spock-reports/' + state[e.target.file].name)
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

  const handleUpdate = (e) => {
    e.preventDefault();
    const report = {
      title,
      phase,
      service,
      type,
      fileDownLoadUrl,
      assignedTo,
      numberOfTests,
      productSpec,
      techSpec
    };

    props.updateReport(id, report);

    //todo add a cloud function which deletes the previous report from cloud storage
    props.history.push(`/${report.phase}/${report.service}`);

    return <CustomSnackbar
        showSuccessAlert = {true}
        successAlertMessage = 'Updated Report!'
    />;
  };

    const { auth, users } = this.props;
    if (!auth.uid) return <Redirect to='/login' />;

    // console.log("STATEEEEEE");
    // console.log(this.state);
    if (title) {
      return (
          <div id='upload'>
            <h3 >Update Spock Report</h3>
            <div>
            <div>
              <input type='file' name='file' onChange={handleFileSelected} accept='html/*'/>
              <button onClick={handleUploadFile} style={{color: blue}}>Upload File</button>
            </div>

              <span id='uploading'>
                Uploading report: {uploadProgress}%
              </span>

              <form onSubmit={handleUpdate}>

                <div id='display-content'>
                  <label>Report Title:</label>
                  <textarea name='title'
                            onChange={this.handleChange}
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
                    <option value='surveys'>Surveys</option>
                    <option value='rules'>Rules</option>
                    <option value='loans'>Loans</option>
                    <option value='users'>Users</option>
                    <option value='auth'>Auth</option>
                    <option value='rails'>Rails</option>
                    <option value='approval'>Comms</option>
                    <option value='approval'>Approval</option>
                    <option value='scheduler'>Scheduler</option>
                    <option value='dsrouter'>DsRouter</option>
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
                  <select name='type' value={type} onChange={handleChange}>
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
                            value = {numberOfTests}
                  />
                </div>

                <TextField
                    margin="dense"
                    id="productSpec"
                    label="Product Requirement Spec"
                    type="web"
                    fullWidth
                    value={productSpec}
                    onChange={handleChangeForTextField}
                />

                <TextField
                    margin="dense"
                    id="techSpec"
                    label="Technical Design Spec"
                    type="web"
                    fullWidth
                    value={techSpec}
                    onChange={handleChangeForTextField}
                />

                <button type="submit">Update</button>
              </form>
            </div>
          </div>
      );

    } else {
      return (
          <div id='report-details-section'>
            <p>Loading report...</p>
          </div>
      )
    }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth, //todo remove the need for this auth so we can fully remove firestoreConnect
    report: state.report.getReport,
    users: state.auth.users
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getReport: (id, phase) => dispatch(getReport(id, phase)),
    unsubscribeGetReport: (id, phase) => dispatch(unsubscribeGetReport(id, phase)),
    resetGetReport: () => dispatch(resetGetReport()),

    updateReport: (id, report) => dispatch(updateReport(id, report)),
    resetState: () => dispatch(resetState()),
    getUsersApartFromCurrentUser: () => dispatch(getUsersApartFromCurrentUser())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps), firestoreConnect
)(UpdateReport)
