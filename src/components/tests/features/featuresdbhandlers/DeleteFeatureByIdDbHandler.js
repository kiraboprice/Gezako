import React, {useEffect, useState} from 'react';
import {compose} from "redux";
import connect from "react-redux/es/connect/connect";
import {getFeaturesCollectionUrl} from "../../../../util/StringUtil";
import firebase from "../../../../fbConfig";

const DeleteFeatureByIdDbHandler = (props) => {

  const [deleteFeatureByIdInDb, setDeleteFeatureByIdInDb] = useState(false);
  const [id, setId] = useState(null);

  /**
   * Delete
   */
  //listen for changes in parent state
  useEffect(() => {
    setDeleteFeatureByIdInDb(props.deleteFeatureByIdInDb);
    setId(props.id);
  }, [props]);

  //listen for changes in local state
  useEffect(() => {
    if(deleteFeatureByIdInDb === true && id){
      deleteFeatureById(id)
    }
  }, [deleteFeatureByIdInDb]);

  const deleteFeatureById = (id) => {
    console.log("deleteFeatureById PROPS ---", props);
    const collectionUrl = deleteFeaturesCollectionUrl();

    firebase.firestore().collection(`${collectionUrl}`)
    .doc(id)
    .delete()
    .then(
        result => {
          props.setDeleteFeatureByIdResponse({'response' : 'SUCCESS'});

        }, err => {
          props.setDeleteFeatureByIdResponse({'response' : 'ERROR', 'error' : err});

        }
    );
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
)(DeleteFeatureByIdDbHandler)
