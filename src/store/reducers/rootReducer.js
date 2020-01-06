import authReducer from './authReducer'
import taskReducer from './taskReducer'
import reportReducer from "./reportReducer";

import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'


const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  report: reportReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

export default rootReducer
