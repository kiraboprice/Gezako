import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CreateSpockReport extends Component {

  constructor() {
    super();
    this.ref = firebase.firestore().collection('spock-reports');
    this.storageRef = firebase.storage().ref();
    this.state = {
      service: '',
      reportType: '',
      reportTitle: '',
      file: '',
      fileDownLoadUrl: ''
    };
    // this.uploadFile = this.uploadFile.bind(this); //todo experiment with this
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onFileSelected = (e) => {
    const state = this.state
    state[e.target.file] = e.target.files[0]
    this.setState(state);
  }

  uploadFile = (e) => {
    const state = this.state
    var context = this //maybe this can be avoid be biding this function in the constructor? check commented code
    var metadata = {
      contentType: 'text/html'
    };
    var uploadTask = this.storageRef.child('spock-reports/' + state[e.target.file].name).put(
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
            state["fileDownLoadUrl"] = downloadUrl
            context.setState(state);
            context.updateContextState(context)
          });
        });

  }
  updateContextState(context) {
    this.state = context.state
  }

  onSubmit = (e) => {
    e.preventDefault();
    const {service, reportType, reportTitle, fileDownLoadUrl} = this.state;
    var jsonObject = {
      service,
      reportType,
      reportTitle,
      fileDownLoadUrl
    };

    axios.post(
        '/spock_reports',
        jsonObject)
    .then(res => {
      this.setState({
        service: '',
        reportType: '',
        reportTitle: '',
        fileDownloadURL: ''
      });
      this.props.history.push("/")
      return JSON.stringify(res.data);
    })
    .catch(err => console.error("Error adding document: ", err));
  }

  render() {
    const {service, reportType, reportTitle} = this.state;
    return (
        <div style={{marginLeft: "400px"}}>
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">
                Upload Spock Report
              </h3>
            </div>
            <div class="panel-body">
              <h4><Link to="/" class="btn btn-primary">Reports</Link></h4>
              <div className="form-group">
                <input type="file" name="file" onChange={this.onFileSelected}
                       accept="html/*"/>
                <button onClick={this.uploadFile}>Upload File</button>
              </div>
              <form onSubmit={this.onSubmit}>
                <div class="form-group">
                  <label for="title">Service:</label>
                  <input type="text" class="form-control" name="service"
                         value={service} onChange={this.onChange}
                         placeholder="service"/>
                </div>
                <div class="form-group">
                  <label for="description">Report Type:</label>
                  <textArea class="form-control" name="reportType"
                            onChange={this.onChange} placeholder="reportType"
                            cols="80" rows="3">{reportType}</textArea>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Report Title:</label>
                  <textArea class="form-control" name="reportTitle"
                            onChange={this.onChange} placeholder="reportTitle"
                            cols="80" rows="3">{reportTitle}</textArea>
                </div>
                <button type="submit" class="btn btn-success">Submit</button>
              </form>
            </div>
          </div>
        </div>
    );
  }

}

export default CreateSpockReport;
