import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDybTjL2tUZxYmEI83CEugFbiwP--VFfiQ",
    authDomain: "float-app-50e6f.firebaseapp.com",
    projectId: "float-app-50e6f",
    storageBucket: "float-app-50e6f.appspot.com",
    messagingSenderId: "558708143753",
    appId: "1:558708143753:web:732ff0394040ec44a8f858",
    measurementId: "G-TTR6C4KFEP"
  });
 
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);


export { db, auth, storage, firebaseApp };