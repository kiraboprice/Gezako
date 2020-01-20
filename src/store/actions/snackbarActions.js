
export const showSuccessAlert = (message) => {
  return (dispatch) => {
    dispatch({type: 'SHOW_SUCCESS_ALERT', message});
  }
};

export const hideSuccessAlert = () => {
  return (dispatch) => {
    dispatch({type: 'HIDE_SUCCESS_ALERT'});
  }
};

export const showInfoAlert = (message) => {
  return (dispatch) => {
    dispatch({type: 'SHOW_INFO_ALERT', message});
  }
};

export const hideInfoAlert = () => {
  return (dispatch) => {
    dispatch({type: 'HIDE_INFO_ALERT'});
  }
};

export const showWarningAlert = (message) => {
  return (dispatch) => {
    dispatch({type: 'SHOW_WARNING_ALERT', message});
  }
};

export const hideWarningAlert = () => {
  return (dispatch) => {
    dispatch({type: 'HIDE_WARNING_ALERT'});
  }
};

export const showErrorAlert = (message) => {
  return (dispatch) => {
    dispatch({type: 'SHOW_ERROR_ALERT', message});
  }
};

export const hideErrorAlert = () => {
  return (dispatch) => {
    dispatch({type: 'HIDE_ERROR_ALERT'});
  }
};
