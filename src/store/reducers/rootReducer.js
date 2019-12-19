import authReducer from './authReducer'
import featureReportReducer from './featureReportReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: authReducer,
  featureReport: featureReportReducer
});

export default rootReducer
