
const initState = null;


const completedReportReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_COMPLETED_REPORT_SUCCESS':
      // console.log('CREATE_COMPLETED_REPORT_SUCCESS', action.report);
      return state;

    case 'CREATE_COMPLETED_REPORT_ERROR':
      // console.log('CREATE_COMPLETED_REPORT_ERROR', action.err);
      return state;

    default:
      return state;

  }
};

export default completedReportReducer;
