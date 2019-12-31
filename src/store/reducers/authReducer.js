const initState = {
  authSuccess: null,
  authError: null
}

const authReducer = (state = initState, action) => {
  switch(action.type){
    case 'LOGIN_ERROR':
      console.log('login error');
      return {
        ...state,
        authSuccess: null,
        // authError: action.err
        authError: "Log in failed"
      };
    case 'LOGIN_SUCCESS':
      console.log('login success');
      return {
        ...state,
        authSuccess: action.result,
        authError: null
      };
    case 'SIGNOUT_SUCCESS':
      console.log('signout success');
      return state;
    default:
      return state
  }
};

export default authReducer;
