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
        // authError: action.err
        authError: "Log in failed, Please try again"
      };

    case 'NOT_TALA_EMPLOYEE_OR_TEST_USER':
      return {
        ...state,
        authSuccess: null,
        authError: "Please log in with your Tala email to user Gezako."
      };

    case 'LOGOUT_SUCCESS':
      return state;
    default:
      return state
  }
};

export default authReducer;
