import React, {useEffect, useState} from 'react'

import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'

import './features.css';

import {compose} from "redux";

import createItemIcon from "../../../assets/Icons/create.png";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../store/actions/snackbarActions";
import {setPrevUrl} from "../../../store/actions/authActions";
import Feature from "../Feature";
import {getServiceNameFromPathName} from "../../../util/StringUtil";
import {
  getFeaturesByService, resetGetFeaturesByService,
  unsubscribeGetFeaturesByService
} from "../../../store/actions/featureActions";

const Features = (props) => { //todo move this out of tests parent package/dir

  //UI
  const [displayLoadingFeatures, setDisplayLoadingFeatures] = useState('block');
  const [displayFeaturesEmpty, setDisplayFeaturesEmpty] = useState('none');
  const [displayFeatures, setDisplayFeatures] = useState('none');
  const [displayError, setDisplayError] = useState('none');

  const { service } = props;
  const { getFeaturesByService, unsubscribeGetFeaturesByService, resetGetFeaturesByService } = props;
  useEffect(() => { 
      getFeaturesByService(service);
       
    return function cleanup() {
      unsubscribeGetFeaturesByService(service);
      resetGetFeaturesByService();
    };
  }, [service]);

  const { features } = props;
  useEffect(() => {
    if (features){
      if(features.length === 0){
        setDisplayLoadingFeatures('none');
        setDisplayFeaturesEmpty('block');
        setDisplayError('none');
        setDisplayFeatures('none');
      }

      else if (features === 'ERROR'){
        setDisplayLoadingFeatures('none');
        setDisplayFeaturesEmpty('none');
        setDisplayError('block');
        setDisplayFeatures('none');
      }

      else {
        setDisplayLoadingFeatures('none');
        setDisplayFeaturesEmpty('none');
        setDisplayError('none');
        setDisplayFeatures('block');
      }
    }
    else {
      //
    }
  }, [features]);

  const { user, setPrevUrl } = props;
  if (!user) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  return (
      <div id='home'>
        <div id='reports-section'>

          <div id='test-details-section' style={{display: displayLoadingFeatures}}>
            <p>Loading Features...</p>
          </div>

          <div id='test-details-section' style={{display: displayFeaturesEmpty}}>
            <p>No Features found</p>
          </div>

          <div id='test-details-section' style={{display: displayError}}>
            <p>An Error Occurred.</p>
          </div>

          <span id="test-title-summary">Features for {service}</span>
          <div id="sorted-by" style={{marginTop: "15px"}}>Sorted by Date Created</div>
          <div id='features-reports'  style={{display: displayFeatures}}>
            <div id='headers'>
              <div id='title'>Title</div>
              <div id='title'>Updated At</div>
              <div id='end-column'>Created By</div>
            </div>
            { features && features.map(feature => {
              return (
                  <div>
                    <Link to={`/features/${feature.service}/${feature.id}`} key={feature.id}>
                      <Feature
                          feature = {feature}
                      />
                    </Link>
                    <hr></hr>
                  </div>
              )
            })
            }
          </div>

          <Link to={`/features/create?service=${service}`} >
            <div id="create-new-item" style={{background: "#ffeead"}}> <img src={createItemIcon} alt="Create a report" /> </div>
          </Link>

        </div>

      </div>
  )

};

const mapStateToProps = (state, ownProps) => {
  return {
    //initialise state
    service: getServiceNameFromPathName(ownProps.location.pathname, 'features'),

    user: state.auth.user,
    features: state.feature.getFeaturesByService,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),

    getFeaturesByService: (service) => dispatch(getFeaturesByService(service)),
    unsubscribeGetFeaturesByService: (service) => dispatch(unsubscribeGetFeaturesByService(service)),
    resetGetFeaturesByService: () => dispatch(resetGetFeaturesByService()),

    //alerts
    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message)),
  };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps))(Features)
