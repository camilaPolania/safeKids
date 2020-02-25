import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

import firebaseCredentials from "./firebaseCredentials";

import StoreFirebase from "./StoreFirebase";
import StorageFirebase from "./StorageFirebase";
import AuthFirebase from './AuthFirebase';

const firebaseConfig = firebaseCredentials;
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const store = firebase.firestore();
const storage = firebase.storage();

function init() {
    AuthFirebase.setRef(auth);
    StoreFirebase.setRef(store);
    StorageFirebase.setRef(storage);
}

export default {init};