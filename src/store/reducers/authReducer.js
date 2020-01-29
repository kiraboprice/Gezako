const initState = {
  user: null,
  userAuthError: null,
  getUserByIdThenStoreInMap: []
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'NO_USER_IS_SIGNED_IN':
      return {
        ...state,
        user: null,
        userAuthError: null
      };

    case 'LOGIN_SUCCESS':
      // console.log('LOGIN_SUCCESS---', action.user);
      return {
        ...state,
        user: action.user,
        userAuthError: null
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        user: null,
        userAuthError: "Log in failed. error:" + action.err.message
      };

    case 'NOT_TALA_EMPLOYEE_OR_TEST_USER':
      return {
        ...state,
        user: null,
        userAuthError: 'Email ' + action.userEmail + ' is not valid. Please log in with your Tala email to use Gezako.'
      };

    case 'SET_PREV_URL_SUCCESS':
      return {
        ...state,
        prevUrl: action.url
      };

    case 'LOGOUT_SUCCESS':

      /**
       * Get Users
       */
    case 'GET_USERS_NO_USERS':
      return state;

    case 'GET_USERS_SUCCESS':
      return {
        ...state,
        users: action.users
      };

    case 'GET_USERS_ERROR':
      return state;

      /**
       * Get User By Id
       */
    case 'GET_USER_BY_ID_THEN_MAP_NO_USER':
      return state;

    case 'GET_USER_BY_ID_THEN_MAP_SUCCESS':
      const id = action.user.id;
      const user = action.user;
      state.getUserByIdThenStoreInMap.push({id: id, user: user});

      return state;

    case 'GET_USER_BY_ID_THEN_MAP_ERROR':
      return state;

    default:
      return state
  }
};

export default authReducer;
