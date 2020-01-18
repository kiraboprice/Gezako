
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