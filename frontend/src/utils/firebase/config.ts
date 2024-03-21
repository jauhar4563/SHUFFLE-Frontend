import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyB3i0fK7IzMjei2aHWxSEPkuRB2kUWDoPo",
  authDomain: "shuffle-53c70.firebaseapp.com",
  projectId: "shuffle-53c70",
  storageBucket: "shuffle-53c70.appspot.com",
  messagingSenderId: "621334363477",
  appId: "1:621334363477:web:f01fd8d122d771c39f83dc",
  measurementId: "G-2KYMNE15HG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider();