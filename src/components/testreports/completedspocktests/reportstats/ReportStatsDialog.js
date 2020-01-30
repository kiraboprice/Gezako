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
  updateCoverage,
  updateReportStats
} from "../../../../store/actions/reportActions";


const ReportStatsDialog = (props) => {

  const [showDialog, setShowDialog] = useState(false);
  let [reportStats, setReportStats] = useState('');
  const [service, setService] = useState('');
  const [classCoverage, setClassCoverage] = useState();
  const [methodCoverage, setMethodCoverage] = useState();
  const [lineCoverage, setLineCoverage] = useState();

  useEffect(() => {
    setShowDialog(props.showDialog);
    setReportStats(props.reportStats);
    setService(props.service);
    setClassCoverage(props.reportStats? props.reportStats.classCoverage : '');
    setMethodCoverage(props.reportStats? props.reportStats.methodCoverage : '');
    setLineCoverage(props.reportStats? props.reportStats.lineCoverage : '');
  }, [props]);

  const handleClose = () => {
    setShowDialog(false);
    props.setDialogStateToFalse();
  };

  const handleSubmit = () => {
    setShowDialog(false);
    props.setDialogStateToFalse();
    reportStats.classCoverage = classCoverage;
    reportStats.methodCoverage = methodCoverage;
    reportStats.lineCoverage = lineCoverage;
    props.updateReportStats(service, reportStats);
  };

  const handleChange = (e) => {
    const value = e.target.value;
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
    updateReportStats: (service, reportStats) => dispatch(updateReportStats(service, reportStats))
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ReportStatsDialog)
