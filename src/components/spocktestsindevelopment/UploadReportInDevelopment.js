import React, {Component} from 'react';
import {connect} from 'react-redux'
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import {createDevelopmentReport} from "../../store/actions/developmentReportActions";
import {BASE_DOCUMENT} from "../../constants/Constants";

class UploadReportInDevelopment extends Component {
  ref = firebase.firestore().collection(BASE_DOCUMENT + 'spock-reports');
  storageRef = firebase.storage().ref();

  state = {
    service: '',
    reportType: '',
    reportTitle: '',
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
            state["fileDownLoadUrl"] = downloadUrl
            context.setState(state);
            context.updateContextState(context)
          });
        });

  }

  updateContextState(context) {
    this.state = context.state
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {service, reportType, reportTitle, fileDownLoadUrl} = this.state;
    var jsonObject = {
      service,
      reportType,
      reportTitle,
      fileDownLoadUrl
    };
    this.props.createDevelopmentReport(this.state);
    this.props.history.push('/development');

  };

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
              <h4><Link to="/" class="btn btn-primary">Upload Report for a test
                in Development</Link></h4>
              <div className="form-group">
                <input type="file" name="file" onChange={this.handleFileSelected}
                       accept="html/*"/>
                <button onClick={this.handleUploadFile}>Upload File</button>
              </div>
              <form onSubmit={this.handleSubmit}>
                <div class="form-group">
                  <label for="title">Service:</label>
                  <input type="text" class="form-control" name="service"
                         value={service} onChange={this.handleChange}
                         placeholder="service"/>
                </div>
                <div class="form-group">
                  <label for="description">Report Type:</label>
                  <textArea class="form-control" name="reportType"
                            onChange={this.handleChange}
                            placeholder="reportType"
                            cols="80" rows="3">{reportType}</textArea>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Report Title:</label>
                  <textArea class="form-control" name="reportTitle"
                            onChange={this.handleChange}
                            placeholder="reportTitle"
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

const mapDispatchToProps = dispatch => {
  return {
    createDevelopmentReport: (report) => dispatch(createDevelopmentReport(report))
  }
};

export default connect(null, mapDispatchToProps)(UploadReportInDevelopment);
