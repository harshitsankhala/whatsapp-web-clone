import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAOdSQAMIXdlFeOq8jbfZ__7oFTmAB1bRQ",
  authDomain: "whatsapp-web-clone-79999.firebaseapp.com",
  projectId: "whatsapp-web-clone-79999",
  storageBucket: "whatsapp-web-clone-79999.appspot.com",
  messagingSenderId: "182804643353",
  appId: "1:182804643353:web:d0161494d1102ae309f488",
  measurementId: "G-4T6RQWS1KF",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;
