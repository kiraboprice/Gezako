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
        authError: "Log in failed"
      };

    case 'LOGOUT_SUCCESS':
      return state;
    default:
      return state
  }
};

export default authReducer;
