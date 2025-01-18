// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore as firestore } from "firebase/firestore";// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

apiKey: import.meta.env.firebase_api_key,
  authDomain: import.meta.env.auth_domain,
  projectId: import.meta.env.project_id,
  storageBucket: import.meta.env.storage_bucket,
  messagingSenderId: import.meta.env.messaging_sender_id,
  appId: import.meta.env.app_id,
  measurementId: import.meta.env.measurement_id
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = firestore(app)

export default app;
// const analytics = getAnalytics(app);