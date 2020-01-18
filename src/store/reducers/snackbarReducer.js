const initState = {

};

const snackbarReducer = (state = initState, action) => {
  switch(action.type){
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
