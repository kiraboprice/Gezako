import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';
import {
  createTest,
  resetCreateTestSuccess
} from '../../../store/actions/reportActions';
import {
  getUsersApartFromCurrentUser,
  setPrevUrl, unsubscribeGetUsersApartFromCurrentUser
} from "../../../store/actions/authActions";

import './createSpockTestReport.css';
import {getTestPhaseFromPathName, isValidUrl} from "../../../util/StringUtil";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";
import TextField from "@material-ui/core/TextField/TextField";
import {COMPLETED, NEW} from "../../../constants/ReportStatus";

import * as services from "../../../constants/Services";

import FileUpload from "../../fileupload/FileUpload";
import AsyncAlertDialog from "../../alerts/AsyncAlertDialog";
const qs = require('query-string');

const CreateSpockTestReport = (props) => {
  const serviceInQuery = qs.parse(props.location.search, { ignoreQueryPrefix: true }).service;
  //report fields
  const [title, setTitle] = useState(null);
  const [phase, setPhase] = useState(getTestPhaseFromPathName(props.location.pathname));
  const [service, setService] = useState(serviceInQuery);
  const [type, setType] = useState('endpoint');
  const [fileDownLoadUrl, setFileDownLoadUrl] = useState(null);
  const [assignedTo, setAssignedTo] = useState(null);
  const [numberOfTests, setNumberOfTests] = useState(0);
  const [githubPR, setGithubPR] = useState(null);
  const [postmanTest, setPostmanTest] = useState(null);
  const [productSpec, setProductSpec] = useState(null);
  const [techSpec, setTechSpec] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  //set up UI
  const [displayFeatureFields, setDisplayFeatureFields] = useState();
  const [displayTestCompletedFields, setDisplayTestCompletedFields] = useState();
  const [displayTestDevelopmentFields, setDisplayTestDevelopmentFields] = useState();

  useEffect(() => {
    props.getUsersApartFromCurrentUser();

    return function cleanup() {
      props.unsubscribeGetUsersApartFromCurrentUser()
    };
  }, []);

  useEffect(() => {
    if (phase === 'development') {
      setDisplayTestDevelopmentFields('block');
      setDisplayTestCompletedFields('none');
    } else if (phase === 'completed') {
      setDisplayTestDevelopmentFields('none');
      setDisplayTestCompletedFields('block');
    }
  }, []);

  /**
   * When create test is clicked
   */
  const [test, setTest] = useState(null);
  const [createTestIsClicked, setCreateTestIsClicked] = useState(false);
  const [userSelectedAFile, setUserSelectedAFile] = useState(null);
  const [uploadSelectedFile, setUploadTheFile] = useState(null);
  const [showAsyncAlertDialog, setShowAsyncAlertDialog] = useState(false);
  useEffect(() => {
    if(createTestIsClicked === true) {

      if (userSelectedAFile) { //if file is set, upload to storage
        setShowAsyncAlertDialog(true); //no need to show this if the action will be quick - simply creating a test without uploading a report

        setUploadTheFile(true); //tell the child component to upload the file
        //wait for file download url to be populated by child component
        if(fileDownLoadUrl) {
          test.fileDownLoadUrl = fileDownLoadUrl;
          props.createTest(test);
        }
      } else {
        props.createTest(test);
      }
    }

  }, [createTestIsClicked, fileDownLoadUrl]);

  /**
   * When test is created (or not)
   */
  const { createTestNewTestId, showSuccessAlert, showErrorAlert} = props;
  useEffect(() => {
    if(createTestIsClicked === true) {
      if(createTestNewTestId) {
        setShowAsyncAlertDialog(false);

        showSuccessAlert('Successfully created test');
        props.history.push(`/${phase}/test/${props.createTestNewTestId}`);
      } else {
        setShowAsyncAlertDialog(false);
        showErrorAlert('Failed to create test');
      }

      return function cleanup() {
        props.resetCreateTestSuccess()
      };
    }

  }, [createTestNewTestId]);

  const {user, setPrevUrl, users} = props;
  if (!user) {
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

  const handleChangeForTextField = (e) => {
    const value = e.target.value;
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
        break;
    }
  };

  function validateFields(report) {
    console.log('REPORT ISSSS', report);
   if(!report.title.length > 0) {
     return ("Fill in the Title")
   }
   else if (!report.service.length > 0) {
     return ("Select Service")
   }
   // else if (!report.fileDownLoadUrl.length > 0) {
   //   return ("Upload a Test report by pressing the Yellow Button above.")
   // }

   // else if (report.githubPR.length > 0) {
   //   if(!isValidUrl(report.githubPR)) {
   //     return ("Set a valid URL for githubPR")
   //
   //   }
   //   console.log("PROPS---", report);
   //
   // }
   // else if (report.postmanTest.length > 0) {
   //   if(!isValidUrl(report.postmanTest)) {
   //     return ("Set a valid URL for postmanTest")
   //
   //   }
   //   console.log("PROPS---", report);
   //
   // }
   // else if (report.productSpec.length > 0) {
   //   if(!isValidUrl(report.productSpec)) {
   //     return ("Set a valid URL for Product Spec")
   //
   //   }
   //   console.log("PROPS---", report);
   //
   // }
   // else if (report.techSpec.length > 0) {
   //   if(!isValidUrl(report.techSpec)){
   //     return ("Set a valid URL for Tech Spec")
   //   }
   //   console.log("PROPS222---", report);
   //
   // }
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

  function handleCreate(e) {
    e.preventDefault();
    setCreateTestIsClicked(true);
    // console.log("PROPS---", props);
    const status = (phase === 'completed')? COMPLETED : NEW;
    const test = {
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

    const validationText = validateFields(test);
    if(validationText!== 'valid'){
      // console.log('REPORT validationText', validationText);
      props.showErrorAlert(validationText);
      return;
    }

    setTest(test)
  }

  return (
      <div id='upload'>
        <h3>Create a Test</h3>
        {phase === 'completed' ? 'Upload Report for a Complete test'
            : 'Upload Report for a test in Development'}

        <FileUpload
            storageLocation='spock-reports/'
            setUserSelectedAFile={setUserSelectedAFile}
            uploadSelectedFile={uploadSelectedFile}
            setUploadProgress={setUploadProgress}
            setFileDownLoadUrl={setFileDownLoadUrl}
        />

        <form onSubmit={handleCreate} style={{marginTop: '25px'}}>
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
              <select name='type' value={type}
                      onChange={handleChange}>
                <option value='feature'>Feature</option>
                <option value='endpoint'>Endpoint</option>
              </select>
            </div>

            <div id='display-content'
                 style={{display: displayTestDevelopmentFields}}>
              <label>Assign To: </label>
              <select name='assignedTo' onChange={handleChange}>
                <option value=''></option>
                {users && users.map(user => <option
                    value={user.id}>{user.displayName}</option>)}
              </select>
            </div>

            <div id='display-content' style={{display: displayTestCompletedFields}}>
              <label>No. of Tests in Report: </label>
              <textarea name='numberOfTests'
                        onChange={handleChange}
                        value={numberOfTests}
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

              <button id='create-test' type='submit'>
              Create
            </button>
          </div>
        </form>

        <AsyncAlertDialog
            showAsyncAlertDialog = {showAsyncAlertDialog}
            testTitle = {test? test.title : ""}
        />

      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    users: state.auth.users,
    createTestNewTestId: state.report.createTestNewTestId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createTest: (report) => dispatch(createTest(report)),
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),
    getUsersApartFromCurrentUser: () => dispatch(getUsersApartFromCurrentUser()),
    unsubscribeGetUsersApartFromCurrentUser: () => dispatch(unsubscribeGetUsersApartFromCurrentUser()),

    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message)),

    resetCreateTestSuccess: (message) => dispatch(resetCreateTestSuccess(message)),

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSpockTestReport);
