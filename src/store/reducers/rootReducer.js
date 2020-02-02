import authReducer from './authReducer'
import taskReducer from './taskReducer'
import reportReducer from "./reportReducer";
import snackbarReducer from "./snackbarReducer";

import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  report: reportReducer,
  snackbar: snackbarReducer
});

export default rootReducer
