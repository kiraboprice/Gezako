
const initState = {
  serviceStats: null
};


const featureReducer = (state = initState, action) => {
  switch (action.type) {
    /**
       * Get Features
       */
    case 'GET_FEATURES_BY_SERVICE_EMPTY':
      console.log('GET_FEATURES_BY_SERVICE_EMPTY');
      return {
        ...state,
        getFeaturesByService: []
      };

    case 'GET_FEATURES_BY_SERVICE_ERROR':
      console.log('GET_FEATURES_BY_SERVICE_ERROR', action.error);
      return {
        ...state,
        getFeaturesByService: 'ERROR'
      };

    case 'GET_FEATURES_BY_SERVICE_SUCCESS':
      // console.log('GET_FEATURES_BY_SERVICE_SUCCESS', action.features);
      return {
        ...state,
        getFeaturesByService: action.features
      };

    case 'RESET_GET_FEATURES_BY_SERVICE':
      console.log('RESET_GET_FEATURES_BY_SERVICE');
      return {
        ...state,
        getFeaturesByService: null
      };


      /**
       * Get Feature
       */
    case 'GET_FEATURE_SUCCESS':
      // console.log('GET_FEATURE_SUCCESS', action.feature);
      return {
        ...state,
        getFeature: action.feature
      };

    case 'GET_FEATURE_ERROR_NOT_EXIST':
      // console.log('GET_FEATURE_ERROR_NOT_EXIST', action.error);
      return {
        ...state,
        getFeature: 'GET_FEATURE_ERROR_NOT_EXIST'
      };

    case 'GET_FEATURE_ERROR':
      console.log('GET_FEATURE_ERROR', action.error);
      return state;

    case 'RESET_GET_FEATURE':
      console.log('RESET_GET_FEATURE');
      return {
        ...state,
        getFeature: null
      };

      /**
       * Delete Report
       */
      // case 'DELETE_FEATURE_SUCCESS':
      //   console.log('DELETE_FEATURE_SUCCESS');
      //   return state;
      //
      // case 'DELETE_FEATURE_ERROR':
      //   console.log('DELETE_FEATURE_ERROR', action.error);
      //   return state;

      /**
       * Update Report
       */
    case 'UPDATE_FEATURE_SUCCESS':
      // console.log('UPDATE_FEATURE_SUCCESS', action.feature);
      return {
        ...state,
        updateFeatureResult: 'success'
      };

    case 'UPDATE_FEATURE_ERROR':
      // console.log('UPDATE_FEATURE_ERROR', action.error);
      return state;

    case 'RESET_UPDATE_FEATURE_STATE':
      console.log('RESET_UPDATE_FEATURE_STATE');
      return {
        ...state,
        updateFeatureResult: null
      };

      default:
      return state;

  }
};

export default featureReducer;
