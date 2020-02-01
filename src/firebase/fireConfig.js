import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBbST9tnQvphoVEiD7oMn6s8zIOuarwJts",
  authDomain: "feeder-f6976.firebaseapp.com",
  databaseURL: "https://feeder-f6976.firebaseio.com",
  projectId: "feeder-f6976",
  storageBucket: "feeder-f6976.appspot.com",
  messagingSenderId: "1019278937810",
  appId: "1:1019278937810:web:23aa325af820884c84a70b"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();
