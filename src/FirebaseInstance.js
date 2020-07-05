import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const firebaseConfig = {
    apiKey: "AIzaSyDGvDkp65h7zZiQhuzDBKOcak99FzM0hxo",
    authDomain: "torim-6354f.firebaseapp.com",
    databaseURL: "https://torim-6354f.firebaseio.com",
    projectId: "torim-6354f",
    storageBucket: "torim-6354f.appspot.com",
    messagingSenderId: "316686576606",
    appId: "1:316686576606:web:7e6e1ec0ccba88b0ca4b4f",
    measurementId: "G-PC9VWDMS6C"
};

const firebaseInstace = firebase.initializeApp(firebaseConfig);
export default firebaseInstace;


