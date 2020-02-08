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
import {Timestamp} from "firebase";


const UpdateFeatureTestDialog = (props) => {

  //local ui
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');

  const [testToUpdate, setTestToUpdate] = useState('');
  const [testToUpdateIndex, setTestToUpdateIndex] = useState(null);
  const [feature, setFeature] = useState(false);

  const [showUpdateFeatureTestDialog, setShowUpdateFeatureTestDialog] = useState(true);

  //when posting to db
  const [updateFeatureByIdInDb, setUpdateFeatureByIdInDb] = useState(false);
  const [updateFeatureByIdResponse, setUpdateFeatureByIdResponse] = useState(null);

  useEffect(() => {
    console.log('SHOW UPDATE DIALOG!!!', props);
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

  const { user } = props;
  const handleSubmit = () => {
    const test = {
      ...testToUpdate,
      updatedBy: user.displayName,
      updatedByUserId: user.uid,
      // updatedAt: new Date() //todo find a date format which works!
      // updatedAt:  new Timestamp(new Date) //todo find a date format which works!
      // updatedAt:  Timestamp(new Date) //todo find a date format which works!
      // updatedAt:  Timestamp(new Date.now()) //todo find a date format which works!
      // updatedAt:  Timestamp(+ new Date()) //todo find a date format which works!
      // updatedAt:  Timestamp(Date()) //todo find a date format which works!
      // updatedAt:  Timestamp(Date()) //todo find a date format which works!
      updatedAt: new Date() //todo find a date format which works!
    };

    if (testToUpdate.type === 'manual') {
      feature.manualTests[testToUpdateIndex] = test;
      setFeature(feature) //update feature in local props
    }
    else if (testToUpdate.type === 'spock') {
      feature.spockTests[testToUpdateIndex] = test;
      setFeature(feature)
    }
    else if (testToUpdate.type === 'postman') {
      feature.postmanTests[testToUpdateIndex] = test;
      setFeature(feature)
    }
    setUpdateFeatureByIdInDb(true);
  };

  useEffect(() => { //listen for response
    if (updateFeatureByIdResponse){
      setShowUpdateFeatureTestDialog(false);
      props.setShowUpdateFeatureTestDialog(false);

      if(updateFeatureByIdResponse.response === "SUCCESS"){
        props.setUpdateFeatureTestResponse({'response' : 'SUCCESS'});
      }

      else if (updateFeatureByIdResponse.response === "ERROR"){
        props.setUpdateFeatureTestResponse({'response' : 'ERROR', 'error' : updateFeatureByIdResponse.error});
      }
    }
  }, [updateFeatureByIdResponse]);

  return (
      <div>
        <Dialog open={showUpdateFeatureTestDialog} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update {testToUpdate? testToUpdate.title: null}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Update {testToUpdate? testToUpdate.title : null}
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
    user: state.auth.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(UpdateFeatureTestDialog)
