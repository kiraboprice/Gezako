import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';

import App from './App';

import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {reduxFirestore, getFirestore} from "redux-firestore";

import fbConfig from "fbConfig";
import firebase from "./fbConfig";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirestore})),
        reduxFirestore(fbConfig)
    )
);

firebase.auth().onAuthStateChanged(user => {
  if (user !== null) {
    store.dispatch({ type: 'LOGIN_SUCCESS', user })
  }
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
  serviceWorker.unregister();
});
