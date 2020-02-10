import firebase from "../../fbConfig"
import React from "react";

import {getFeaturesCollectionUrl} from "../../util/StringUtil";

export const getFeaturesByService = (service) => {
  const collectionUrl = getFeaturesCollectionUrl();
  console.log('getFeaturesByService....', service);
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    // .orderBy('title')
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
