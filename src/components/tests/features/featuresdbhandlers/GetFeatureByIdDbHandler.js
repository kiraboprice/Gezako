import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {getFeaturesCollectionUrl} from "../../../../util/StringUtil";
import firebase from "../../../../fbConfig";

const GetFeatureByIdDbHandler = (props) => {

  const [getFeatureByIdInDb, setGetFeatureByIdInDb] = useState(false);
  const [id, setId] = useState(null);

  const [unsubscribeGetFeatureByIdInDb, setUnsubscribeGetFeatureByIdInDb] = useState(false);

  /**
   * Get
   */
  //listen for changes in parent state
  useEffect(() => {
    setGetFeatureByIdInDb(props.getFeatureByIdInDb);
    setId(props.id);
  }, [props]);

  //listen for changes in local state
  useEffect(() => {
    if(getFeatureByIdInDb === true && id){
      getFeatureById(id)
    }
  }, [getFeatureByIdInDb]);

  const getFeatureById = (id) => {
    console.log("getFeatureById PROPS ---", props);
    const collectionUrl = getFeaturesCollectionUrl();

    firebase.firestore().collection(`${collectionUrl}`)
    .doc(id)
    .onSnapshot(snapshot => {
      if (!snapshot.exists) {
        props.setGetFeatureByIdResponse({'response' : 'NOT_EXIST'});
      } else {
        let feature = {...snapshot.data(), id};
        props.setGetFeatureByIdResponse({'response' : 'EXISTS', 'feature' : feature});
      }

    }, err => {
      props.setGetFeatureByIdResponse({'response' : 'ERROR'});
    });
  };

  /**
   * Unsubscribe
   */
  //listen for changes in parent state
  useEffect(() => {
    setUnsubscribeGetFeatureByIdInDb(props.unsubscribeGetFeatureByIdInDb);
  }, [props]);

  //listen for changes in local state
  useEffect(() => {
    if(unsubscribeGetFeatureByIdInDb === true){
      unsubscribeGetFeatureById(id)
    }
  }, [unsubscribeGetFeatureByIdInDb]);

  const unsubscribeGetFeatureById = (id) => {
    const collectionUrl = getFeaturesCollectionUrl();
    firebase.firestore().collection(`${collectionUrl}`)
    .doc(id)
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
)(GetFeatureByIdDbHandler)
