import React, {Component} from 'react';
import {connect} from 'react-redux'
// import firebase from '/firebase';
import {Link} from 'react-router-dom';
import {createReport} from "../../store/actions/reportActions";
import * as firebase from "firebase";

class UploadReport extends Component { //todo authenticate this page
  storageRef = firebase.storage().ref();

  state = {
    service: '',
    type: '',
    title: '',
    file: '',
    fileDownLoadUrl: ''
  };

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
    var uploadTask = this.storageRef.child(
        'spock-reports/' + state[e.target.file].name).put(
        state[e.target.file], metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes)
              * 100;
          console.log('Upload is ' + progress + '% done');
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

  handleSubmit = (e) => {
    e.preventDefault();
    const {service, type, title, fileDownLoadUrl} = this.state;
    const report = {
      service,
      type,
      title,
      fileDownLoadUrl
    };
    this.props.createDevelopmentReport(report);
    this.props.history.push('/development');
  };

  render() {
    const {service, type, title} = this.state;
    return (
        <div style={{marginLeft: "400px"}}>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Upload Spock Report
              </h3>
            </div>
            <div class="panel-body">
              <h4>Upload Report for a complete test or a test in
                development</h4>
              <div>
                <input type="file" name="file"
                       onChange={this.handleFileSelected}
                       accept="html/*"/>
                <button onClick={this.handleUploadFile}>Upload File</button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div>
                  <label>Service:</label>
                  <input type="text" name="service"
                         value={service} onChange={this.handleChange}/>
                </div>

                <div>
                  <label>Report Type:</label>
                  <textArea name="type"
                            onChange={this.handleChange}>{type}</textArea>
                </div>

                <div >
                  <label>Report Title:</label>
                  <textArea class="form-control" name="title"
                            onChange={this.handleChange}>{title}</textArea>
                </div>

                <button type="submit">Submit</button>
              </form>
            </div>
          </div>
        </div>
    );
  }

}

const mapDispatchToProps = dispatch => {
  return {
    createDevelopmentReport: (report) => dispatch(
        createReport(report))
  }
};

export default connect(null, mapDispatchToProps)(UploadReport);
