import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
    apiKey: "AIzaSyBaFUQJLGIoI6yvml6WwObPRjNEUmcVCic",
    authDomain: "crown-db-74871.firebaseapp.com",
    projectId: "crown-db-74871",
    storageBucket: "crown-db-74871.appspot.com",
    messagingSenderId: "178301396044",
    appId: "1:178301396044:web:0e16202c1dac2c45d880e9",
    measurementId: "G-30JCFKEMDV"
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: "select_account"});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;
