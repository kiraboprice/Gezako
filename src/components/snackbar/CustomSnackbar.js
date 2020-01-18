import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import {getFirstNameFromFullName} from "../../util/StringUtil";

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
  const [showInfoAlert, setShowInfoAlert] = useState(false);
  const [showWarningAlert, setShowWarningAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    setShowSuccessAlert(props.showSuccessAlert);
    setShowInfoAlert(props.showInfoAlert);
    setShowWarningAlert(props.showWarningAlert);
    setShowErrorAlert(props.showErrorAlert);
  }, [props]);

  const handleClick = () => {
    // setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSuccessAlert(false);
    setShowInfoAlert(false);
    setShowWarningAlert(false);
    setShowErrorAlert(false);
  };

  return (
      <div className={classes.root}>
        <Button variant="outlined" onClick={handleClick}>
          Open success snackbar
        </Button>
        <Snackbar open={showSuccessAlert} autoHideDuration={1000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success">
            This is a success message!
          </Alert>
        </Snackbar>

        <Snackbar open={showInfoAlert} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="info">This is an information message!</Alert>
        </Snackbar>

        <Snackbar open={showWarningAlert} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="warning">This is a warning message!</Alert>
        </Snackbar>

        <Snackbar open={showErrorAlert} autoHideDuration={1000} onClose={handleClose}>
          <Alert severity="error">This is an error message!</Alert>
        </Snackbar>
      </div>
  );
}

export default CustomSnackbar
