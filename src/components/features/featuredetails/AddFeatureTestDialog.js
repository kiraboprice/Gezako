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
import {Timestamp} from "firebase";
import {updateFeature} from "../../../store/actions/featureActions";


const AddFeatureTestDialog = (props) => {

  //local ui
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [testTypeToAdd, setTestTypeToAdd] = useState(false);
  const [feature, setFeature] = useState(false);

  const [id, setId] = useState(null);

  useEffect(() => {
    setId(props.id);
    // console.log('SHOW ADD DIALOG!!!', props);
    setShowAddDialog(props.showAddDialog);
    setTestTypeToAdd(props.testTypeToAdd);
    setFeature(props.feature);

    return function cleanUp() { //clean up UI for next test to be added
      setTitle('');
      setLink('');
    }
  }, [props]);

  const handleClose = () => {
    setShowAddDialog(false);
    props.setShowAddDialog(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    switch (e.target.id) {
      case 'title':
        setTitle(value);
        break;
      case 'link':
        setLink(value);
        break;
      default:
        break;
    }
  };

  const { user } = props;
  const { updateFeature  } = props;
  const handleSubmit = () => {
    const newTest = {
      'title': title,
      'link': link,
      type: testTypeToAdd,
      createdBy: user.displayName,
      userId: user.uid,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    if (testTypeToAdd === 'manual') {
      if (!feature.manualTests) {
        feature.manualTests = [newTest];
      } else {
        feature.manualTests.push(newTest);
      }
    }

    else if (testTypeToAdd === 'postman') {
      if (!feature.postmanTests) {
        feature.postmanTests = [newTest];
      } else {
        feature.postmanTests.push(newTest);
      }
    }

    else if (testTypeToAdd === 'spock') {
      if (!feature.spockTests) {
        feature.spockTests = [newTest];
      } else {
        feature.spockTests.push(newTest);
      }
    }

    else if (testTypeToAdd === 'android') {
      if (!feature.androidTests) {
        feature.androidTests = [newTest];
      } else {
        feature.androidTests.push(newTest);
      }
    }

    else if (testTypeToAdd === 'performance') {
      if (!feature.performanceTests) {
        feature.performanceTests = [newTest];
      } else {
        feature.performanceTests.push(newTest);
      }
    }

    updateFeature(id, feature);
  };

  const { updateFeatureResult } = props;
  useEffect(() => { //listen for response
    if (updateFeatureResult){
      setShowAddDialog(false);
      props.setShowAddDialog(false);

      if(updateFeatureResult.response === "success"){
        props.setAddFeatureTestResponse({'response' : 'SUCCESS'});
      }

      else if (updateFeatureResult.response === "error"){
        props.setAddFeatureTestResponse({'response' : 'ERROR', 'error' : updateFeatureResult.error});
      }
    }
  }, [updateFeatureResult]);

  return (
      <div>
        <Dialog open={showAddDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">
            {testTypeToAdd === 'spock' ?  `Add Gezako ${testTypeToAdd} test` : `Add ${testTypeToAdd} test`}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Add a {testTypeToAdd} test for the feature: {feature.title}
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                type="text"
                fullWidth
                value={title}
                onChange={handleChange}
            />
            <TextField
                margin="dense"
                id="link"
                label="Test Link"
                type="text"
                fullWidth
                value={link}
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
    user: state.auth.user,
    updateFeatureResult: state.feature.updateFeatureResult
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateFeature: (id, feature) => dispatch(updateFeature(id, feature)),
    // resetUpdateFeature: () => dispatch(resetUpdateFeature())
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(AddFeatureTestDialog)
