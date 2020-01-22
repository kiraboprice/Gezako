
const initState = {
  getReport: null,
  reportDownload: null
};


const reportReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPLOAD_REPORT_SUCCESS':
      return {
        ...state,
        devFileDownLoadUrl: action.fileDownLoadUrl
      };

    case 'UPLOAD_REPORT_ERROR':
      // console.log('UPLOAD_REPORT_ERROR', action.err);
      return state;

    case 'CREATE_REPORT_SUCCESS':
      console.log('CREATE_REPORT_SUCCESS', action.report);
      return {
        ...state,
        createReportSuccess: 'success'
      };

    case 'CREATE_REPORT_ERROR':
      // console.log('CREATE_REPORT_ERROR', action.err);
      return {
        ...state,
        createReportSuccess: 'error'
      };

    case 'RESET_CREATE_REPORT':
      // console.log('RESET_CREATE_REPORT', action.err);
      return {
        ...state,
        createReportSuccess: null
      };

    case 'GET_REPORT_SUCCESS':
      // console.log('GET_REPORT_SUCCESS', action.report);
      return {
        ...state,
        getReport: action.report
      };

    case 'GET_REPORT_ERROR_NOT_EXISTS':
      // console.log('GET_REPORT_ERROR_NOT_EXISTS', action.err);
      return state;

    case 'GET_REPORT_ERROR':
      // console.log('GET_REPORT_ERROR', action.err);
      return state;


      /**
       * Get Feature Reports
       */
    case 'GET_FEATURE_REPORTS_EMPTY':
      console.log('GET_FEATURE_REPORTS_EMPTY');
      return state;

    case 'GET_FEATURE_REPORTS_SUCCESS':
      console.log('GET_FEATURE_REPORTS_SUCCESS', action.featureReports);
      return {
        ...state,
        featureReports: action.featureReports
      };

    case 'GET_FEATURE_REPORTS_ERROR':
      console.log('GET_FEATURE_REPORTS_ERROR', action.err);
      return state;

    case 'RESET_GET_FEATURE_REPORTS':
      console.log('RESET_GET_FEATURE_REPORTS');
      return state;


      /**
       * Get Endpoint Reports
       */
    case 'GET_ENDPOINT_REPORTS_EMPTY':
      console.log('GET_ENDPOINT_REPORTS_EMPTY');
      return state;

    case 'GET_ENDPOINT_REPORTS_SUCCESS':
      console.log('GET_ENDPOINT_REPORTS_SUCCESS', action.endpointReports);
      return {
        ...state,
        endpointReports: action.endpointReports
      };

    case 'GET_ENDPOINT_REPORTS_ERROR':
      console.log('GET_ENDPOINT_REPORTS_ERROR', action.err);
      return state;

    case 'RESET_GET_ENDPOINT_REPORTS':
      console.log('RESET_GET_ENDPOINT_REPORTS');
      return state;

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
      // console.log('UPDATE_REPORT_ERROR', action.err);
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
      console.log('DOWNLOAD_REPORT_ERROR', action.err);
      return state;


    case 'RESET_STATE_SUCCESS':
      // console.log('RESET_STATE_SUCCESS');
      return {
        ...state,
        getReport: null,
        reportDownload: null
      };

      /**
       * reportStats
       */
    case 'GET_REPORT_STATS_SUCCESS':
      console.log('GET_REPORT_STATS_SUCCESS', action.reportStats);
      return {
        ...state,
        reportStats: action.reportStats
      };

    case 'GET_REPORT_STATS_ERROR':
      console.log('GET_REPORT_STATS_ERROR', action.err);
      return state;

    case 'RESET_GET_REPORT_STATS':
      console.log('RESET_GET_REPORT_STATS', action.err);
      return {
        ...state,
        reportStats: null
      };

      /**
       * coverage
       */
    case 'GET_COVERAGE_SUCCESS':
      console.log('GET_COVERAGE_SUCCESS', action.coverage);
      if(action.coverage){
        return {
          ...state,
          coverage: action.coverage
        };
      }
      else {
        return {
          ...state,
          coverage: null
        };
      }

    case 'GET_COVERAGE_ERROR':
      console.log('GET_COVERAGE_ERROR', action.err);
      return state;

    case 'UPDATE_COVERAGE_SUCCESS':
      console.log('UPDATE_COVERAGE_SUCCESS');
      return state;

    case 'UPDATE_COVERAGE_ERROR':
      console.log('UPDATE_COVERAGE_ERROR', action.err);
      return state;
    default:
      return state;

  }
};

export default reportReducer;
