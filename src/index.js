import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';

import App from './App';

import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import firebase from "./fbConfig";
import * as StringUtils from "./util/StringUtil";
import {BASE_DOCUMENT} from "./constants/FireStore";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk)
    )
);
let notTalaEmployeeOrTestUserDispatchSent = false;

firebase.auth().onAuthStateChanged(user => {
  if (user !== null) {
    if(!StringUtils.checkUserEmailIsValid(user.email)) {
      const userEmail = user.email;
      notTalaEmployeeOrTestUserDispatchSent = true;
      store.dispatch({ type: 'NOT_REGISTERED_UNDER_A_COMPANY_OR_TEST_USER', userEmail })
    }
    else{
      const company = StringUtils.getCompanyNameFromEmail(user.email)
      notTalaEmployeeOrTestUserDispatchSent = false;
      firebase.firestore().collection(BASE_DOCUMENT+ `/${company}/users`).doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL
      });
      user["company"] = company
      store.dispatch({ type: 'LOGIN_SUCCESS', user })
    }
  }
  else {
    console.log('NO_USER_IS_SIGNED_IN');
    store.dispatch({ type: 'NO_USER_IS_SIGNED_IN'});
  }
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
