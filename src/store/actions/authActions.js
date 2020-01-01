export const signIn = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((result) => {
      // window.location.replace('/')

      //if is tala user or test user
      // ?
      //store result in db here! then publish LOGIN_SUCCESS
      //:
      //dispatch "USER_NOT_TALA_EMPLOYEE"

      dispatch({ type: 'LOGIN_SUCCESS' })

    }).catch((err) => {
      // console.log("An error occurred while logging in", err)
      // alert("An error occurred while logging you in. please try again")
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  }
};

export const signOut = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    firebase.auth().signOut().then(() => {
      dispatch({ type: 'LOGOUT_SUCCESS' })

    }).catch((err) => {
      dispatch({ type: 'LOGOUT_ERROR', err });
    });
  }
};
