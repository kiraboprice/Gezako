import firebase from "../../fbConfig"
import firestore from "../../fbConfig"

import {BASE_DOCUMENT} from "../../constants/FireStore";

export const createTask = (task) => {
  return (dispatch, getState, {getFirestore}) => {
    const firestore = getFirestore();
    const profile = firebase.profile;
    const userId = firebase.auth.uid;
    firestore.collection(BASE_DOCUMENT + 'tasks').add({
      ...task,
      //just leaving this here to show possibility of using profile in an action. but this is not scalable. if the displayName ever gets updated, we'd need a cloud function which listens on the user collection for this user specifically, then updates everywhere.
      createdBy: profile.displayName,
      userId: userId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_TASK_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_TASK_ERROR', err });
    });
  }
};
