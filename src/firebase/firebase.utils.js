import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    
    apiKey: "AIzaSyCa8gYY4qTJiiY0Uuxr7nEX0x5QhBCs7xA",
    authDomain: "crwn-db-9af52.firebaseapp.com",
    projectId: "crwn-db-9af52",
    storageBucket: "crwn-db-9af52.appspot.com",
    messagingSenderId: "143959297016",
    appId: "1:143959297016:web:cd4364ece3eba1a8ece40d",
    measurementId: "G-H5JVV6ZX9F"
      
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exits) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();

        try{
          await userRef.set({
              displayName,
              email,
              createdAt,
              ...additionalData
          })
        }catch(error) {
           console.log('error creating user', error.message);
        }
    } 
    
    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
