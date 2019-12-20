import firebase from "firebase";
import {getFirebase} from "react-redux-firebase";
import {getFirestore} from "redux-firestore";


export const fetchFeatureReports = (reportType) => { //reportType param is not needed. just left here to know it's possible
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    // // Getting feature reports (Also include time stamps when uploading reports so that we can order them by date)
    // let reports
    // firebase.firestore().collection('spock-reports').where('reportType', '==', 'feature').limit(15).onSnapshot(snapshot =>{
    //   if(snapshot.size){
    //     reports = snapshot.docs
    //   }
    //   else{
    //
    //   }
    // }, err => {
    //   console.log(`Encountered error: ${err}`);
    // })

    dispatch({ type: 'FETCHED_FEATURE_REPORTS', reports: "---" }); //todo return the reports here!
  }
};
