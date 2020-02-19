import firebase from "../../fbConfig"

import {BASE_DOCUMENT} from "../../constants/FireStore";

import axios from 'axios';
import * as ReportStatus from "../../constants/ReportStatus";
import {
  getFeaturesCollectionUrl,
  getReportsCollectionUrl
} from "../../util/StringUtil";
import React from "react";

//this is not in use
export const uploadReport = (file) => {
  return (dispatch, getState) => {
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

export const createTest = (report) => {
  // console.log("createTest---", report);
  return (dispatch, getState) => {
    const user = getState().auth.user;
    const collectionUrl = getReportsCollectionUrl();
    firebase.firestore().collection(collectionUrl).add({
      ...report,
      //just leaving this here to show possibility of using profile in an action. but this is not scalable. if the displayName ever gets updated, we'd need a cloud function which listens on the user collection for this user specifically, then updates everywhere.
      createdBy: user.displayName,
      userId: user.uid,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then((docRef) => {
      dispatch({type: 'CREATE_REPORT_SUCCESS', id: docRef.id});
    }).catch(err => {
      dispatch({type: 'CREATE_REPORT_ERROR', err});
    });
  }
};

export const resetCreateTestSuccess = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_CREATE_REPORT'});
  }
};

export const getReport = (id) => {
  // console.log(`getReport---- ${id}`);
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .doc(id)
    .onSnapshot(snapshot => {
      if (!snapshot.exists) {
        dispatch({type: 'GET_REPORT_ERROR_NOT_EXIST'});
      } else {
        let test = {...snapshot.data(), id};
        dispatch({type: 'GET_REPORT_SUCCESS', report: test});
      }

    }, err => {
      dispatch({type: 'GET_REPORT_ERROR', error: err});
    });
  }
};

export const unsubscribeGetReport = (id) => {
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .doc(id)
    .onSnapshot(() => { });
  }
};

export const resetGetReport = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_REPORT'});
  }
};

export const deleteReport = (id) => {
  // console.log(`deleteReport---- ${id}`);
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .doc(id)
    .delete().then(
        result => {
            dispatch({type: 'DELETE_REPORT_SUCCESS'});
        }, err => {
          dispatch({type: 'DELETE_REPORT_ERROR', error: err});
        }
    );
  }
};

export const getCompletedFeatureReportsByService = (phase, service) => {
  const collectionUrl = getReportsCollectionUrl();
  // console.log(`collectionUrl---- ${collectionUrl}`);
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    .where('phase', '==', `completed`)
    .where('type', '==', 'feature')
    // .orderBy('updatedAt', 'desc')
    .orderBy('title')
    .onSnapshot(querySnapshot => {
      let completedFeatureReports = [];
      if (querySnapshot.empty) {
        dispatch({type: 'GET_COMPLETED_FEATURE_REPORTS_EMPTY'});
      } else {
        querySnapshot.forEach(doc => {
          completedFeatureReports.push({id: doc.id, ...doc.data()})
        });
        dispatch({type: 'GET_COMPLETED_FEATURE_REPORTS_SUCCESS', completedFeatureReports: completedFeatureReports});
      }

    }, err => {
      console.log(`getCompletedFeatureReportsByService error: ${err}`);
      dispatch({type: 'GET_COMPLETED_FEATURE_REPORTS_ERROR', error: err});
    });
  }
};

export const unsubscribeGetCompletedFeatureReportsByService = (phase, service) => {
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    .where('phase', '==', `completed`)
    .where('type', '==', 'feature')
    .orderBy('title')
    .onSnapshot(() => { });
  }
};

export const resetGetCompletedFeatureReportsByService = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_FEATURE_REPORTS'});
  }
};

