import {BASE_DOCUMENT} from "../../constants/Constants";

const testEmails = [
    "powermukisa@gmail.com",
  "derekleiro@gmail.com",
  "leiro.derek@gmail.com",
  "richkitibwa@gmail.com",
];

var notTalaEmployeeOrTestUserDispatchSent = false;

export const signIn = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((resp) => {

     if(!checkUserEmailIsValid(resp.user.email)) {
       notTalaEmployeeOrTestUserDispatchSent = true;
       return dispatch({ type: 'NOT_TALA_EMPLOYEE_OR_TEST_USER' });
     }
     else{
       // console.log(resp.user)
       notTalaEmployeeOrTestUserDispatchSent = false;
       return firestore.collection(BASE_DOCUMENT+ 'users').doc(resp.user.uid).set({
         name: resp.user.displayName,
         email: resp.user.email,
         photoURL: resp.user.photoURL
       });
     }
    }).then((resp) => {
      if(!notTalaEmployeeOrTestUserDispatchSent){
        //dispatch this action only if the user email was valid. else do nothing. the NOT_TALA_EMPLOYEE_OR_TEST_USER action would have already been dispatched
        dispatch({ type: 'LOGIN_SUCCESS' })
      }
    }).catch((err) => {
      // console.log("An error occurred while logging in or storing data in db", err)
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

const checkUserEmailIsValid = (email) => {
  if(testEmails.includes(email)){
    return true
  }
  else return !!email.includes("@tala.co");
};
