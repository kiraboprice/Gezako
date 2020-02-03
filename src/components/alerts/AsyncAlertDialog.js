import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText
  from "@material-ui/core/DialogContentText/DialogContentText";

const AsyncAlertDialog = (props) => {

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    console.log('PROPS in AsyncAlertDialog', props);
    setShowDialog(props.showAsyncAlertDialog);
  }, [props]);

  const handleClose = () => {
    setShowDialog(false);
    props.setAsynAlertDialogStateToFalse();
  };

  return (
      <div>
        <Dialog
            open={showDialog}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Creating Test"}
            </DialogTitle>

          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Creating {props.testTitle}
            </DialogContentText>
          </DialogContent>

        </Dialog>
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AsyncAlertDialog)
