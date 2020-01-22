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
import {updateCoverage} from "../../../../store/actions/reportActions";


const CoverageDialog = (props) => {

  const [showDialog, setShowDialog] = useState(false);
  const [service, setService] = useState('');
  const [classCoverage, setClassCoverage] = useState();
  const [methodCoverage, setMethodCoverage] = useState();
  const [lineCoverage, setLineCoverage] = useState();

  useEffect(() => {
    console.log('props.showDialog:', props.showDialog);
    setShowDialog(props.showDialog);
    setService(props.service);
    if(props.coverage){
      setClassCoverage(props.coverage.class);
      setMethodCoverage(props.coverage.method);
      setLineCoverage(props.coverage.line);
    }
  }, [props]);

  const handleClose = () => {
    setShowDialog(false);
    props.setDialogStateToFalse();
  };

  const handleSubmit = () => {
    setShowDialog(false);
    props.setDialogStateToFalse();
    const coverage = {classCoverage, methodCoverage, lineCoverage};
    props.updateReportStatsCoverage(service, coverage);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    console.log('handleChange: ', value);
    switch (e.target.id) {
      case 'class':
        setClassCoverage(value);
        break;
      case 'method':
        setMethodCoverage(value);
        break;
      case 'line':
        setLineCoverage(value);
        break;
      default:
        break;
    }
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
                id="class"
                label="Class Coverage"
                type="text"
                fullWidth
                value={classCoverage}
                onChange={handleChange}
            />
            <TextField
                margin="dense"
                id="method"
                label="Method Coverage"
                type="email"
                fullWidth
                value={methodCoverage}
                onChange={handleChange}
            />
            <TextField
                margin="dense"
                id="line"
                label="Line Coverage"
                type="email"
                fullWidth
                value={lineCoverage}
                onChange={handleChange}
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
    updateCoverage: (service, coverage) => dispatch(updateCoverage(service, coverage)),
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(CoverageDialog)
