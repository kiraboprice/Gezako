import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from './serviceWorker';

import App from './App';

import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {reactReduxFirebase, getFirebase} from "react-redux-firebase";
import {reduxFirestore, getFirestore} from "redux-firestore";

import fbConfig from "fbConfig";
import {BASE_DOCUMENT} from "./constants/FireStore";

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
        reactReduxFirebase(fbConfig, {useFirestoreForProfile: true, userProfile: BASE_DOCUMENT +'/users', attachAuthIsReady: true}),
        reduxFirestore(fbConfig)
    )
);


store.firebaseAuthIsReady.then(() => {
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
});
