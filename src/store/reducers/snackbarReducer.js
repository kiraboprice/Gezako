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

    default:
      return state
  }
};

export default snackbarReducer;
