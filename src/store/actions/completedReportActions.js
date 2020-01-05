import {BASE_DOCUMENT} from "../../constants/Constants";

export const createCompletedReport = (report) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const userId = getState().firebase.auth.uid;
    firestore.collection(BASE_DOCUMENT + 'completedreports').add({
      ...report,
      //just leaving this here to show possibility of using profile in an action. but this is not scalable. if the displayName ever gets updated, we'd need a cloud function which listens on the user collection for this user specifically, then updates everywhere.
      createdBy: profile.displayName,
      userId: userId,
      createdAt: new Date()
    }).then(() => {
      dispatch({ type: 'CREATE_COMPLETED_REPORT_SUCCESS' });
    }).catch(err => {
      dispatch({ type: 'CREATE_COMPLETED_REPORT_ERROR', err });
    });
  }
};
