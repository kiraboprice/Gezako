import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import * as firebase from "firebase";


const FileUpload = (props) => {

  const [file, setFile] = useState();

  const [storageLocation, setStorageLocation] = useState('spock-reports/');

  useEffect(() => {
    setStorageLocation(props.storageLocation);
  }, [props]);

  const handleFileSelected = (e) => {
    setFile(e.target.files[0]);
    props.setUserSelectedAFile(true);
  };

  const handleUploadProgress= (progress) => {
    props.setUploadProgress(progress);
  };

  const handleFileUploaded= (fileDownLoadUrl) => {
    // console.log("file download url----", fileDownLoadUrl);
    props.setFileDownLoadUrl(fileDownLoadUrl);
  };

  useEffect(() => {
    if(props.uploadSelectedFile === true){
      uploadSelectedFile()
    }
  }, [props.uploadSelectedFile]);

  const uploadSelectedFile = (e) => {
    var metadata = {
      contentType: 'text/html'
    };
    //todo update the spock-reports child
    //todo if uploading a dev report, upload to development-spock-reports child.
    //todo if uploading a complete report, upload to completed-spock-reports
    var uploadTask = firebase.storage().ref()
    .child(storageLocation + file.name)
    .put(file, metadata);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        function (snapshot) {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes)
              * 100;
          handleUploadProgress(progress);

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
            handleFileUploaded(downloadUrl)
          });
        }
    );
  };

  return (
      <div>
        <input
            type='file'
            name='file'
            onChange={handleFileSelected}
            accept='html/*'
        />
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(FileUpload)
