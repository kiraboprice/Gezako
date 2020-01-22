import {BASE_DOCUMENT} from "../../constants/FireStore";
import firebase from 'firebase';

import axios from 'axios';
import * as ReportStatus from "../../constants/ReportStatus";
import {getCollectionUrl} from "../../util/StringUtil";

//this is not in use
export const uploadReport = (file) => {
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
                dispatch({type: 'UPLOAD_REPORT_SUCCESS', fileDownLoadUrl
                });
              }).catch(err => {
            dispatch({type: 'UPLOAD_REPORT_ERROR', err});
          });
        });
  }
};

export const createReport = (report) => {
  // console.log("REPORTTTTT", report);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    let collectionUrl = '';
    if(report.phase == 'development'){
      collectionUrl = BASE_DOCUMENT + '/developmentreports'
    } else if (report.phase == 'completed') {
      collectionUrl = BASE_DOCUMENT + '/completedreports'
    }
    firestore.collection(collectionUrl).add({
      ...report,
      //just leaving this here to show possibility of using profile in an action. but this is not scalable. if the displayName ever gets updated, we'd need a cloud function which listens on the user collection for this user specifically, then updates everywhere.
      createdBy: profile.displayName,
      userId: userId,
      status: ReportStatus.NEW,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then(() => {
      dispatch({type: 'CREATE_REPORT_SUCCESS'});
    }).catch(err => {
      dispatch({type: 'CREATE_REPORT_ERROR', err});
    });
  }
};

export const resetCreateReportSuccess = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_CREATE_REPORT'});
  }
};

export const getReport = (id, phase) => {
  // console.log(`getReport---- ${id}`);
  const collectionUrl = getCollectionUrl(phase);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${collectionUrl}`)
    .doc(id)
    .onSnapshot(snapshot => {
      if (!snapshot.exists) {
        dispatch({type: 'GET_REPORT_ERROR_NOT_EXISTS'});
      } else {
        dispatch({type: 'GET_REPORT_SUCCESS', report: snapshot.data()});
      }

    }, err => {
      dispatch({type: 'GET_REPORT_ERROR', error: err});
    });
  }
};

export const unsubscribeGetReport = (id, phase) => {
  const collectionUrl = getCollectionUrl(phase);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${collectionUrl}`)
    .doc(id)
    .onSnapshot(() => { });
  }
};

export const resetGetReport = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_REPORT'});
  }
};

export const getFeatureReports = (phase, service) => {
  // console.log(`getFeatureReports---- ${service}`);
  const collectionUrl = getCollectionUrl(phase);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    .where('type', '==', 'feature')
    .orderBy('updatedAt', 'desc')
    .onSnapshot(querySnapshot => {
      let featureReports = [];
      if (querySnapshot.empty) {
        dispatch({type: 'GET_FEATURE_REPORTS_EMPTY'});
      } else {
        querySnapshot.forEach(doc => {
          featureReports.push({id: doc.id, ...doc.data()})
        });
        dispatch({type: 'GET_FEATURE_REPORTS_SUCCESS', featureReports: featureReports});
      }

    }, err => {
      console.log(`getFeatureReports error: ${err}`);
      dispatch({type: 'GET_FEATURE_REPORTS_ERROR', error: err});
    });
  }
};

export const unsubscribeGetFeatureReports = (phase, service) => {
  const collectionUrl = getCollectionUrl(phase);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    .where('type', '==', 'feature')
    .orderBy('updatedAt', 'desc')
    .onSnapshot(() => { });
  }
};

export const resetGetFeatureReports = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_FEATURE_REPORTS'});
  }
};

export const getEndpointReports = (phase, service) => {
  // console.log(`getEndpointReports---- ${service}`);
  const collectionUrl = getCollectionUrl(phase);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    .where('type', '==', 'endpoint')
    .orderBy('updatedAt', 'desc')
    .onSnapshot(querySnapshot => {
      let endpointReports = [];
      if (querySnapshot.empty) {
        dispatch({type: 'GET_ENDPOINT_REPORTS_EMPTY'});
      } else {
        querySnapshot.forEach(doc => {
          endpointReports.push({id: doc.id, ...doc.data()})
        });
        dispatch({type: 'GET_ENDPOINT_REPORTS_SUCCESS', endpointReports: endpointReports});
      }

    }, err => {
      console.log(`getEndpointReports error: ${err}`);
      dispatch({type: 'GET_ENDPOINT_REPORTS_ERROR', error: err});
    });
  }
};

