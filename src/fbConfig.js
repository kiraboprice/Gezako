import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// use when deploying to prod
//todo find a safe way to do this

// var config = {
//   apiKey: "AIzaSyCkXI9xk9GcwQ9IlVC5_NUitcH4n5tiukM",
//   authDomain: "gezako-8a7aa.firebaseapp.com",
//   // databaseURL: "YOUR_DATABASE_URL",
//   projectId: "gezako-8a7aa",
//   storageBucket: "gezako-8a7aa.appspot.com"
// }

//use when deploying to stage
var config = {
  apiKey: "AIzaSyDyx214BC8smASa57pqCQpkweAnZV83gBc",
  authDomain: "gezako-staging.firebaseapp.com",
  // databaseURL: "YOUR_DATABASE_URL",
  projectId: "gezako-staging",
  storageBucket: "gezako-staging.appspot.com"
};

firebase.initializeApp(config);
firebase.firestore();

export default firebase