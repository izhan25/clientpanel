import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAA2NbohjDvZYpg0Q6a88tvGfUVzkAvNew",
    authDomain: "reactclientpanel-21155.firebaseapp.com",
    databaseURL: "https://reactclientpanel-21155.firebaseio.com",
    projectId: "reactclientpanel-21155",
    storageBucket: "reactclientpanel-21155.appspot.com",
    messagingSenderId: "986151570497"
}

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true
}

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
// const firestore = firebase.firestore();
// const settings = { timestampsInSnapshots: true };
// firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase(firebase, rrfConfig),
    reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});


// initial state
const initialState = {}


// Create store with reducers
const store = createStoreWithFirebase(rootReducer, initialState, compose(reactReduxFirebase(firebase), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()));


export default store;
