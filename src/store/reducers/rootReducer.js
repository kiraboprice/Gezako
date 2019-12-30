import authReducer from './authReducer'
import taskReducer from './taskReducer'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  firestore: firestoreReducer
});

export default rootReducer
