import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useRef } from "react";

const config = {
    apiKey: "AIzaSyBaFUQJLGIoI6yvml6WwObPRjNEUmcVCic",
    authDomain: "crown-db-74871.firebaseapp.com",
    projectId: "crown-db-74871",
    storageBucket: "crown-db-74871.appspot.com",
    messagingSenderId: "178301396044",
    appId: "1:178301396044:web:0e16202c1dac2c45d880e9",
    measurementId: "G-30JCFKEMDV"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = userRef.get();



    if(!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch (error){
        console.log("error creating user", error.message);
      }
    }

    // console.log(snapShot);
    return userRef;
  };

  export const addCollectionAndDocuments = async(collectionKey, objectToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    const batch = firestore.batch();
    objectToAdd.forEach(obj => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, obj);
    });

    return await batch.commit()
  };

  export const convertCollectionSnapshotToMap = (collections) => {
    const transformedCollection = collections.docs.map(doc => {
      const {title, items} = doc.data();

      return {
        routeName: encodeURI(title.toLowerCase()),
        id: doc.id,
        title,
        items
      }
    });
    return transformedCollection.reduce((accumulator, collection) => {
      accumulator[collection.title.toLowerCase()] = collection;
      return accumulator;
    }, {});

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();
  
  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: "select_account"});

  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  export default firebase;
