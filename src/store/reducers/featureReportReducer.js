
const initState = {
  reports: "getFeatureReports()"
}

const featureReportReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCHED_FEATURE_REPORTS':
      console.log('xxxxxxxxxxxx action', action);
  }
  return state;
};

export default featureReportReducer;