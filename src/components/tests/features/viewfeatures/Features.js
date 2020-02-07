import React, {useEffect, useState} from 'react'

import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom'

import './features.css';

import {compose} from "redux";

import createItemIcon from "../../../../assets/Icons/create.png";
import {
  resetCreateTestSuccess,
} from "../../../../store/actions/reportActions";
import {
  showErrorAlert,
  showSuccessAlert
} from "../../../../store/actions/snackbarActions";
import {setPrevUrl} from "../../../../store/actions/authActions";
import GetFeaturesByServiceDbHandler
  from "../featuresdbhandlers/GetFeaturesByServiceDbHandler";
import Feature from "../../Feature";
import {getServiceNameFromPathName} from "../../../../util/StringUtil";

const Features = (props) => { //todo move this out of tests parent package/dir

  const [getFeaturesByServiceInDB, setGetFeaturesByServiceInDB] = useState(false);
  const [service, setService] = useState(getServiceNameFromPathName(props.location.pathname, 'features'));

  const [getFeaturesByServiceResponse, setGetFeaturesByServiceResponse] = useState(null);
  const [features, setFeatures] = useState(null);

  const [unsubscribeGetFeaturesByServiceInDB, setUnsubscribeGetFeaturesByServiceInDB] = useState(null);

  useEffect(() => { //get features on load
    setGetFeaturesByServiceInDB(true);
    return function cleanup() {
      setUnsubscribeGetFeaturesByServiceInDB(true);
    };
  }, [service]);

  useEffect(() => { //listen for response
    if (getFeaturesByServiceResponse){
      if(getFeaturesByServiceResponse.response === "EMPTY"){

      }

      else if (getFeaturesByServiceResponse.response === "NOT_EMPTY"){
        setFeatures(getFeaturesByServiceResponse.features)
      }

      else if (getFeaturesByServiceResponse.response === "ERROR"){

      }
    }
  }, [getFeaturesByServiceResponse]);

  const { user, setPrevUrl } = props;
  if (!user) {
    setPrevUrl(props.location.pathname);
    return <Redirect to='/login' />;
  }

  return (
      <div id='home'>
        <div id='reports-section'>

          <Link to={`/features/create?service=${service}`} >
            <div id="create-new-item" style={{background: "#ffeead"}}> <img src={createItemIcon} alt="Create a report" /> </div>
          </Link>

          {/*{reportsAvailable ? false : <NoReportsScreen*/}
              {/*service={service}*/}
              {/*phase={phase}*/}
          {/*/>*/}

          <div id='features-reports'>
            <div id='headers'>
              <div id='service'>Service/Type</div>
              <div id='title'>Title</div>
              <div id='title'>Updated At</div>
              <div id='end-column'>Created By</div>
            </div>
            { features && features.map(feature => {
              return (
                  <div>
                    <Link to={`/features/${feature.service}/${feature.id}`} key={feature.id}>
                      {/*{console.log("feature", feature)}*/}
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

        </div>

        {/*Purely Functional Non-Ui components*/}
        <GetFeaturesByServiceDbHandler
            getFeaturesByServiceInDB = {getFeaturesByServiceInDB}
            service = {service}

            setGetFeaturesByServiceResponse = {setGetFeaturesByServiceResponse}

            unsubscribeGetFeaturesByServiceInDB = {unsubscribeGetFeaturesByServiceInDB}
        />

      </div>
  )

};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.auth.user
  }
};

const mapDispatchToProps = dispatch => {
  return {
    setPrevUrl: (url) => dispatch(setPrevUrl(url)),

    //alerts
    showSuccessAlert: (message) => dispatch(showSuccessAlert(message)),
    showErrorAlert: (message) => dispatch(showErrorAlert(message)),
    resetCreateReportSuccess: (message) => dispatch(resetCreateTestSuccess(message)),
  };
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps))(Features)
