import firebase from "../../fbConfig"
import React from "react";

import {
  getFeaturesCollectionUrl,
  getReportsCollectionUrl
} from "../../util/StringUtil";

export const getFeaturesByService = (service) => {
  const collectionUrl = getFeaturesCollectionUrl();
  console.log('getFeaturesByService....', service);
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    // .orderBy('title')
    // .orderBy('createdAt', 'desc')
    .onSnapshot(querySnapshot => {
      let features = [];
      if (querySnapshot.empty) {
        console.log(`getFeaturesByService EMPTY`);
        dispatch({type: 'GET_FEATURES_BY_SERVICE_EMPTY'});
      } else {
        querySnapshot.forEach(doc => {
          features.push({id: doc.id, ...doc.data()})
        });
        console.log(`getFeaturesByService NOT_EMPTY`);
        dispatch({type: 'GET_FEATURES_BY_SERVICE_SUCCESS', features : features});
      }

    }, err => {
      console.log(`getFeaturesByService error: ${err}`);
      dispatch({type: 'GET_FEATURES_BY_SERVICE_ERROR', error: err});
    });
  }
};

export const unsubscribeGetFeaturesByService = (service) => {
  const collectionUrl = getFeaturesCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    // .orderBy('title')
    .onSnapshot(() => { });
  }
};

export const resetGetFeaturesByService = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_FEATURES_BY_SERVICE'});
  }
};

export const getFeature = (id) => {
  // console.log(`getFeature---- ${id}`);
  const collectionUrl = getFeaturesCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .doc(id)
    .onSnapshot(snapshot => {
      if (!snapshot.exists) {
        dispatch({type: 'GET_FEATURE_ERROR_NOT_EXIST'});
      } else {
        let feature = {...snapshot.data(), id};
        dispatch({type: 'GET_FEATURE_SUCCESS', feature: feature});
      }

    }, err => {
      dispatch({type: 'GET_FEATURE_ERROR', error: err});
    });
  }
};

export const unsubscribeGetFeature = (id) => {
  const collectionUrl = getFeaturesCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .doc(id)
    .onSnapshot(() => { });
  }
};

export const resetGetFeature = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_FEATURE'});
  }
};

export const deleteFeature = (id) => {
  // console.log(`deleteFeature---- ${id}`);
  const collectionUrl = getFeaturesCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .doc(id)
    .delete().then(
        result => {
          dispatch({type: 'DELETE_FEATURE_SUCCESS'});
        }, err => {
          dispatch({type: 'DELETE_FEATURE_ERROR', error: err});
        }
    );
  }
};

export const updateFeature = (id, feature) => {
  return (dispatch, getState) => {
    const collectionUrl = getFeaturesCollectionUrl();
    // console.log('updateFeature action', id, feature);
    const user = getState().auth.user;

    firebase.firestore().collection(collectionUrl)
    .doc(id)
    .update({
      ...feature,
      updatedAt: new Date(),
      updatedBy: {id: user.uid, displayName: user.displayName}
    }).then(() => {
      dispatch({type: 'UPDATE_FEATURE_SUCCESS'});
    }).catch(err => {
      dispatch({type: 'UPDATE_FEATURE_ERROR', err});
    });
  }
};

export const resetUpdateReportState = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_UPDATE_FEATURE_STATE'});
  }
};
