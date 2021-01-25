import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyDOB7o3t4G7YVoUFNXCcGUgY8hEDgUOsBk",
  authDomain: "estimator-68282.firebaseapp.com",
  projectId: "estimator-68282",
  storageBucket: "estimator-68282.appspot.com",
  messagingSenderId: "829458453633",
  appId: "1:829458453633:web:60c912507d43e3d6f02980"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;