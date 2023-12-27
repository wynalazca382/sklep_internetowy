import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const initializeFirebase = () => {
  const firebaseConfig = {
    apiKey: "AIzaSyAfjSs2cPWiWW-qnKaCcLpFKKcIqPqKCpA",
    authDomain: "sklep-e859a.firebaseapp.com",
    projectId: "sklep-e859a",
    storageBucket: "sklep-e859a.appspot.com",
    messagingSenderId: "154827767210",
    appId: "1:154827767210:web:0f63e837b4658f0d37bfd3",
    measurementId: "G-MNMP68PZS3"
  };

  if (!firebase.apps.length) {
    console.log('Initializing Firebase...');
    firebase.initializeApp(firebaseConfig);
  } else {
    console.log('Firebase is already initialized.');
  }
};

initializeFirebase();

const db = firebase.firestore();

export { db };
