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
  updateServiceStats
} from "../../../../store/actions/reportActions";
import {ServiceStats} from "../../../../constants/ServiceStats";


const ServiceStatsDialog = (props) => {

  const [showDialog, setShowDialog] = useState(false);
  let [serviceStats, setServiceStats] = useState('');
  const [service, setService] = useState('');
  const [classCoverage, setClassCoverage] = useState();
  const [methodCoverage, setMethodCoverage] = useState();
  const [lineCoverage, setLineCoverage] = useState();
  const [serviceSpec, setServiceSpec] = useState();
  const [numberOfTests, setNumberOfTests] = useState();

  useEffect(() => {
    setShowDialog(props.showDialog);
    setServiceStats(props.serviceStats);
    setService(props.service);
    setClassCoverage(props.serviceStats? props.serviceStats.classCoverage : '');
    setMethodCoverage(props.serviceStats? props.serviceStats.methodCoverage : '');
    setLineCoverage(props.serviceStats? props.serviceStats.lineCoverage : '');
    setServiceSpec(props.serviceStats? props.serviceStats.serviceSpec : '');
    setNumberOfTests(props.serviceStats? props.serviceStats.numberOfTests : '');
  }, [props]);

  const handleClose = () => {
    setShowDialog(false);
    props.setDialogStateToFalse();
  };

  const handleSubmit = () => {
    setShowDialog(false);
    props.setDialogStateToFalse();
    if(serviceStats) {
      serviceStats.classCoverage = classCoverage;
      serviceStats.methodCoverage = methodCoverage;
      serviceStats.lineCoverage = lineCoverage;
      serviceStats.serviceSpec = serviceSpec;
    }
    else {
      serviceStats = new ServiceStats(
          null, null, null, null, null, null, null
      );
      serviceStats.classCoverage = classCoverage;
      serviceStats.methodCoverage = methodCoverage;
      serviceStats.lineCoverage = lineCoverage;
      serviceStats.serviceSpec = serviceSpec;
    }
    props.updateServiceStats(service, serviceStats);
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
      case 'serviceSpec':
        setServiceSpec(value);
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
                type="text"
                fullWidth
                value={methodCoverage}
                onChange={handleChange}
            />
            <TextField
                margin="dense"
                id="line"
                label="Line Coverage"
                type="text"
                fullWidth
                value={lineCoverage}
                onChange={handleChange}
            />
            <TextField
                margin="dense"
                id="serviceSpec"
                label="Service Spec"
                type="text"
                fullWidth
                value={serviceSpec}
                onChange={handleChange}
            />
            {/* <TextField
                autoFocus
                margin="dense"
                id="class"
                label="Number of tests"
                type="text"
                fullWidth
                value={numberOfTests}
                onChange={handleChange}
            /> */}
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
    updateServiceStats: (service, serviceStats) => dispatch(updateServiceStats(service, serviceStats))
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(ServiceStatsDialog)
