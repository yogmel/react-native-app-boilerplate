const firebase = require('firebase')
import { API_KEY } from './key';
import firebaseconfig from './firebaseconfig';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: firebaseconfig.authDomain,
  databaseURL: firebaseconfig.databaseURL,
  projectId: firebaseconfig.projectId,
  storageBucket: firebaseconfig.storageBucket,
  messagingSenderId: firebaseconfig.messagingSenderId,
  appId: firebaseconfig.appId,
  measurementId: firebaseconfig.measurementId
};

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default firebaseApp