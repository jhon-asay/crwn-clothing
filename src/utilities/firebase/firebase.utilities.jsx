import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAL4IU12RZQIlvFTt32nDQuzf_wSktWtMg",
  authDomain: "crwn-clothing-db-c3733.firebaseapp.com",
  projectId: "crwn-clothing-db-c3733",
  storageBucket: "crwn-clothing-db-c3733.appspot.com",
  messagingSenderId: "971653389939",
  appId: "1:971653389939:web:b520b47538ec85fc519406",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const authentication = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(authentication, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(authentication, googleProvider);

export const dataBase = getFirestore(); // Firetore is Firebase's data storage

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(dataBase, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("Error creating user", error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(authentication, email, password);
};
