import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {
  getFeaturesCollectionUrl,
  getReportsCollectionUrl
} from "../../../util/StringUtil";
import firebase from "../../../fbConfig";

const CreateFeatureDbHandler = (props) => {

  const [createFeatureInDB, setCreateFeatureInDB] = useState(false);
  const [feature, setFeature] = useState('');

  //listen for changes in parent state
  useEffect(() => {
    setCreateFeatureInDB(props.createFeatureInDB);
    setFeature(props.feature);
  }, [props]);

  //listen for changes in local state
  useEffect(() => {
    if(createFeatureInDB === true && feature){
      createFeature(feature)
    }
  }, [createFeatureInDB]);

  const {user} = props;

  const createFeature = (feature) => {
    // console.log("createFeature---", feature);

    const collectionUrl = getFeaturesCollectionUrl(user.company);
    firebase.firestore().collection(collectionUrl).add({
        ...feature,
        //just leaving this here to show possibility of using profile in an action. but this is not scalable. if the displayName ever gets updated, we'd need a cloud function which listens on the user collection for this user specifically, then updates everywhere.
        createdBy: user.displayName,
        userId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      }).then((docRef) => {
        // console.log("createFeature PROPS 2---", props);
        props.setCreateFeatureSuccess({id: docRef.id});
      }).catch(err => {
        // console.log("createFeature ERR---", err);
        props.setCreateFeatureError(err);
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
)(CreateFeatureDbHandler)