export const unsubscribeGetEndpointReports = (phase, service) => {
  const collectionUrl = getCollectionUrl(phase);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    .where('type', '==', 'endpoint')
    .orderBy('updatedAt', 'desc')
    .onSnapshot(() => { });
  }
};

export const resetGetEndpointReports = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_ENDPOINT_REPORTS'});
  }
};

export const updateReport = (id, report) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    let collectionUrl = '';
    if(report.phase === 'development'){
      collectionUrl = BASE_DOCUMENT + '/developmentreports'
    } else if (report.phase === 'completed') {
      collectionUrl = BASE_DOCUMENT + '/completedreports'
    }

    console.log('updateReport action', id, report);

    firestore.collection(collectionUrl).doc(id).update({
      title: report.title,
      phase: report.phase,
      service: report.service,
      type: report.type,
      fileDownLoadUrl: report.fileDownLoadUrl,
      assignedTo: report.assignedTo || null,
      numberOfTests: report.numberOfTests || 0,
      productSpec: report.productSpec || null,
      techSpec: report.techSpec || null,

      status: report.status || null,
      updatedAt: new Date(),
    }).then(() => {
      dispatch({type: 'UPDATE_REPORT_SUCCESS'});
    }).catch(err => {
      dispatch({type: 'UPDATE_REPORT_ERROR', err});
    });
  }
};

export const resetUpdateReportState = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_UPDATE_REPORT_STATE'});
  }
};

export const resetState = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_STATE_SUCCESS'});
  }
};

export const downloadReport = (report) => {
  return (dispatch) => {
    axios.get(report.fileDownLoadUrl)
    .then((reportDownload) =>  {
      dispatch({type: 'DOWNLOAD_REPORT_SUCCESS', report: report, reportDownload: reportDownload.data});
    })
    .catch((err) =>  {
      dispatch({type: 'DOWNLOAD_REPORT_ERROR', err});
    });
  }
};


export const getReportStats = (service) => {
  // console.log(`getReportStats---- ${service}`);
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${BASE_DOCUMENT}/reportstats/`).doc(service)
    .onSnapshot(docSnapshot => {
      dispatch({type: 'GET_REPORT_STATS_SUCCESS', reportStats: docSnapshot.data()});

    }, err => {
      console.log(`getReportStats error: ${err}`);
      dispatch({type: 'GET_REPORT_STATS_ERROR', error: err});
    });
  }
};

export const unsubscribeGetReportStats = (service) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${BASE_DOCUMENT}/reportstats/`).doc(service)
    .onSnapshot(() => { });
  }
};

export const resetGetReportStats = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_REPORT_STATS'});
  }
};

export const getCoverage = (service) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${BASE_DOCUMENT}/reportstats/${service}/coverage`).doc(`coverage`)
    .onSnapshot(docSnapshot => {
      dispatch({type: 'GET_COVERAGE_SUCCESS', coverage: docSnapshot.data()});

    }, err => {
      console.log(`getReportStats error: ${err}`);
      dispatch({type: 'GET_COVERAGE_ERROR', error: err});
    });
  }
};

export const unsubscribeGetCoverage = (service) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${BASE_DOCUMENT}/reportstats/${service}/coverage`).doc(`coverage`)
    .onSnapshot(() => { });
  }
};

export const resetGetCoverage = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_COVERAGE'});
  }
};

export const updateCoverage = (service, coverage) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();

    firestore.collection(`${BASE_DOCUMENT}/reportstats/${service}/coverage`).doc(`coverage`).set({
      class: coverage.classCoverage,
      method: coverage.methodCoverage,
      line: coverage.lineCoverage,
    }).then(() => {
      dispatch({type: 'UPDATE_COVERAGE_SUCCESS'});
    }).catch(err => {
      dispatch({type: 'UPDATE_COVERAGE_ERROR', err});
    });
  }
};
