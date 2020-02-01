
const initState = {
  serviceStats: null
};


const reportReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPLOAD_REPORT_SUCCESS':
      return {
        ...state,
        devFileDownLoadUrl: action.fileDownLoadUrl
      };

    case 'UPLOAD_REPORT_ERROR':
      // console.log('UPLOAD_REPORT_ERROR', action.error);
      return state;

    case 'CREATE_REPORT_SUCCESS':
      console.log('CREATE_REPORT_SUCCESS', action.id);
      return {
        ...state,
        createTestNewTestId: action.id
      };

    case 'CREATE_REPORT_ERROR':
      // console.log('CREATE_REPORT_ERROR', action.error);
      return {
        ...state,
        createTestNewTestId: null
      };

    case 'RESET_CREATE_REPORT':
      // console.log('RESET_CREATE_REPORT', action.error);
      return {
        ...state,
        createReportSuccess: null
      };

      /**
       * Get Report
       */
    case 'GET_REPORT_SUCCESS':
      // console.log('GET_REPORT_SUCCESS', action.report);
      return {
        ...state,
        getReport: action.report
      };

    case 'GET_REPORT_ERROR_NOT_EXIST':
      // console.log('GET_REPORT_ERROR_NOT_EXIST', action.error);
      return {
        ...state,
        getReport: 'GET_REPORT_ERROR_NOT_EXIST'
      };

    case 'GET_REPORT_ERROR':
      console.log('GET_REPORT_ERROR', action.error);
      return state;

    case 'RESET_GET_REPORT':
      // console.log('RESET_GET_FEATURE_REPORTS');
      return {
        ...state,
        getReport: null
      };

      /**
       * Delete Report
       */
    // case 'DELETE_REPORT_SUCCESS':
    //   console.log('DELETE_REPORT_SUCCESS');
    //   return state;
    //
    // case 'DELETE_REPORT_ERROR':
    //   console.log('DELETE_REPORT_ERROR', action.error);
    //   return state;

      /**
       * Get Feature Reports
       */
    case 'GET_COMPLETED_FEATURE_REPORTS_EMPTY':
      console.log('GET_COMPLETED_FEATURE_REPORTS_EMPTY');
      return {
        ...state,
        completedFeatureReports: []
      };

    case 'GET_COMPLETED_FEATURE_REPORTS_SUCCESS':
      // console.log('GET_COMPLETED_FEATURE_REPORTS_SUCCESS', action.completedFeatureReports);
      return {
        ...state,
        completedFeatureReports: action.completedFeatureReports
      };

    case 'GET_COMPLETED_FEATURE_REPORTS_ERROR':
      console.log('GET_COMPLETED_FEATURE_REPORTS_ERROR', action.error);
      return state;

    case 'RESET_GET_FEATURE_REPORTS':
      console.log('RESET_GET_FEATURE_REPORTS');
      return {
        ...state,
        completedFeatureReports: null
      };

      /**
       * Get Endpoint Reports
       */
    case 'GET_COMPLETED_ENDPOINT_REPORTS_EMPTY':
      console.log('GET_COMPLETED_ENDPOINT_REPORTS_EMPTY');
      return {
        ...state,
        endpointReports: []
      };

    case 'GET_COMPLETED_ENDPOINT_REPORTS_SUCCESS':
      // console.log('GET_COMPLETED_ENDPOINT_REPORTS_SUCCESS', action.endpointReports);
      return {
        ...state,
        endpointReports: action.endpointReports
      };

    case 'GET_COMPLETED_ENDPOINT_REPORTS_ERROR':
      console.log('GET_COMPLETED_ENDPOINT_REPORTS_ERROR', action.error);
      return state;

    case 'RESET_GET_ENDPOINT_REPORTS':
      console.log('RESET_GET_ENDPOINT_REPORTS');
      return {
        ...state,
        endpointReports: null
      };

      /**
       * Get Reports
       */
    case 'GET_REPORTS_IN_DEVELOPMENT_EMPTY':
      console.log('GET_REPORTS_IN_DEVELOPMENT_EMPTY');
      return {
        ...state,
        reportsInDevelopment: []
      };

    case 'GET_REPORTS_IN_DEVELOPMENT_SUCCESS':
      // console.log('GET_REPORTS_IN_DEVELOPMENT_SUCCESS', action.reports);
      return {
        ...state,
        reportsInDevelopment: action.reportsInDevelopment
      };

    case 'GET_REPORTS_IN_DEVELOPMENT_ERROR':
      console.log('GET_REPORTS_IN_DEVELOPMENT_ERROR', action.error);
      return state;

    case 'RESET_GET_REPORTS_IN_DEVELOPMENT':
      console.log('RESET_GET_REPORTS_IN_DEVELOPMENT');
      return {
        ...state,
        reportsInDevelopment: null
      };

      /**
       * Update Report
       */
    case 'UPDATE_REPORT_SUCCESS':
      // console.log('UPDATE_REPORT_SUCCESS', action.report);
      return {
        ...state,
        updateReportResult: 'success'
      };

    case 'UPDATE_REPORT_ERROR':
      // console.log('UPDATE_REPORT_ERROR', action.error);
      return state;

    case 'RESET_UPDATE_REPORT_STATE':
      console.log('RESET_UPDATE_REPORT_STATE');
      return {
        ...state,
        updateReportResult: null
      };

    case 'DOWNLOAD_REPORT_SUCCESS':
      return {
        ...state,
        reportDownload: action.reportDownload
      };

    case 'DOWNLOAD_REPORT_ERROR':
      console.log('DOWNLOAD_REPORT_ERROR', action.error);
      return state;


    case 'RESET_STATE_SUCCESS':
      console.log('RESET_STATE_SUCCESS');
      return {
        ...state,
        reportDownload: null
      };

      /**
       * serviceStats
       */
    case 'GET_SERVICE_STATS_SUCCESS_NOT_EXIST':
      console.log('GET_SERVICE_STATS_SUCCESS_NOT_EXIST');
      return {
        ...state,
        serviceStats: null
      };

    case 'GET_SERVICE_STATS_SUCCESS':
      console.log('GET_SERVICE_STATS_SUCCESS', action.serviceStats);
      return {
        ...state,
        serviceStats: action.serviceStats
      };

    case 'GET_SERVICE_STATS_ERROR':
      console.log('GET_SERVICE_STATS_ERROR', action.error);
      return state;

    case 'RESET_GET_SERVICE_STATS':
      console.log('RESET_GET_SERVICE_STATS', action.error);
      return {
        ...state,
        serviceStats: null
      };
    default:
      return state;

  }
};

export default reportReducer;
