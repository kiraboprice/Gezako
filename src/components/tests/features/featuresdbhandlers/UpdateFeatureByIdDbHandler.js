import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {getFeaturesCollectionUrl} from "../../../../util/StringUtil";
import firebase from "../../../../fbConfig";

const UpdateFeatureByIdDbHandler = (props) => {

  const [updateFeatureByIdInDb, setUpdateFeatureByIdInDb] = useState(false);
  const [feature, setFeature] = useState(null);

  /**
   * Update
   */
  //listen for changes in parent state
  useEffect(() => {
    setUpdateFeatureByIdInDb(props.updateFeatureByIdInDb);
    setFeature(props.feature);
  }, [props]);

  //listen for changes in local state
  useEffect(() => {
    if(updateFeatureByIdInDb === true && feature){
      updateFeatureById(feature)
    }
  }, [updateFeatureByIdInDb]);

  const { user } = props;
  const updateFeatureById = (feature) => {
    console.log("updateFeatureById PROPS ---", props);
    const collectionUrl = getFeaturesCollectionUrl();

    firebase.firestore().collection(collectionUrl)
    .doc(feature.id)
    .update({
      title: feature.title,
      productSpec: feature.productSpec || null,
      techSpec: feature.techSpec || null,

      manualTests: feature.manualTests || null,

      updatedAt: new Date(),
      updatedBy: {id: user.uid, displayName: user.displayName}
    }).then(() => {
      props.setUpdateFeatureByIdResponse({'response' : 'SUCCESS'});
    }).catch(err => {
      props.setUpdateFeatureByIdResponse({'response' : 'ERROR', 'error' : err});
    });
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
)(UpdateFeatureByIdDbHandler)
