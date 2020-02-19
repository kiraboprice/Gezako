import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {
  getFeaturesCollectionUrl,
  getReportsCollectionUrl
} from "../../../util/StringUtil";
import firebase from "../../../fbConfig";

const GetFeaturesByServiceDbHandler = (props) => {

  const [getFeaturesByServiceInDB, setGetFeaturesByServiceInDB] = useState(false);
  const [service, setService] = useState(null);

  const [unsubscribeGetFeaturesByServiceInDB, setUnsubscribeGetFeaturesByServiceInDB] = useState(false);

  /**
   * Get
   */
  //listen for changes in parent state
  useEffect(() => {
    setGetFeaturesByServiceInDB(props.getFeaturesByServiceInDB);
    setService(props.service);
  }, [props]);

  //listen for changes in local state
  useEffect(() => {
    if(getFeaturesByServiceInDB === true && service){
      getFeaturesByService(service)
    }
  }, [getFeaturesByServiceInDB]);

  const getFeaturesByService = (service) => {
    console.log("getFeaturesByService PROPS ---", props);


  };

  /**
   * Unsubscribe
   */
  //listen for changes in parent state
  useEffect(() => {
    setUnsubscribeGetFeaturesByServiceInDB(props.unsubscribeGetFeaturesByServiceInDB);
  }, [props]);

  //listen for changes in local state
  useEffect(() => {
    if(unsubscribeGetFeaturesByServiceInDB === true){
      unsubscribeGetFeaturesByService(service)
    }
  }, [unsubscribeGetFeaturesByServiceInDB]);

  const unsubscribeGetFeaturesByService = (service) => {
    const collectionUrl = getFeaturesCollectionUrl();
    firebase.firestore().collection(`${collectionUrl}`)
    .where('service', '==', `${service}`)
    // .orderBy('title')
    .onSnapshot(() => { });
  };

  return null
};

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
  }
};

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
)(GetFeaturesByServiceDbHandler)
