const initState = {

};

const snackbarReducer = (state = initState, action) => {
  switch(action.type){
    case 'SHOW_SUCCESS_ALERT':
      console.log('SHOW_SUCCESS_ALERT', state);
      return {
        ...state,
        showSuccessAlert : true
      };

    case 'HIDE_SUCCESS_ALERT':
      return {
        ...state,
        showSuccessAlert : false
      };

    case 'RESET_SHOW_SUCCESS_ALERT':
      return {
        ...state,
        showSuccessAlert : null
      };

    case 'SUCCESS_ALERT_SHOWN':
      return {
        ...state,
        successAlertShown : 'success'
      };

    case 'RESET_SUCCESS_ALERT_SHOWN':
      return {
        ...state,
        successAlertShown : null
      };

    default:
      return state
  }
};

export default snackbarReducer;
