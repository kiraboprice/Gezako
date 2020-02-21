
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
      console.log('UPDATE_FEATURE_ERROR', action.error);
      return {
        ...state,
        updateFeatureResult: 'error'
      };

    case 'RESET_UPDATE_FEATURE':
      console.log('RESET_UPDATE_FEATURE');
      return {
        ...state,
        updateFeatureResult: null
      };


      /**
       * Comments
       */
    case 'CREATE_FEATURE_COMMENT_SUCCESS':
      // console.log('CREATE_FEATURE_COMMENT_SUCCESS', action.id);
      return {
        ...state,
        createFeatureComment: action.id
      };

    case 'CREATE_FEATURE_COMMENT_ERROR':
      // console.log('CREATE_FEATURE_COMMENT_ERROR', action.error);
      return state;

    case 'GET_FEATURE_COMMENTS_EMPTY':
      // console.log('GET_FEATURE_COMMENTS_EMPTY', action.error);
      return {
        ...state,
        getFeatureComments: []
      };

    case 'GET_FEATURE_COMMENTS_SUCCESS':
      // console.log('GET_FEATURE_COMMENTS_SUCCESS');
      return {
        ...state,
        getFeatureComments: action.comments
      };

    case 'GET_FEATURE_COMMENTS_ERROR':
      // console.log('GET_FEATURE_COMMENTS_ERROR', action.error);
      return state;

    case 'RESET_GET_FEATURE_COMMENTS':
      // console.log('RESET_GET_FEATURE_COMMENTS', action.error);
      return {
        ...state,
        getFeatureComments: null
      };

    case 'UPDATE_FEATURE_COMMENT_SUCCESS':
      console.log('UPDATE_FEATURE_COMMENT_SUCCESS');
      return {
        ...state,
        updateFeatureComment: 'success'
      };

    case 'UPDATE_FEATURE_COMMENT_ERROR':
      // console.log('UPDATE_FEATURE_COMMENT_ERROR', action.error);
      return state;

    case 'DELETE_FEATURE_COMMENT_SUCCESS':
      console.log('DELETE_FEATURE_COMMENT_SUCCESS');
      return {
        ...state,
        deleteFeatureComment: 'success'
      };

    case 'DELETE_FEATURE_COMMENT_ERROR':
      // console.log('DELETE_FEATURE_COMMENT_ERROR', action.error);
      return state;


      default:
      return state;

  }
};

export default featureReducer;