export const getCompletedEndpointReportsByService = (phase, service) => {
  // console.log(`getCompletedEndpointReportsByService---- ${service}`);
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    .where('phase', '==', `completed`)
    .where('type', '==', 'endpoint')
    // .orderBy('updatedAt', 'desc')
    .orderBy('title')
    .onSnapshot(querySnapshot => {
      let endpointReports = [];
      if (querySnapshot.empty) {
        dispatch({type: 'GET_COMPLETED_ENDPOINT_REPORTS_EMPTY'});
      } else {
        querySnapshot.forEach(doc => {
          endpointReports.push({id: doc.id, ...doc.data()})
        });
        dispatch({type: 'GET_COMPLETED_ENDPOINT_REPORTS_SUCCESS', endpointReports: endpointReports});
      }

    }, err => {
      console.log(`getCompletedEndpointReportsByService error: ${err}`);
      dispatch({type: 'GET_COMPLETED_ENDPOINT_REPORTS_ERROR', error: err});
    });
  }
};

export const unsubscribeGetCompletedEndpointReportsByService = (phase, service) => {
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    .where('type', '==', 'endpoint')
    .orderBy('title')
    .onSnapshot(() => { });
  }
};

export const resetGetCompletedEndpointReportsByService = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_ENDPOINT_REPORTS'});
  }
};

/**
 * Get Reports
 */
export const getReportsInDevelopment = (phase, service) => {
  // console.log(`getReportsInDevelopment---- ${service}`);
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    .where('phase', '==', 'development')
    .orderBy('createdAt', 'desc')
    .onSnapshot(querySnapshot => {
      let reportsInDevelopment = [];
      if (querySnapshot.empty) {
        dispatch({type: 'GET_REPORTS_IN_DEVELOPMENT_EMPTY'});
      } else {
        querySnapshot.forEach(doc => {
          reportsInDevelopment.push({id: doc.id, ...doc.data()})
        });
        dispatch({type: 'GET_REPORTS_IN_DEVELOPMENT_SUCCESS', reportsInDevelopment: reportsInDevelopment});
      }

    }, err => {
      console.log(`getReportsInDevelopment error: ${err}`);
      dispatch({type: 'GET_REPORTS_IN_DEVELOPMENT_ERROR', error: err});
    });
  }
};

export const unsubscribeGetReportsInDevelopment = (phase, service) => {
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    .orderBy('createdAt', 'desc')
    .onSnapshot(() => { });
  }
};

export const resetGetReportsInDevelopment = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_REPORTS_IN_DEVELOPMENT'});
  }
};

export const updateReport = (id, report) => {
  return (dispatch, getState) => {
    const collectionUrl = getReportsCollectionUrl();
    // console.log('updateReport action', id, report);
    const user = getState().auth.user;

    firebase.firestore().collection(collectionUrl)
    .doc(id).update({
      title: report.title,
      phase: report.phase,
      // service: report.service, //should not be able to update a report's service
      type: report.type,
      fileDownLoadUrl: report.fileDownLoadUrl,
      assignedTo: report.assignedTo || null,
      numberOfTests: report.numberOfTests || 0,
      githubPR: report.githubPR || null,
      postmanTest: report.postmanTest || null,
      productSpec: report.productSpec || null,
      techSpec: report.techSpec || null,

      status: report.status,
      updatedAt: new Date(),
      updatedBy: {id: user.uid, displayName: user.displayName}
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

export const resetReportDownload = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_REPORT_DOWNLOAD'});
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


export const getServiceStats = (service) => {
  // console.log(`getServiceStats---- ${service}`);
  return (dispatch, getState) => {
    firebase.firestore().collection(`${BASE_DOCUMENT}/servicestats/`).doc(service)
    .onSnapshot(snapshot => {
      if (!snapshot.exists) {
        dispatch({type: 'GET_SERVICE_STATS_SUCCESS_NOT_EXIST'});
      } else {
        dispatch({type: 'GET_SERVICE_STATS_SUCCESS', serviceStats: snapshot.data()});
      }

    }, err => {
      console.log(`getServiceStats error: ${err}`);
      dispatch({type: 'GET_SERVICE_STATS_ERROR', error: err});
    });
  }
};

export const unsubscribeGetServiceStats = (service) => {
  return (dispatch, getState) => {
    firebase.firestore().collection(`${BASE_DOCUMENT}/servicestats/`).doc(service)
    .onSnapshot(() => { });
  }
};

export const resetGetserviceStats = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_SERVICE_STATS'});
  }
};

export const updateServiceStats = (service, serviceStats) => {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    firebase.firestore().collection(`${BASE_DOCUMENT}/servicestats/`).doc(service).set({
      classCoverage: serviceStats.classCoverage,
      methodCoverage: serviceStats.methodCoverage,
      lineCoverage: serviceStats.lineCoverage,
      serviceSpec: serviceStats.serviceSpec,
      coverageUpdatedAt: new Date(),
      coverageUpdatedBy: {id: user.uid, displayName: user.displayName}
    }).then(() => {
      dispatch({type: 'UPDATE_REPORT_STATS_SUCCESS'});
    }).catch(err => {
      dispatch({type: 'UPDATE_REPORT_STATS_ERROR', err});
    });
  }
};

/**
 *  Comments
 */

export const createSpockReportComment = (reportId, comment) => {
  console.log("createSpockReportComment---", reportId);
  console.log("createSpockReportComment---", comment);
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    const user = getState().auth.user;
    firebase.firestore().collection(`${collectionUrl}/${reportId}/comments`)
    .add({
      ...comment
    }).then((docRef) => {
      dispatch({type: 'CREATE_SPOCK_REPORT_COMMENT_SUCCESS', id: docRef.id});
    }).catch(err => {
      dispatch({type: 'CREATE_SPOCK_REPORT_COMMENT_ERROR', err});
    });
  }
};

