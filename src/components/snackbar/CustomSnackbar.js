import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {getFirstNameFromFullName} from "../../util/StringUtil";
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {
  resetUpdateReportState,
  updateReport
} from "../../store/actions/reportActions";
import {successAlertShown} from "../../store/actions/snackbarActions";

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
    setShowSuccessAlert(props.showSuccessAlert);
    setSuccessAlertMessage(props.successAlertMessage);

    setShowInfoAlert(props.showInfoAlert);
    setInfoAlertMessage(props.infoAlertMessage);

    setShowWarningAlert(props.showWarningAlert);
    setWarningAlertMessage(props.warningAlertMessage);

    setShowErrorAlert(props.showErrorAlert);
    setErrorAlertMessage(props.errorAlertMessage);
  }, [props]);

  const handleClick = () => {
    // setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    // successAlertShown();

    setShowSuccessAlert(false);
    setShowInfoAlert(false);
    setShowWarningAlert(false);
    setShowErrorAlert(false);
  };

  return (
      <div className={classes.root}>
        <Snackbar open={showSuccessAlert} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">{successAlertMessage}</Alert>
        </Snackbar>

        <Snackbar open={showInfoAlert} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="info">{infoAlertMessage}</Alert>
        </Snackbar>

        <Snackbar open={showWarningAlert} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="warning">{warningAlertMessage}</Alert>Alert>
        </Snackbar>

        <Snackbar open={showErrorAlert} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="error">{errorAlertMessage}</Alert>
        </Snackbar>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {

  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    successAlertShown: () => dispatch(successAlertShown())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CustomSnackbar)

//showSuccessAlert : 'success'