import firebase from "../../fbConfig"

import {BASE_DOCUMENT} from "../../constants/FireStore";

export const createTask = (task) => {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    firebase.firestore().collection(BASE_DOCUMENT + 'tasks').add({
      ...task,
      //just leaving this here to show possibility of using profile in an action. but this is not scalable. if the displayName ever gets updated, we'd need a cloud function which listens on the user collection for this user specifically, then updates everywhere.
      createdBy: user.displayName,
      userId: user.uid,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_TASK_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_TASK_ERROR', err });
    });
  }
};
