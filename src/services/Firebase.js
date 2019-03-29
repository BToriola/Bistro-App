import * as firebase from "firebase";

//initialize app
const firebaseConfig = {
  apiKey: "AIzaSyDciqng4uS7v8if3vkek6J3wYWwfG43-fk",
  authDomain: "foodshop-bd0ef.firebaseapp.com",
  databaseURL: "https://foodshop-bd0ef.firebaseio.com",
  projectId: "foodshop-bd0ef",
  storageBucket: "foodshop-bd0ef.appspot.com",
  messagingSenderId: "912886776726"
};

export const firebaseRef = firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
