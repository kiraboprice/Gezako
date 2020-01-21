const initState = {

};

const snackbarReducer = (state = initState, action) => {
  switch(action.type){
    case 'SHOW_SUCCESS_ALERT':
      // console.log('SHOW_SUCCESS_ALERT', state);
      return {
        ...state,
        showSuccessAlert : true,
        successAlertMessage : action.message
      };

    case 'HIDE_SUCCESS_ALERT':
      return {
        ...state,
        showSuccessAlert : false,
        successAlertMessage : null
      };

    case 'SHOW_INFO_ALERT':
      // console.log('SHOW_SUCCESS_ALERT', state);
      return {
        ...state,
        showInfoAlert : true,
        infoAlertMessage : action.message
      };

    case 'HIDE_INFO_ALERT':
      return {
        ...state,
        showInfoAlert : false,
        infoAlertMessage : null
      };

    case 'SHOW_WARNING_ALERT':
      // console.log('SHOW_SUCCESS_ALERT', state);
      return {
        ...state,
        showWarningAlert : true,
        warningAlertMessage : action.message
      };

    case 'HIDE_WARNING_ALERT':
      return {
        ...state,
        showWarningAlert : false,
        warningAlertMessage : null
      };

    case 'SHOW_ERROR_ALERT':
      // console.log('SHOW_ERROR_ALERT', state);
      return {
        ...state,
        showErrorAlert : true,
        errorAlertMessage : action.message
      };

    case 'HIDE_ERROR_ALERT':
      return {
        ...state,
        showErrorAlert : false,
        errorAlertMessage : null
      };

    default:
      return state
  }
};

export default snackbarReducer;
