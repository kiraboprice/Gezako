
const initState = {
  serviceStats: null
};


const featureReducer = (state = initState, action) => {
  switch (action.type) {
    /**
       * Get Report
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

      default:
      return state;

  }
};

export default featureReducer;
