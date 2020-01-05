import authReducer from './authReducer'
import taskReducer from './taskReducer'
import completedReportReducer from "./completedReportReducer";
import developmentReportReducer from "./developmentReportReducer";

import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'


const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  completedReport: completedReportReducer,
  developmentReport: developmentReportReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer
