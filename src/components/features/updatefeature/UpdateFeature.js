import React, {Component, useEffect, useState} from 'react';
import {connect} from 'react-redux'
import { Redirect } from 'react-router-dom'

import * as firebase from "firebase";
import CustomSnackbar from "../../alerts/CustomSnackbar";
import {compose} from "redux";

import TextField from "@material-ui/core/TextField/TextField";
import {blue} from "@material-ui/core/colors";
import {
  getReport, resetGetReport, resetUpdateReportState,
  unsubscribeGetReport, updateReport
} from "../../../store/actions/reportActions";
import {
  getUsersApartFromCurrentUser,
  unsubscribeGetUsersApartFromCurrentUser
} from "../../../store/actions/authActions";
import {getTestPhaseFromPathName} from "../../../util/StringUtil";
import {
  getFeature, resetGetFeature,
  unsubscribeGetFeature, updateFeature
} from "../../../store/actions/featureActions";

const UpdateFeature = (props) => {
  const { feature } = props;

  //report fields
  const [id, setId] = useState(null);
  const [service, setService] = useState(null);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [productSpec, setProductSpec] = useState(null);
  const [techSpec, setTechSpec] = useState(null);

  const { getFeature, unsubscribeGetFeature, resetGetFeature  } = props;
  useEffect(() => {
    setId(props.match.params.id);

    getFeature(props.match.params.id);

    return function cleanup() {
      unsubscribeGetFeature(props.match.params.id);
      resetGetFeature();
    };
  }, [id]);

  useEffect(() => {
    if(feature){
      setTitle(feature.title);
      setDescription(feature.description);
      setService(feature.service);
      setProductSpec(feature.productSpec);
      setTechSpec(feature.techSpec);
    }
    console.log('FEATTUTRREEEEEE----', feature);
  }, [feature]);

  const handleChangeForTextField = (e) => {
    const value = e.target.value;
    // console.log('handleChange: ', value);
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
        break
    }

  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const featureForUpdate = {
      title,
      description,
      service,
      productSpec,
      techSpec
    };

    props.updateFeature(id, featureForUpdate);

    // props.history.push(`features/${feature.service}/${feature.id}`);
    // props.history.replace(`features/${feature.service}/${feature.id}`);

    //todo continue here!
    return <Redirect to={`features/${feature.service}/${feature.id}`} />;
  };

  const { user } = props;
  if (!user) return <Redirect to='/login' />;

  if (title) {
    return (
        <div id='upload'>
          <h3 >Update Spock Report</h3>
          <div>
            <form onSubmit={handleUpdate}>

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
              <button type="submit">Update</button>
            </form>
          </div>
        </div>
    );

  } else {
    return (
        <div id='test-details-section'>
          <p>Loading feature...</p>
        </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    feature: state.feature.getFeature
  }
};

const mapDispatchToProps = dispatch => {
  return {
    getFeature: (id) => dispatch(getFeature(id)),
    unsubscribeGetFeature: (id) => dispatch(unsubscribeGetFeature(id)),
    resetGetFeature: () => dispatch(resetGetFeature()),

    updateFeature: (id, report) => dispatch(updateFeature(id, report)),
    // resetUpdateFeatureState: () => dispatch(resetUpdateFeatureState())
  }
};

export default compose(connect(mapStateToProps, mapDispatchToProps)(UpdateFeature))
