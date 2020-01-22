import {BASE_DOCUMENT} from "../../constants/FireStore";
import * as StringUtils from "../../util/StringUtil";

var notTalaEmployeeOrTestUserDispatchSent = false;

export const signIn = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((resp) => {

     if(!StringUtils.checkUserEmailIsValid(resp.user.email)) {
       const userEmail = resp.user.email;
       notTalaEmployeeOrTestUserDispatchSent = true;
       return dispatch({ type: 'NOT_TALA_EMPLOYEE_OR_TEST_USER', userEmail });
     }
     else{
       // console.log(resp.user)
       notTalaEmployeeOrTestUserDispatchSent = false;
       return firestore.collection(BASE_DOCUMENT+ '/users').doc(resp.user.uid).set({
         displayName: resp.user.displayName,
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

export const setPrevUrl = (url) => {
  return (dispatch) => {
    dispatch({ type: 'SET_PREV_URL_SUCCESS', url })
  }
};

export const getUsersApartFromCurrentUser = () => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    const profile = getState().firebase.auth;
    firestore.collection(`${BASE_DOCUMENT}/users`).get()
    .then((snapshot) => {
      let users = [];
      if (snapshot.empty) {
        dispatch({type: 'GET_USERS_NO_USERS'});
      } else {
        snapshot.forEach(doc => {
          if(doc.data().email !== profile.email){
            const id = doc.id;
            let user = {...doc.data(), id};
            users.push(user)
          }
        });
        dispatch({type: 'GET_USERS_SUCCESS', users: users});
      }
    }).catch(err => {
      dispatch({type: 'GET_USERS_ERROR', err});
    });
  }
};

/**
 * Get user by ID then store them in a map of id to userObject
 * @param id
 * @returns {Function}
 */
export const getUserByIdThenStoreInMap = (id) => {
  return (dispatch, getState, {getFirebase, getFirestore}) => {
    const firestore = getFirestore();
    firestore.collection(`${BASE_DOCUMENT}/users`).doc(id).get()
    .then(doc => {
      if (!doc.exists) {
        dispatch({type: 'GET_USER_BY_ID_THEN_MAP_NO_USER'});
      } else {
        let user = {...doc.data(), id};
        dispatch({type: 'GET_USER_BY_ID_THEN_MAP_SUCCESS', user: doc.data()});
      }
    })
    .catch(err => {
      dispatch({type: 'GET_USER_BY_ID_THEN_MAP_ERROR', err});
    });
  }
};
