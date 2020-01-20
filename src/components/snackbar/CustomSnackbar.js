import React, {useEffect, useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {
  hideErrorAlert,
  hideInfoAlert,
  hideSuccessAlert, hideWarningAlert,
  showSuccessAlert
} from "../../store/actions/snackbarActions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomSnackbar = (props) => {
  const classes = useStyles();

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState(false);

  const [showInfoAlert, setShowInfoAlert] = useState(false);
  const [infoAlertMessage, setInfoAlertMessage] = useState(false);

  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [warningAlertMessage, setWarningAlertMessage] = useState(false);

  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorAlertMessage, setErrorAlertMessage] = useState(false);

  useEffect(() => {
    console.log('useEffect:', showSuccessAlert)
    setShowSuccessAlert(props.showSuccessAlert);
    setSuccessAlertMessage(props.successAlertMessage);

    setShowInfoAlert(props.showInfoAlert);
    setInfoAlertMessage(props.infoAlertMessage);

    setShowWarningAlert(props.showWarningAlert);
    setWarningAlertMessage(props.warningAlertMessage);

    setShowErrorAlert(props.showErrorAlert);
    setErrorAlertMessage(props.errorAlertMessage);
  }, [props.showSuccessAlert]);

  const handleClick = () => {
    // setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSuccessAlert(false);
    props.hideSuccessAlert();

    setShowInfoAlert(false);
    props.hideInfoAlert();

    setShowWarningAlert(false);
    props.hideWarningAlert();

    setShowErrorAlert(false);
    props.hideErrorAlert();
  };

  console.log('showSuccessAlert:', showSuccessAlert)

  return (
      <div className={classes.root}>
        <Snackbar open={showSuccessAlert} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">{successAlertMessage}</Alert>
        </Snackbar>

        <Snackbar open={showInfoAlert} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="info">{infoAlertMessage}</Alert>
        </Snackbar>

        <Snackbar open={showWarningAlert} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="warning">{warningAlertMessage}</Alert>Alert>
        </Snackbar>

        <Snackbar open={showErrorAlert} autoHideDuration={2000} onClose={handleClose}>
          <Alert severity="error">{errorAlertMessage}</Alert>
        </Snackbar>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showSuccessAlert: state.snackbar.showSuccessAlert,
    successAlertMessage: state.snackbar.successAlertMessage,

    showInfoAlert: state.snackbar.showInfoAlert,
    infoAlertMessage: state.snackbar.infoAlertMessage,

    showWarningAlert: state.snackbar.showWarningAlert,
    warningAlertMessage: state.snackbar.warningAlertMessage,

    showErrorAlert: state.snackbar.showErrorAlert,
    errorAlertMessage: state.snackbar.errorAlertMessage
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSuccessAlert: () => dispatch(hideSuccessAlert()),
    hideInfoAlert: () => dispatch(hideInfoAlert()),
    hideWarningAlert: () => dispatch(hideWarningAlert()),
    hideErrorAlert: () => dispatch(hideErrorAlert())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CustomSnackbar)

//showSuccessAlert : 'success'