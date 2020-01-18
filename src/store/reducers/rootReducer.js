import authReducer from './authReducer'
import taskReducer from './taskReducer'
import reportReducer from "./reportReducer";
import snackbarReducer from "./snackbarReducer";

import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  report: reportReducer,
  snackbar: snackbarReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer
