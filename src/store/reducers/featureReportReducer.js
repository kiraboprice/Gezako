
const initState = {
  reports: "getFeatureReports()"
}

const featureReportReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_FEATURE_REPORTS':
      console.log('fetched feature reports', action.reports);
      //update the state?
      return state;

    case 'FETCH_FEATURE_REPORTS_ERROR':
      console.log('fetch feature reports failed', action.err);
      //update the state?
      return state;

    default:
      return state;

  }
};

export default featureReportReducer;