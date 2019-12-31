export const signIn = () => {
  return (dispatch, getState, {getFirebase}) => {
    const firebase = getFirebase();

    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider).then((result) => {
      // window.location.replace('/')
      //store result in db here!
      dispatch({ type: 'LOGIN_SUCCESS', result });

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
      dispatch({ type: 'SIGNOUT_SUCCESS' })
    });
  }
};
