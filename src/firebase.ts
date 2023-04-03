import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAD4nFbE0vOTp2InHAoagkXwPfEZtkDgcE",
  authDomain: "fitnessbuddies-test.firebaseapp.com",
  projectId: "fitnessbuddies-test",
  storageBucket: "fitnessbuddies-test.appspot.com",
  messagingSenderId: "957977307886",
  appId: "1:957977307886:web:08037caf79dbfd8465a1ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export { app, db, auth, storage };
