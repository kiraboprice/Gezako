import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';

import './createFeature.css';
import TextField from "@material-ui/core/TextField/TextField";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../../store/actions/snackbarActions";
import {setPrevUrl} from "../../../../store/actions/authActions";
import ServiceStatsDialog
  from "../../completedtests/servicestats/ServiceStatsDialog";
import CreateFeatureDbHandler
  from "../featuresdbhandlers/CreateFeatureDbHandler";
const qs = require('query-string');

const CreateFeature = (props) => {
  const serviceInQuery = qs.parse(props.location.search, { ignoreQueryPrefix: true }).service;
  //report fields
  const [title, setTitle] = useState(null);
  const [service, setService] = useState(serviceInQuery);
  const [productSpec, setProductSpec] = useState(null);
  const [techSpec, setTechSpec] = useState(null);


  //when posting to db
  const [feature, setFeature] = useState(null);
  const [createFeatureInDB, setCreateFeatureInDB] = useState(false);
  const [createFeatureSuccess, setCreateFeatureSuccess] = useState(null);
  const [createFeatureError, setCreateFeatureError] = useState(null);

  function handleChange(e) {
    const value = e.target.value;
    switch (e.target.name) {
      case 'service':
        setService(e.target.value);
        break;
      default:
        break;
    }

  }

  const handleChangeForTextField = (e) => {
    const value = e.target.value;
    switch (e.target.id) {
      case 'title':
        setTitle(value);
        break;
        break;
      case 'productSpec':
        setProductSpec(value);
        break;
      case 'techSpec':
        setTechSpec(value);
        break;
      default:
        break;
    }
  };

  function validateFields(feature) {
    console.log('FEATURE ISSSS', feature);
   if(!feature.title.length > 0) {
     return ("Fill in the Title")
   }
   else if (!feature.service.length > 0) {
     return ("Select Service")
   }
   else {
     return ("valid");
   }
  }

  function handleCreate(e) {
    e.preventDefault();
    // console.log("PROPS---", props);
    const feature = {
      title,
      service,
      productSpec,
      techSpec
    };

    const validationText = validateFields(feature);
    if(validationText!== 'valid'){
      // console.log('REPORT validationText', validationText);
      props.showErrorAlert(validationText);
      return;
    }

    setFeature(feature);
    setCreateFeatureInDB(true);
  }


  /**
   * When test is created (or not)
   */
  useEffect(() => {
      if(createFeatureSuccess) {
        showSuccessAlert('Successfully created feature!');
        props.history.push(`/features/${service}/${createFeatureSuccess.id}`);
      } else {
        showErrorAlert('Failed to create feature');
      }
  }, [createFeatureSuccess]);

  const {user, setPrevUrl} = props;
  if (!user) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login'/>;
  }

  return (
      <div id='upload'>
        <h3>Create a Feature</h3>
        <form onSubmit={handleCreate} style={{marginTop: '25px'}}>
          <div>

            <div id='display-content'>
              <label>Feature Allocation: </label>
              <select name='service' value={service}
                      onChange={handleChange}>
                <option value='userflow'>userflow</option>
                <option value='admin'>admin</option>
                <option value='surveys'>Surveys</option>
                <option value='rules'>Rules</option>
                <option value='loans'>Loans</option>
                <option value='users'>Users</option>
                <option value='auth'>Auth</option>
                <option value='rails'>Rails</option>
                <option value='comms'>Comms</option>
                <option value='approval'>Approval</option>
                <option value='scheduler'>Scheduler</option>
                <option value='dsrouter'>DsRouter</option>
                <option value='assignment'>Assignment</option>
                <option value='dss'>Dss</option>
                <option value='kyc'>Kyc</option>
                <option value='attribution'>Attribution</option>
                <option value='settlement'>Settlement</option>
                <option value='verification'>Verification</option>
                <option value='lendingpartner'>Lendingpartner</option>
              </select>
            </div>

            <TextField
                margin="dense"
                id="title"
                label="Feature Title"
                type="web"
                fullWidth
                value={title}
                onChange={handleChangeForTextField}
            />
            
            <TextField
                margin="dense"
                id="productSpec"
                label="Product Requirement Spec"
                type="web"
                fullWidth
                value={productSpec}
                onChange={handleChangeForTextField}
            />

              <TextField
                  margin="dense"
                  id="techSpec"
                  label="Technical Design Spec"
                  type="web"
                  fullWidth
                  value={techSpec}
                  onChange={handleChangeForTextField}
              />

            {/* ! Make sure someone has actually uploaded and filled out the required spaces because
              I was able to submit (by accident) without uploading or filling out the spaces */}
            <button id='create-test' type='submit'>
              Create
            </button>
          </div>
        </form>

        {/*Purely Functional Non-Ui components*/}
        <CreateFeatureDbHandler
            createFeatureInDB = {createFeatureInDB}
            feature = {feature}
            setCreateFeatureSuccess = {setCreateFeatureSuccess}
            setCreateFeatureError = {setCreateFeatureError}
        />
      </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    createTestNewTestId: state.report.createTestNewTestId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),

    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateFeature);
