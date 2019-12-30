
const initState = {
  reports: "getFeatureReports()"
}

const featureReportReducer = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS':
      console.log('fetched feature reports', action.reports);
      //update the state?
      return state;

    case 'FETCH_TASKS_ERROR':
      console.log('fetch feature reports failed', action.err);
      //update the state?
      return state;

    default:
      return state;

  }
};

export default featureReportReducer;