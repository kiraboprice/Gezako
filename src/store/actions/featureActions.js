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
    .orderBy('createdAt', 'desc')
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
    // console.log('updateFeature action----', id, feature);
    const user = getState().auth.user;

    firebase.firestore().collection(collectionUrl)
    .doc(id)
    .update({
      ...feature
    }).then(() => {
      dispatch({type: 'UPDATE_FEATURE_SUCCESS'});
    }).catch(err => {
      dispatch({type: 'UPDATE_FEATURE_ERROR', err});
    });
  }
};

export const resetUpdateFeature = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_UPDATE_FEATURE_STATE'});
  }
};

/**
 * Comments
 */

export const createFeatureComment = (featureId, comment) => {
  // console.log("createFeatureComment---", report);
  const collectionUrl = getFeaturesCollectionUrl();
  return (dispatch, getState) => {
    const user = getState().auth.user;
    firebase.firestore().collection(`${collectionUrl}/${featureId}/comments`)
    .add({
      ...comment
    }).then((docRef) => {
      dispatch({type: 'CREATE_FEATURE_COMMENT_SUCCESS', id: docRef.id});
    }).catch(err => {
      dispatch({type: 'CREATE_FEATURE_COMMENT_ERROR', err});
    });
  }
};

export const getFeatureComments = (featureId) => {
  const collectionUrl = getFeaturesCollectionUrl();
  console.log('getCommentsByFeatureId....', featureId);
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}/${featureId}/comments`)
    .orderBy('createdAt')
    .onSnapshot(querySnapshot => {
      let comments = [];
      if (querySnapshot.empty) {
        // console.log(`getCommentsByFeatureId EMPTY`);
        dispatch({type: 'GET_FEATURE_COMMENTS_EMPTY'});
      } else {
        querySnapshot.forEach(doc => {
          comments.push({id: doc.id, ...doc.data()})
        });
        // console.log(`getCommentsByFeatureId NOT_EMPTY`);
        dispatch({type: 'GET_FEATURE_COMMENTS_SUCCESS', comments : comments});
      }

    }, err => {
      console.log(`getCommentsByFeatureId error: ${err}`);
      dispatch({type: 'GET_FEATURE_COMMENTS_ERROR', error: err});
    });
  }
};

export const unsubscribeGetFeatureComments = (featureId) => {
  const collectionUrl = getFeaturesCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}/${featureId}/comments`)
    .orderBy('createdAt')
    .onSnapshot(() => { });
  }
};

export const resetGetFeatureComments = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_FEATURE_COMMENTS'});
  }
};

export const updateFeatureComment = (featureId, comment) => {
  return (dispatch, getState) => {
    const collectionUrl = getFeaturesCollectionUrl();
    // console.log('updateFeatureComment action', featureId);
    const user = getState().auth.user;

    firebase.firestore().collection(`${collectionUrl}/${featureId}/comments`)
    .doc(comment.id)
    .update({
      ...comment
    }).then(() => {
      dispatch({type: 'UPDATE_FEATURE_COMMENT_SUCCESS'});
    }).catch(err => {
      dispatch({type: 'UPDATE_FEATURE_COMMENT_ERROR', err});
    });
  }
};

export const deleteFeatureComment = (featureId, commentId) => {
  const collectionUrl = getFeaturesCollectionUrl();
  return (dispatch, getState) => {
    firebase.firestore().collection(`${collectionUrl}/${featureId}/comments`)
    .doc(commentId)
    .delete().then(
        result => {
          dispatch({type: 'DELETE_FEATURE_COMMENT_SUCCESS'});
        }, err => {
          dispatch({type: 'DELETE_FEATURE_COMMENT_ERROR', error: err});
        }
    );
  }
};

