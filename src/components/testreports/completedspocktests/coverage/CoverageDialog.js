import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {
  hideErrorAlert,
  hideInfoAlert,
  hideSuccessAlert, hideWarningAlert,
  showSuccessAlert
} from "../../store/actions/snackbarActions";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText
  from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";


const CoverageDialog = (props) => {

  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [successAlertMessage, setSuccessAlertMessage] = useState(false);

  useEffect(() => {
    // console.log('showErrorAlert:', showErrorAlert)
    setShowSuccessAlert(props.showSuccessAlert);
    setSuccessAlertMessage(props.successAlertMessage);
  }, [props]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowSuccessAlert(false);
    props.hideSuccessAlert();
  };


  return (
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Open form dialog
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send updates
              occasionally.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Email Address"
                type="email"
                fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    showSuccessAlert: state.snackbar.showSuccessAlert,
    successAlertMessage: state.snackbar.successAlertMessage,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    hideSuccessAlert: () => dispatch(hideSuccessAlert()),
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CoverageDialog)
