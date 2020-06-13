
const initState = {
  apps: null
};


const settingsReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_APP_SUCCESS':
      console.log('CREATE_APP_SUCCESS', action.id);
      return {
        ...state,
        createAppId: action.id
      };

    case 'CREATE_APP_ERROR':
      // console.log('CREATE_APP_ERROR', action.error);
      return {
        ...state,
        createAppId: null
      };

      /**
       * Get Apps
       */
    case 'GET_APPS_NO_APPS':
      return state;

    case 'GET_APPS_SUCCESS':
      // console.log('GET_APPS_SUCCESS', action.apps);
      return {
        ...state,
        apps: action.apps
      };

    default:
      return state;

  }
};

export default settingsReducer;
