import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';

import './createFeature.css';
import TextField from "@material-ui/core/TextField/TextField";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";
import {setPrevUrl} from "../../../store/actions/authActions";
import CreateFeatureDbHandler
  from "../featuresdbhandlers/CreateFeatureDbHandler";

import * as services from "../../../constants/Services";

const qs = require('query-string');

const CreateFeature = (props) => {
  const serviceInQuery = qs.parse(props.location.search, { ignoreQueryPrefix: true }).service;
  //report fields
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
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
      case 'description':
        setDescription(value);
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
      description,
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
                <option value={services.ANDROID_USER_FLOWS_VALUE}>{services.ANDROID_USER_FLOWS_NAME}</option>
                <option value={services.ADMIN_USER_FLOWS_VALUE}>{services.ADMIN_USER_FLOWS_NAME}</option>
                <option value={services.SURVEYS_VALUE}>{services.SURVEYS_NAME}</option>
                <option value={services.RULES_VALUE}>{services.RULES_NAME}</option>
                <option value={services.LOANS_VALUE}>{services.LOANS_NAME}</option>
                <option value={services.USERS_VALUE}>{services.USERS_NAME}</option>
                <option value={services.AUTH_VALUE}>{services.AUTH_NAME}</option>
                <option value={services.RAILS_VALUE}>{services.RAILS_NAME}</option>
                <option value={services.COMMS_VALUE}>{services.COMMS_NAME}</option>
                <option value={services.APPROVAL_VALUE}>{services.APPROVAL_NAME}</option>
                <option value={services.SCHEDULER_VALUE}>{services.SCHEDULER_NAME}</option>
                <option value={services.DSROUTER_VALUE}>{services.DSROUTER_NAME}</option>
                <option value={services.ASSIGNMENT_VALUE}>{services.ASSIGNMENT_NAME}</option>
                <option value={services.DSS_VALUE}>{services.DSS_NAME}</option>
                <option value={services.KYC_VALUE}>{services.KYC_NAME}</option>
                <option value={services.ATTRIBUTION_VALUE}>{services.ATTRIBUTION_NAME}</option>
                <option value={services.SETTLEMENT_VALUE}>{services.SETTLEMENT_NAME}</option>
                <option value={services.VERIFICATION_VALUE}>{services.VERIFICATION_NAME}</option>
                <option value={services.LENDING_PARTNER_VALUE}>{services.LENDING_PARTNER_NAME}</option>
                <option value={services.PROVIDER_MEDIATOR_LEGACY_VALUE}>{services.PROVIDER_MEDIATOR_LEGACY_NAME}</option>
                <option value={services.ACCOUNT_LEGACY_VALUE}>{services.ACCOUNT_LEGACY_NAME}</option>
              </select>
            </div>

            <TextField
                margin="dense"
                id="title"
                label="Title"
                type="web"
                fullWidth
                value={title}
                onChange={handleChangeForTextField}
            />

            <TextField
                margin="dense"
                id="description"
                label="Description"
                type="web"
                fullWidth
                value={description}
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
