// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAZRKN6yDKqln65UKGBgQbP03_VoKnJ5Y",
  authDomain: "dailyfish-f4d41.firebaseapp.com",
  projectId: "dailyfish-f4d41",
  storageBucket: "dailyfish-f4d41.appspot.com",
  messagingSenderId: "656751229075",
  appId: "1:656751229075:web:0d0f211889294f078ff566"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


export default auth;