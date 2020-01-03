import {BASE_DOCUMENT} from "../../constants/Constants";
import firebase from 'firebase';

//this is not in use
export const uploadDevelopmentReport = (file) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    // const firebase = getFirebase;
    const storageRef = firebase.storage().ref();

    var metadata = {
      contentType: 'text/html'
    };

    var uploadTask = storageRef.child(
        'spockreports/' + file.name).put(
        file, metadata);

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
          uploadTask.snapshot.ref.getDownloadURL().then(
              function (fileDownLoadUrl) {
                dispatch({
                  type: 'UPLOAD_DEVELOPMENT_REPORT_SUCCESS',
                  fileDownLoadUrl
                });
              }).catch(err => {
            dispatch({type: 'UPLOAD_DEVELOPMENT_REPORT_ERROR'}, err);
          });
        });
  }
};

export const createDevelopmentReport = (report) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;

    console.log("report")
    console.log(report)
    firestore.collection(BASE_DOCUMENT + 'developmentreports').add({
      ...report,
      //just leaving this here to show possibility of using profile in an action. but this is not scalable. if the displayName ever gets updated, we'd need a cloud function which listens on the user collection for this user specifically, then updates everywhere.
      createdBy: profile.displayName,
      userId: userId,
      createdAt: new Date()
    }).then(() => {
      dispatch({type: 'CREATE_DEVELOPMENT_REPORT_SUCCESS'});
    }).catch(err => {
      dispatch({type: 'CREATE_DEVELOPMENT_REPORT_ERROR'}, err);
    });
  }
};
