// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmkkhEs4PXk5DHXSueLFsjBJoRY8AzOMU",
  authDomain: "ritho-ae2e3.firebaseapp.com",
  projectId: "ritho-ae2e3",
  storageBucket: "ritho-ae2e3.appspot.com",
  messagingSenderId: "655302590442",
  appId: "1:655302590442:web:5f3cf60d46276f0ec8fc93",
};

export const getAppInstance = () => initializeApp(firebaseConfig);
