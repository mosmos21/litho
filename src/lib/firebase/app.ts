import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAXWBZNSzDkwNfUiTDFMrLP9jHSC1iDgv8",
  authDomain: "litho-e9507.firebaseapp.com",
  projectId: "litho-e9507",
  storageBucket: "litho-e9507.appspot.com",
  messagingSenderId: "309063389186",
  appId: "1:309063389186:web:86206cbde722659fdd571b",
};

export const getAppInstance = () => initializeApp(firebaseConfig);
