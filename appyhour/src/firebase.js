import * as firebase from 'firebase'

var config = {
    apiKey: "AIzaSyBtBCvpGRJxVDRB1BkrvYNSaAF5UGNCgio",
    authDomain: "appyhour-113cc.firebaseapp.com",
    databaseURL: "https://appyhour-113cc.firebaseio.com",
    projectId: "appyhour-113cc",
    storageBucket: "",
    messagingSenderId: "331412788676"
  };

//a logical check to make sure firebase is only initialized once
//if length is not null then return firebase.app()
export default !firebase.apps.length? firebase.initializeApp(config) : firebase.app()
