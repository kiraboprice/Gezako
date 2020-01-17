import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import {createReport} from '../../../store/actions/reportActions';
import * as firebase from 'firebase';
import {
  getUsersApartFromCurrentUser,
  setPrevUrl
} from "../../../store/actions/authActions";

import './createReport.css';
import Report from "../Report";
import moment from "moment";
import {getReportPhaseFromPathName} from "../../../util/StringUtil";

class CreateReport extends Component {
  storageRef = firebase.storage().ref();

  state = {
    title: 'Test Report Title',
    service: 'loans',
    type: 'endpoint',
    file: '',
    fileDownLoadUrl: '',
    uploadProgress: 0,
    displayAssignedTo: ''
  };

  componentDidMount() {
    const phase = getReportPhaseFromPathName(this.props.location.pathname);
    this.setState({phase: phase});
    this.props.getUsersApartFromCurrentUser();
    if(phase === 'development') {
      this.setState({displayAssignedTo: 'block'})
    } else if (phase === 'completed') {
      this.setState({displayAssignedTo: 'none'})
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  //store assignedTo as array of userId and DisplayName
  //because it's difficult to retrieve displayName using the userId when displaying
  //on a page with multiple assignees, like the allReportsInDevelopment Page
  handleAssignedToChange = (e) => {
    const sel = document.getElementsByName('assignedTo')[0];
    const opt = sel.options[sel.selectedIndex];
    console.log('opt', opt.text)

    this.setState({
      [e.target.name]: {'id': e.target.value, 'displayName': opt.text}
    });
  };

  handleFileSelected = (e) => {
    this.setState({
      [e.target.file]: e.target.files[0]
    });
  };

  //todo extract this to using actions and leave this component clean
  handleUploadFile = (e) => {
    const state = this.state;
    var context = this; //maybe this can be avoided by biding this function in the constructor? check commented code
    var metadata = {
      contentType: 'text/html'
    };
    //todo update the spock-reports child
    //todo if uploading a dev report, upload to development-spock-reports child.
    //todo if uploading a complete report, upload to completed-spock-reports
    var uploadTask = this.storageRef
    .child('spock-reports/' + state[e.target.file].name)
    .put(state[e.target.file], metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          state.uploadProgress = progress;

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
            state['fileDownLoadUrl'] = downloadUrl;
            context.setState(state);
            context.updateContextState(context);
          });
        }
    );
  };

  updateContextState(context) {
    this.state = context.state;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {title, phase, service, type, fileDownLoadUrl, assignedTo} = this.state;
    const report = {
      title,
      phase,
      service,
      type,
      fileDownLoadUrl,
      assignedTo
    };
    this.props.createReport(report);
    this.props.history.push(`/${phase}/${service}`);
  };

  render() {
    const {title, phase, service, type, uploadProgress, displayAssignedTo} = this.state;
    const { auth, setPrevUrl, users } = this.props;
    if (!auth.uid) {
      setPrevUrl(this.props.location.pathname);
      return <Redirect to='/login' />;
    }
    // console.log("STATE---", this.state)

    return (
        <div id='upload'>
          <h3 >Upload Spock Report</h3>
          {phase === 'completed' ? 'Upload Report for a complete test' : 'Upload Report for a test in development' }
            <div>
              <input type='file' name='file' onChange={this.handleFileSelected} accept='html/*'/>
              <button onClick={this.handleUploadFile}>Upload File</button>
            </div>

            {/* ! Just a suggestion, maybe display this onSubmit? */}
            <span id='uploading'>
						Uploading report: {uploadProgress}%
					  </span>

            <form onSubmit={this.handleSubmit} style={{marginTop: '25px'}}>
              <div>

                <div id='display-content'>
                  <label>Report Title:</label>
                  <textarea name='title'
                            onChange={this.handleChange}
                            value = {title}
                  />
                </div>

                <div id='display-content'>
                  <label>Service: </label>
                  <select name='service' value={service} onChange={this.handleChange}>
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
                  <select name='type' value={type} onChange={this.handleChange}>
                    <option value='feature'>Feature</option>
                    <option value='endpoint'>Endpoint</option>
                  </select>
                </div>

                <div id='display-content' style={{display: displayAssignedTo}}>
                  <label>Assign To: </label>
                  <select name='assignedTo' onChange={this.handleAssignedToChange}>
                    <option value=''></option>
                    {users && users.map(user => <option value={user.id}>{user.displayName}</option>)}
                  </select>
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
  }
}

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
