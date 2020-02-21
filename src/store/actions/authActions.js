import firebase from "../../fbConfig"

import {BASE_DOCUMENT} from "../../constants/FireStore";
import * as StringUtils from "../../util/StringUtil";

let notTalaEmployeeOrTestUserDispatchSent = false;

// export const verifyAuth = () => dispatch => {
//   // dispatch(verifyRequest());
//   firebase.auth().onAuthStateChanged(user => {
//     if (user !== null) {
//       dispatch({ type: 'LOGIN_SUCCESS' })
//     }
//     // else {
//     //   dispatch({ type: 'USER_NOT_LOGGED_IN' })
//     // }
//     dispatch({ type: 'VERIFY_AUTH_FINISHED' })
//   });
// };

export const signIn = () => {
  return (dispatch, getState) => {
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then((resp) => {

     // if(!StringUtils.checkUserEmailIsValid(resp.user.email)) {
     //   const userEmail = resp.user.email;
     //   notTalaEmployeeOrTestUserDispatchSent = true;
     //   return dispatch({ type: 'NOT_TALA_EMPLOYEE_OR_TEST_USER', userEmail });
     // }
     // else{
     //   // console.log(resp.user)
     //   notTalaEmployeeOrTestUserDispatchSent = false;
     //   return firebase.firestore().collection(BASE_DOCUMENT+ '/users').doc(resp.user.uid).set({
     //     displayName: resp.user.displayName,
     //     email: resp.user.email,
     //     photoURL: resp.user.photoURL
     //   });
     // }
    }).then((user) => {
      if(!notTalaEmployeeOrTestUserDispatchSent){
        //dispatch this action only if the user email was valid. else do nothing. the NOT_TALA_EMPLOYEE_OR_TEST_USER action would have already been dispatched
        // console.log("IN signIn--------");
        // dispatch({ type: 'LOGIN_SUCCESS', user }) //this causes an error when the user first logs in.
        //using the onAuthStateChanged in index.js for now
      }
    }).catch((err) => {
      // console.log("An error occurred while logging in or storing data in db", err)
      dispatch({ type: 'LOGIN_ERROR', err });
    });
  }
};

export const signOut = () => {
  return (dispatch, getState) => {
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
  return (dispatch, getState) => {
    const user = getState().auth.user;
    firebase.firestore().collection(`${BASE_DOCUMENT}/users`).get()
    .then((snapshot) => {
      let users = [];
      if (snapshot.empty) {
        dispatch({type: 'GET_USERS_NO_USERS'});
      } else {
        snapshot.forEach(doc => {
          if(doc.data().email !== user.email){
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

export const unsubscribeGetUsersApartFromCurrentUser = () => {
  return (dispatch, getState) => {
    firebase.firestore().collection(`${BASE_DOCUMENT}/users`).get()
    .then((snapshot) => { });
  }
};

export const resetGetUsersApartFromCurrentUser = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_USERS_SUCCESS'});
  }
};

export const getAllUsers = () => {
  return (dispatch, getState) => {
    const user = getState().auth.user;
    firebase.firestore().collection(`${BASE_DOCUMENT}/users`).get()
    .then((snapshot) => {
      let users = [];
      if (snapshot.empty) {
        dispatch({type: 'GET_ALL_USERS_NO_USERS'});
      } else {
        snapshot.forEach(doc => {
          if(doc.data().email !== user.email){
            users.push({id: doc.id, ...doc.data()})
          }
        });
        dispatch({type: 'GET_ALL_USERS_SUCCESS', allUsers: users});
      }
    }).catch(err => {
      dispatch({type: 'GET_ALL_USERS_ERROR', err});
    });
  }
};

export const unsubscribeGetAllUsers = () => {
  return (dispatch, getState) => {
    firebase.firestore().collection(`${BASE_DOCUMENT}/users`).get()
    .then((snapshot) => { });
  }
};

export const resetGetAllUsers = () => {
  return (dispatch) => {
    dispatch({type: 'RESET_GET_ALL_USERS_SUCCESS'});
  }
};

/**
 * Get user by ID then store them in a map of id to userObject
 * @param id
 * @returns {Function}
 */
export const getUserByIdThenStoreInMap = (id) => {
  return (dispatch, getState) => {
    firebase.firestore().collection(`${BASE_DOCUMENT}/users`).doc(id).get()
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
