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
    .orderBy('title')
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
      updatedAt: new Date(), //todo construct this from the calling function
      updatedBy: {id: user.uid, displayName: user.displayName} //todo construct  this from the calling function
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
      ...comment,
      //just leaving this here to show possibility of using profile in an action. but this is not scalable. if the displayName ever gets updated, we'd need a cloud function which listens on the user collection for this user specifically, then updates everywhere.
      createdBy: user.displayName,
      userId: user.uid,
      createdAt: new Date(),
      updatedAt: new Date() //todo built all this shit from the calling component
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
    .orderBy('createdAt', 'desc')
    .get().then(querySnapshot => {
      let comments = [];
      if (querySnapshot.empty) {
        console.log(`getCommentsByFeatureId EMPTY`);
        dispatch({type: 'GET_FEATURE_COMMENTS_BY_FEATURE_ID_EMPTY'});
      } else {
        querySnapshot.forEach(doc => {
          comments.push({id: doc.id, ...doc.data()})
        });
        console.log(`getCommentsByFeatureId NOT_EMPTY`);
        dispatch({type: 'GET_FEATURE_COMMENTS_BY_FEATURE_ID_SUCCESS', comments : comments});
      }

    }, err => {
      console.log(`getCommentsByFeatureId error: ${err}`);
      dispatch({type: 'GET_FEATURE_COMMENTS_BY_FEATURE_ID_ERROR', error: err});
    });
  }
};

export const updateFeatureComment = (featureId, commentId, comment) => {
  return (dispatch, getState) => {
    const collectionUrl = getFeaturesCollectionUrl();
    // console.log('updateFeatureComment action', featureId);
    const user = getState().auth.user;

    firebase.firestore().collection(`${collectionUrl}/${featureId}/comments`)
    .doc(commentId)
    .update({
      ...comment,
      updatedAt: new Date(), //todo construct this from the calling function
      updatedBy: {id: user.uid, displayName: user.displayName} //todo construct  this from the calling function
    }).then(() => {
      dispatch({type: 'UPDATE_FEATURE_COMMENT_SUCCESS'});
    }).catch(err => {
      dispatch({type: 'UPDATE_FEATURE_COMMENT_ERROR', err});
    });
  }
};

export const deleteFeatureComment = (featureId, commentId) => {
  // console.log(`deleteFeatureComment---- ${id}`);
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

