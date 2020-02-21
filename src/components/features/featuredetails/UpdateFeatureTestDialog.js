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


const UpdateFeatureTestDialog = (props) => {

  //local ui
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const [testToUpdate, setTestToUpdate] = useState('');
  const [testToUpdateIndex, setTestToUpdateIndex] = useState(null);
  const [feature, setFeature] = useState(false);

  const [showUpdateFeatureTestDialog, setShowUpdateFeatureTestDialog] = useState(true);

  const [id, setId] = useState(null);

  useEffect(() => {
    setId(props.id);
    // console.log('SHOW UPDATE DIALOG!!!', props);
    setTitle(props.testToUpdate? props.testToUpdate.title : null);
    setLink(props.testToUpdate? props.testToUpdate.link : null);

    setTestToUpdate(props.testToUpdate);
    setTestToUpdateIndex(props.testToUpdateIndex);
    setFeature(props.feature);

    setShowUpdateFeatureTestDialog(props.showUpdateFeatureTestDialog);
  }, [props]);

  const handleClose = () => {
    setShowUpdateFeatureTestDialog(false);
    props.setShowUpdateFeatureTestDialog(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    switch (e.target.id) {
      case 'title':
        setTitle(value); //for updating local UI only

        testToUpdate.title = value; //update object which will be posted to db
        setTestToUpdate(testToUpdate);
        break;
      case 'link':
        setLink(value); //for updating local UI only

        testToUpdate.link = value; //update object which will be posted to db
        setTestToUpdate(testToUpdate);
        break;
      default:
        break;
    }
  };

  const { updateFeature } = props;
  const { user } = props;
  const handleDelete = () => {
    const test = {
      ...testToUpdate,
      updatedBy: user.displayName,
      updatedByUserId: user.uid,
      updatedAt: new Date()
    };

    if (testToUpdate.type === 'manual') {
      feature.manualTests.splice(testToUpdateIndex, 1);
      setFeature(feature)
    }
    else if (testToUpdate.type === 'postman') {
      feature.postmanTests.splice(testToUpdateIndex, 1);
      setFeature(feature)
    }
    else if (testToUpdate.type === 'spock') {
      feature.spockTests.splice(testToUpdateIndex, 1);
      setFeature(feature)
    }
    else if (testToUpdate.type === 'android') {
      feature.androidTests.splice(testToUpdateIndex, 1);
      setFeature(feature)
    }
    else if (testToUpdate.type === 'performance') {
      feature.performanceTests.splice(testToUpdateIndex, 1);
      setFeature(feature)
    }
    updateFeature(id, feature);
  };

  const handleSubmit = () => {
    const test = {
      ...testToUpdate,
      updatedBy: user.displayName,
      updatedByUserId: user.uid,
      updatedAt: new Date()
    };

    if (testToUpdate.type === 'manual') {
      feature.manualTests[testToUpdateIndex] = test;
      setFeature(feature) //update feature in local props
    }
    else if (testToUpdate.type === 'postman') {
      feature.postmanTests[testToUpdateIndex] = test;
      setFeature(feature)
    }
    else if (testToUpdate.type === 'spock') {
      feature.spockTests[testToUpdateIndex] = test;
      setFeature(feature)
    }
    else if (testToUpdate.type === 'android') {
      feature.androidTests[testToUpdateIndex] = test;
      setFeature(feature)
    }
    else if (testToUpdate.type === 'performance') {
      feature.performanceTests[testToUpdateIndex] = test;
      setFeature(feature)
    }
    updateFeature(id, feature);
  };

  const { updateFeatureResult } = props;
  useEffect(() => { //listen for response
    // console.log("updateFeatureTestDialog PROPS 1 ---", props);
    if (updateFeatureResult){
      setShowUpdateFeatureTestDialog(false);
      props.setShowUpdateFeatureTestDialog(false);

      // console.log("updateFeatureTestDialog PROPS 2 ---", props);

      if(updateFeatureResult.response === "success"){
        props.setUpdateFeatureTestResponse({'response' : 'SUCCESS'});
      }

      else if (updateFeatureResult.response === "error"){
        props.setUpdateFeatureTestResponse({'response' : 'ERROR', 'error' : updateFeatureResult.error});
      }
    }
  }, [updateFeatureResult]);

  return (
      <div>
        <Dialog open={showUpdateFeatureTestDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update Test}</DialogTitle>
          <DialogContent>
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
            <Button onClick={handleDelete} color="primary">
              Delete Test
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Update Test
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
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(UpdateFeatureTestDialog)
