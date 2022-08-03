// Import the functions you need from the SDKs you need
import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAAZFir3eLUjnCQZdE_lehr9oXlQH5oKGQ",
    authDomain: "restovue-9057d.firebaseapp.com",
    databaseURL: "https://restovue-9057d-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "restovue-9057d",
    storageBucket: "restovue-9057d.appspot.com",
    messagingSenderId: "841830409744",
    appId: "1:841830409744:web:7e0821763dd4126cc94c95"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.database();