export const getSpockReportComments = (reportId) => {
  const collectionUrl = getReportsCollectionUrl();
  console.log('getSpockReportComments', reportId);
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}/${reportId}/comments`)
    .orderBy('createdAt')
    .onSnapshot(querySnapshot => {
      let comments = [];
      if (querySnapshot.empty) {
        // console.log(`getSpockReportComments EMPTY`);
        dispatch({type: 'GET_SPOCK_REPORT_COMMENTS_EMPTY'});
      } else {
        querySnapshot.forEach(doc => {
          comments.push({id: doc.id, ...doc.data()})
        });
        // console.log(`getSpockReportComments NOT_EMPTY`);
        dispatch({type: 'GET_SPOCK_REPORT_COMMENTS_SUCCESS', comments : comments});
      }

    }, err => {
      console.log(`getSpockReportComments error: ${err}`);
      dispatch({type: 'GET_SPOCK_REPORT_COMMENTS_ERROR', error: err});
    });
  }
};

export const unsubscribeGetSpockReportComments = (reportId) => {
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}/${reportId}/comments`)
    .orderBy('createdAt')
    .onSnapshot(() => { });
  }
};

export const resetGetSpockReportComments = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_SPOCK_REPORT_COMMENTS'});
  }
};


export const updateSpockReportComment = (reportId, comment) => {
  return (dispatch, getState) => {
    const collectionUrl = getReportsCollectionUrl();
    // console.log('updateSpockReportComment action', featureId);
    const user = getState().auth.user;

    firebase.firestore().collection(`${collectionUrl}/${reportId}/comments`)
    .doc(comment.id)
    .update({
      ...comment
    }).then(() => {
      dispatch({type: 'UPDATE_SPOCK_REPORT_COMMENT_SUCCESS'});
    }).catch(err => {
      dispatch({type: 'UPDATE_SPOCK_REPORT_COMMENT_ERROR', err});
    });
  }
};

export const deleteSpockReportComment = (reportId, commentId) => {
  const collectionUrl = getReportsCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}/${reportId}/comments`)
    .doc(commentId)
    .delete().then(
        result => {
          dispatch({type: 'DELETE_SPOCK_REPORT_COMMENT_SUCCESS'});
        }, err => {
          dispatch({type: 'DELETE_SPOCK_REPORT_COMMENT_ERROR', error: err});
        }
    );
  }
};
