import firebase from "../../fbConfig"

import {
  getAppsUrl
} from "../../util/StringUtil";
import React from "react";

export const createApp = (app) => { //todo unsubscribe from this!!

  // console.log("createApp---", app);
  return (dispatch, getState) => {
    const user = getState().auth.user;
    const appsUrl = getAppsUrl(getState().auth.user.company);
    firebase.firestore().collection(appsUrl).add({
      ...app,
      createdBy: user.displayName,
      userId: user.uid,
      createdAt: new Date(),
      updatedAt: new Date()
    }).then((docRef) => {
      dispatch({type: 'CREATE_APP_SUCCESS', id: docRef.id});
    }).catch(err => {
      dispatch({type: 'CREATE_APP_ERROR', err});
    });
  }
};

//
// export const resetCreateTestSuccess = () => {
//   return (dispatch) => {
//     dispatch({type: 'RESET_CREATE_REPORT'});
//   }
// };

export const getApps = () => { //todo unsubscribe from this!!

  return (dispatch, getState) => {
    const user = getState().auth.user;
    firebase.firestore().collection(getAppsUrl(getState().auth.user.company)).get()
        .then((snapshot) => {
          let apps = [];
          if (snapshot.empty) {
            dispatch({type: 'GET_APPS_NO_APPS'});
          } else {
            snapshot.forEach(doc => {
                apps.push({id: doc.id, ...doc.data()})
            });
            dispatch({type: 'GET_APPS_SUCCESS', apps: apps});
          }
        }).catch(err => {
      dispatch({type: 'GET_APPS_ERROR', err});
    });
  }
};
