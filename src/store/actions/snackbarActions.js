
export const showSuccessAlert = () => {
  return (dispatch) => {
    dispatch({type: 'SHOW_SUCCESS_ALERT'});
  }
};


export const hideSuccessAlert = () => {
  return (dispatch) => {
    dispatch({type: 'HIDE_SUCCESS_ALERT'});
  }
};

export const successAlertShown = () => {
  return (dispatch) => {
    dispatch({type: 'SUCCESS_ALERT_SHOWN'});
  }
};

export const resetSuccessAlertShown = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_SUCCESS_ALERT_SHOWN'});
  }
};