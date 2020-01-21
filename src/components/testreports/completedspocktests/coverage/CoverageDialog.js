import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import Button from "@material-ui/core/Button/Button";
import Dialog from "@material-ui/core/Dialog/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogContentText
  from "@material-ui/core/DialogContentText/DialogContentText";
import TextField from "@material-ui/core/TextField/TextField";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import {
  updateReportStatsCoverage
} from "../../../../store/actions/reportActions";


const CoverageDialog = (props) => {

  const [showDialog, setShowDialog] = useState(false);
  const [service, setService] = useState('');
  const [classCoverage, setClassCoverage] = useState();
  const [methodCoverage, setMethodCoverage] = useState();
  const [lineCoverage, setLineCoverage] = useState();

  useEffect(() => {
    // console.log('showErrorAlert:', showErrorAlert)
    setService(props.service);
    if(props.coverage){
      setClassCoverage(props.coverage.class);
      setMethodCoverage(props.coverage.method);
      setLineCoverage(props.coverage.line);
    }
  }, [props]);

  const handleClose = () => {
    setShowDialog(false);
    props.hideSuccessAlert();
  };

  const handleSubmit = () => {
    setShowDialog(false);
    const coverage = {classCoverage, methodCoverage, lineCoverage};
    props.updateReportStatsCoverage(service, coverage);
  };

  return (
      <div>
        <Dialog open={showDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Coverage</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update coverage for {service}
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Class Coverage"
                type="text"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Method Coverage"
                type="email"
                fullWidth
            />
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Line Coverage"
                type="email"
                fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Submit
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
    updateReportStatsCoverage: (service, coverage) => dispatch(updateReportStatsCoverage(service, coverage)),
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CoverageDialog)
