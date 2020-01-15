const initState = {
  authSuccess: null,
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        authSuccess: action.result,
        authError: null
      };

    case 'LOGIN_ERROR':
      return {
        ...state,
        authSuccess: null,
        authError: "Log in failed. error:" + action.err.message
      };

    case 'NOT_TALA_EMPLOYEE_OR_TEST_USER':
      return {
        ...state,
        authSuccess: null,
        authError: 'Email ' + action.userEmail + ' is not valid. Please log in with your Tala email to use Gezako.'
      };

    case 'SET_PREV_URL_SUCCESS':
      return {
        ...state,
        prevUrl: action.url
      };

    case 'LOGOUT_SUCCESS':

      /**
       * Get User
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

    default:
      return state
  }
};

export default authReducer;
