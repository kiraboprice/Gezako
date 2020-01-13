import React, {Component} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'
import {getReport, updateReport, resetState} from "../../../store/actions/reportActions";
import * as firebase from "firebase";

class UpdateReport extends Component {
  storageRef = firebase.storage().ref();

  state = {
    phase : '',
    service: '',
    type: '',
    title: '',
    file: '',
    fileDownLoadUrl: '',
    uploadProgress: 0
  };

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
    const {id, phase, service, type, title, fileDownLoadUrl} = this.state;
    const report = {
      // phase,
      // service,
      // type,
      // title,
      fileDownLoadUrl
    };

    console.log('updateReport');
    console.log(report);
    this.props.updateReport(id, phase, report);

    //todo add a cloud function which deletes the previous report from cloud storage

    if(phase == 'development') {
      this.props.history.push('/development');
    } else if(phase == 'completed') {
      this.props.history.push('/');
    }
  };

  render() {
    const { id, phase, uploadProgress} = this.state;
    const { auth, getReport, report } = this.props;
    if (!auth.uid) return <Redirect to='/login' />;
    
    getReport(id, phase);
    let { service, type, title } = '';
    if (report!= null) {
      service = report.service;
      type = report.type;
      title = report.title;
    }


    return (
        <div style={{marginLeft: "500px", marginTop: "100px"}}>
          <div >
            <div >
              <h3 >
                Update Spock Report
              </h3>
            </div>
            <div class="panel-body">
              <div>
                <input type="file" name="file"
                       onChange={this.handleFileSelected}
                       accept="html/*"/>
                <button onClick={this.handleUploadFile}>Upload File</button>
              </div>

              <span> Uploading report: % {uploadProgress} </span>

              <form onSubmit={this.handleUpdate}>
                <div>
                  <label>Phase: {phase}</label>
                </div>
                <div>
                  <label>Service: {service}</label>
                </div>
                <div>
                  <label>Type: {type}</label>
                </div>
                <div>
                  <label>Title: {title}</label>
                </div>
                <button type="submit">Update</button>
              </form>
            </div>
          </div>
        </div>
    );
  }

}

const mapStateToProps = (state) => {
  // console.log('state in update report');
  // console.log(state);
  let report = null;
  if (state.report != null) {
    report = state.report.getReport;
  }
  return {
    auth: state.firebase.auth,
    report: report
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getReport: (id, phase) => dispatch(getReport(id, phase)),
    updateReport: (id, phase, report) => dispatch(updateReport(id, phase, report)),
    resetState: () => dispatch(resetState())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateReport);
