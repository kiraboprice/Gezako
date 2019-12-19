import firebase from "firebase";

const initState = {
  reports: "getFeatureReports()"
}

function getFeatureReports() {

  // Getting feature reports (Also include time stamps when uploading reports so that we can order them by date)
  firebase.firestore().collection('spock-reports').where('reportType', '==', 'feature').limit(15).onSnapshot(snapshot =>{
    if(snapshot.size){
      return snapshot.docs
    }
    else{

    }
  }, err => {
    console.log(`Encountered error: ${err}`);
  })
}

const featureReportReducer = (state = initState, action) => {
  return state;
};

export default featureReportReducer;