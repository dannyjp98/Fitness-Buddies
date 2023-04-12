import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDKe-2SpmD_qshwvXbqbppp7jv0-l0bJzY",
  authDomain: "fitnessbuddies-b3cd2.firebaseapp.com",
  projectId: "fitnessbuddies-b3cd2",
  storageBucket: "fitnessbuddies-b3cd2.appspot.com",
  messagingSenderId: "17304059830",
  appId: "1:17304059830:web:5335c7edf8b3c9efb80b17",
  measurementId: "G-K4DHP8FGFL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();

export { app, db, auth, storage };
