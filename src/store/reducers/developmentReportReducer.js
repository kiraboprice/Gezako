
const initState = null;


const devReportReducer = (state = initState, action) => {
  switch (action.type) {
    case 'UPLOAD_DEVELOPMENT_REPORT_SUCCESS':
      return {
        ...state,
        devFileDownLoadUrl: action.fileDownLoadUrl
      };

    case 'UPLOAD_DEVELOPMENT_REPORT_ERROR':
      // console.log('UPLOAD_DEVELOPMENT_REPORT_ERROR', action.err);
      return state;

    case 'CREATE_DEVELOPMENT_REPORT_SUCCESS':
      // console.log('CREATE_DEVELOPMENT_REPORT_SUCCESS', action.report);
      return state;

    case 'CREATE_DEVELOPMENT_REPORT_ERROR':
      // console.log('CREATE_DEVELOPMENT_REPORT_SUCCESS', action.err);
      return state;

    case 'DOWNLOAD_REPORT_SUCCESS':
      console.log('DOWNLOAD_REPORT_SUCCESS', action.report, action.reportDownload);
      return {
        ...state,
        reportDownload: action.reportDownload
      };

    case 'DOWNLOAD_REPORT_ERROR':
      console.log('DOWNLOAD_REPORT_ERROR', action.err);
      return state;

    default:
      return state;

  }
};

export default devReportReducer;
