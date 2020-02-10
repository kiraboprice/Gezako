import authReducer from './authReducer';
import featureReducer from "./featureReducer";
import taskReducer from './taskReducer';
import reportReducer from "./reportReducer";
import snackbarReducer from "./snackbarReducer";

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  feature: featureReducer,
  task: taskReducer,
  report: reportReducer,
  snackbar: snackbarReducer
});

export default rootReducer
