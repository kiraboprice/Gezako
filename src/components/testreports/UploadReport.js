import React, {Component} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {createReport} from "../../store/actions/reportActions";
import * as firebase from "firebase";

import "./upload.css";

class UploadReport extends Component {
  storageRef = firebase.storage().ref();

  state = {
    phase: "development",
    service: "loans",
    type: "endpoint",
    title: "Test Report Title",
    file: "",
    fileDownLoadUrl: "",
    uploadProgress: 0
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFileSelected = e => {
    this.setState({
      [e.target.file]: e.target.files[0]
    });
  };

  //todo extract this to using actions and leave this component clean
  handleUploadFile = e => {
    const state = this.state;
    var context = this; //maybe this can be avoided by biding this function in the constructor? check commented code
    var metadata = {
      contentType: "text/html"
    };
    //todo update the spock-reports child
    //todo if uploading a dev report, upload to development-spock-reports child.
    //todo if uploading a complete report, upload to completed-spock-reports
    var uploadTask = this.storageRef
    .child("spock-reports/" + state[e.target.file].name)
    .put(state[e.target.file], metadata);

    uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          var progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          state.uploadProgress = progress;

          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED:
              console.log("Upload is paused");
              break;
            case firebase.storage.TaskState.RUNNING:
              console.log("Upload is running");
              break;
          }
        },
        function (error) {
          switch (error.code) {
            case "storage/unauthorized":
              // User doesn't have permission to access the object
              break;

            case "storage/canceled":
              // User canceled the upload
              break;

            case "storage/unknown":
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        },
        function () {
          // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref
          .getDownloadURL()
          .then(function (downloadUrl) {
            state["fileDownLoadUrl"] = downloadUrl;
            context.setState(state);
            context.updateContextState(context);
          });
        }
    );
  };

  updateContextState(context) {
    this.state = context.state;
  }

  handleSubmit = e => {
    e.preventDefault();
    const {phase, service, type, title, fileDownLoadUrl} = this.state;
    const report = {
      phase,
      service,
      type,
      title,
      fileDownLoadUrl
    };
    this.props.createReport(report);

    if (phase == "development") {
      this.props.history.push("/development");
    } else if (phase == "completed") {
      this.props.history.push("/");
    }
  };

  render() {
    const {phase, service, type, title, uploadProgress} = this.state;
    const {auth} = this.props;
    if (!auth.uid) {
      return <Redirect to="/login"/>;
    }
    return (
        <div id="upload">
          <h3 class="panel-title">Upload Spock Report</h3>
          <div class="panel-body">
            <div>
              <input
                  type="file"
                  name="file"
                  onChange={this.handleFileSelected}
                  accept="html/*"
              />
            </div>

            {/* ! Just a suggestion, maybe display this onSubmit? */}
            <span id="uploading">
						{" "}
              Uploading report: % {uploadProgress}{" "}
					</span>

            <form onSubmit={this.handleSubmit} style={{marginTop: "25px"}}>
              <div>
                <div id="display-content">
                  <label>Phase: </label>
                  <select
                      name="phase"
                      value={phase}
                      onChange={this.handleChange}
                  >
                    <option value="development">
                      Development
                    </option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div id="display-content">
                  <label>Service: </label>
                  <select
                      name="service"
                      value={service}
                      onChange={this.handleChange}
                  >
                    <option value="loans">Loans</option>
                    <option value="rails">Rails</option>
                    <option value="users">Users</option>
                    <option value="auth">Auth</option>
                    <option value="approval">Approval</option>
                  </select>
                </div>

                <div id="display-content">
                  <label>Report Type: </label>
                  <select
                      name="type"
                      value={type}
                      onChange={this.handleChange}
                  >
                    <option value="feature">Feature</option>
                    <option value="endpoint">Endpoint</option>
                  </select>
                </div>

                <div id="display-content">
                  <label>Report Title:</label>
                  <textarea
                      class="form-control"
                      name="title"
                      onChange={this.handleChange}
                  >
									{title}
								</textarea>
                </div>

                {/* ! Make sure someone has actually uploaded and filled out the required spaces because
                  I was able to submit (by accident) without uploading or filling out the spaces */}
                <button id="submit-report" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    createReport: report => dispatch(createReport(report))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadReport);
