// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  connectFirestoreEmulator,
  initializeFirestore,
} from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getStorage, connectStorageEmulator } from "firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";

import { firebaseConfig } from "./firebaseConfig";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);

console.info("Initialised App");

const db = getFirestore(app);
// connectFirestoreEmulator(db, "http://localhost", 8080);
// connectFirestoreEmulator(db, "http://127.0.0.1", 8080);
// connectFirestoreEmulator(db, "http://192.168.0.14", 8080);
connectFirestoreEmulator(db, "10.0.2.2", 8080);
// connectFirestoreEmulator(db, "http://10.0.2.2", 8080);

console.info("Initialised DB");

const storage = getStorage(app);
// connectStorageEmulator(storage, "http://localhost", 9199);
// connectStorageEmulator(storage, "http://127.0.0.1", 9199);
// connectStorageEmulator(storage, "http://192.168.0.14", 9199);
connectStorageEmulator(storage, "10.0.2.2", 9199);

console.info("Initialised Storage");

const functions = getFunctions(app);
// connectFunctionsEmulator(functions, "http://localhost", 5001);
// connectFunctionsEmulator(functions, "http://127.0.0.1", 5001);
// connectFunctionsEmulator(functions, "http://192.168.0.14", 5001);
connectFunctionsEmulator(functions, "10.0.2.2", 5001);

console.info("Initialised Functions");

const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");
// connectAuthEmulator(auth, "http://127.0.0.1:9099");
// connectAuthEmulator(auth, "http://192.168.0.14:9099");
connectAuthEmulator(auth, "http://10.0.2.2:9099");

console.info("Initialised Auth");

export { db, auth, storage, functions };
