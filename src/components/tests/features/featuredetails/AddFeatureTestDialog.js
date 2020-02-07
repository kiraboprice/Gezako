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
import UpdateFeatureByIdDbHandler
  from "../featuresdbhandlers/UpdateFeatureByIdDbHandler";


const AddFeatureTestDialog = (props) => {

  //local ui
  const [title, setTitle] = useState(null);
  const [link, setLink] = useState(null);

  const [showAddDialog, setShowAddDialog] = useState(false);
  const [testTypeToAdd, setTestTypeToAdd] = useState(false);
  const [feature, setFeature] = useState(false);

  //when posting to db
  const [updateFeatureByIdInDb, setUpdateFeatureByIdInDb] = useState(false);
  const [id, setId] = useState(null);

  const [updateFeatureByIdResponse, setUpdateFeatureByIdResponse] = useState(null);

  useEffect(() => {
    console.log('SHOW ADD DIALOG!!!', props);
    setShowAddDialog(props.showAddDialog);
    setTestTypeToAdd(props.testTypeToAdd);
    setFeature(props.feature);
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

  const handleSubmit = () => {
    if (testTypeToAdd === 'manual') {
      const newManualTest = {
        'title' : title,
        'link' : link
      };

      let featureToUpdate = feature; //make a copy of the feature const
      if (!featureToUpdate.manualTests){
        featureToUpdate.manualTests = [newManualTest];
      } else {
        featureToUpdate.manualTests.push(newManualTest);
      }
      // console.log('featureToUpdate----', featureToUpdate);
      setFeature(featureToUpdate) //set feature in local props
    }
    setUpdateFeatureByIdInDb(true);
  };

  useEffect(() => { //listen for response
    if (updateFeatureByIdResponse){
      setShowAddDialog(false);
      props.setShowAddDialog(false);

      if(updateFeatureByIdResponse.response === "SUCCESS"){
        props.setAddFeatureTestResponse({'response' : 'SUCCESS'});
      }

      else if (updateFeatureByIdResponse.response === "ERROR"){
        props.setAddFeatureTestResponse({'response' : 'ERROR', 'error' : updateFeatureByIdResponse.error});
      }
    }
  }, [updateFeatureByIdResponse]);

  return (
      <div>
        <Dialog open={showAddDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add {testTypeToAdd} Test</DialogTitle>
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

        {/*Purely Functional Non-Ui components*/}
        <UpdateFeatureByIdDbHandler
            updateFeatureByIdInDb = {updateFeatureByIdInDb}
            feature = {feature}

            setUpdateFeatureByIdResponse = {setUpdateFeatureByIdResponse}
        />
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
)(AddFeatureTestDialog)
