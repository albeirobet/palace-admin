import { boot } from "quasar/wrappers";

import firebase from "firebase/app";
import "firebase/auth";

var firebaseConfig = {
  apiKey: "AIzaSyCpkH_hw80GQx65RNjzyGV2yxj3yMCrFCY",
  authDomain: "palace-admin.firebaseapp.com",
  projectId: "palace-admin",
  storageBucket: "palace-admin.appspot.com",
  messagingSenderId: "45288339341",
  appId: "1:45288339341:web:5fdf8126ecd0f3a4392fc4",
  measurementId: "G-LXM2T83NQ8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//init services
const auth = firebase.auth();
//  export vars
export { auth };
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async (/* { app, router, ... } */) => {
  // something to do
});
