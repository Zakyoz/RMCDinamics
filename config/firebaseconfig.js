// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7241iDJfU5MbAonYZLXJBYCCiXDotcys",
  authDomain: "examen-2-a2c25.firebaseapp.com",
  projectId: "examen-2-a2c25",
  storageBucket: "examen-2-a2c25.appspot.com",
  messagingSenderId: "726711579619",
  appId: "1:726711579619:web:c1636c6b8c32407ef966d6",
  measurementId: "G-VSFXCEK4WC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export default app;
export { auth };