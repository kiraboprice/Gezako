import authReducer from './authReducer'
import taskReducer from './taskReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer
});

export default rootReducer
