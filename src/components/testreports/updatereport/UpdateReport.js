import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateReport, resetState} from "../../../store/actions/reportActions";
import * as firebase from "firebase";
import CustomSnackbar from "../../snackbar/CustomSnackbar";
import * as StringUtils from "../../../util/StringUtil";
import {getReportPhaseFromPathName} from "../../../util/StringUtil";
import {firestoreConnect} from "react-redux-firebase";
import {compose} from "redux";

class UpdateReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      phase : '',
      service: '',
      type: '',
      file: '',
      fileDownLoadUrl: '',
      uploadProgress: 0
    };
  }

  storageRef = firebase.storage().ref();

  componentWillMount() {

    const id = this.props.match.params.id;
    const pathName = this.props.location.pathname;
    let phase;
    if(pathName.includes('development')){
      phase = 'development'
    } else if (pathName.includes('completed')) {
      phase = 'completed'
    }

    this.setState({id: id, phase: phase});
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.report) {
      this.setState({
        report: nextProps.report,
        title: nextProps.report.title,
        phase: nextProps.report.phase,
        service: nextProps.report.service,
        type: nextProps.report.type,
        fileDownLoadUrl: nextProps.report.fileDownLoadUrl,
      });
    }
  }

  componentWillUnmount() {
    this.props.resetState()
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFileSelected = (e) => {
    this.setState({
      [e.target.file]: e.target.files[0]
    });
  };

  handleUploadFile = (e) => {
    const state = this.state;
    var context = this;
    var metadata = {
      contentType: 'text/html'
    };
    var uploadTask = this.storageRef.child(
        'spock-reports/' + state[e.target.file].name).put(
        state[e.target.file], metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes)
              * 100;
          state.uploadProgress = progress;

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
            state["fileDownLoadUrl"] = downloadUrl;
            context.setState(state);
            context.updateContextState(context)
          });
        });

  };

  updateContextState(context) {
    this.state = context.state
  }

  handleUpdate = (e) => {
    e.preventDefault();
    const {report, id, phase, title, service, type, fileDownLoadUrl} = this.state;
    const reportForUpdate = //todo continue here to update correct details in report then check if snackbar is shown after update
    this.props.updateReport(
        id,
        {
          ...report,
          title,
          phase,
          service,
          type,
          fileDownLoadUrl
        }
    );
    //todo add a cloud function which deletes the previous report from cloud storage
    this.props.history.push(`/${phase}/${service}`);

    return <CustomSnackbar
        showSuccessAlert = {true}
        successAlertMessage = 'Updated Report!'
    />;
  };

  render() {
    const { phase, title, service, type, uploadProgress, report} = this.state;
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to='/login' />;

    // console.log("STATEEEEEE");
    // console.log(this.state);
    if (report) {
      return (
          <div id='upload' style={{marginLeft: "400px", marginTop: "100px"}}>
            <div >
              <h3 >
                Update Spock Report
              </h3>
            </div>
            <div>
              <div>
                <input type="file" name="file"
                       onChange={this.handleFileSelected}
                       accept="html/*"/>
                <button onClick={this.handleUploadFile}>Upload File</button>
              </div>

              <span> Uploading report: {uploadProgress}% </span>

              <form onSubmit={this.handleUpdate}>

                <div id='display-content'>
                  <label>Report Title:</label>
                  <textarea name='title'
                            onChange={this.handleChange}
                            value = {title}
                  />
                </div>

                <div id='display-content'>
                  <label>Phase: </label>
                  <select name='phase' value={phase} onChange={this.handleChange}>
                    <option value='development'>Development</option>
                    <option value='completed'>Completed</option>
                  </select>
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

}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  const phase = getReportPhaseFromPathName(ownProps.location.pathname);
  const reports = state.firestore.data.reports;
  const report = reports ? reports[id] : null;

  return {
    auth: state.firebase.auth,
    report: report,
    collection: `${phase}reports`
  }
};

const mapDispatchToProps = dispatch => {
  return {
    updateReport: (id, report) => dispatch(updateReport(id, report)),
    resetState: () => dispatch(resetState())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    firestoreConnect(props => {
      return [
        {
          collection: 'company',
          doc: 'tala',
          subcollections: [{collection: props.collection}],
          storeAs: 'reports'
        }
      ]
    })
)(UpdateReport);
