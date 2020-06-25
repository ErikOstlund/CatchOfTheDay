import Rebase from 're-base';
import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: 'AIzaSyDn4YkGUZvhvXMWmp89m5ML60eYKh3MoSY',
    authDomain: 'erik-catch-of-the-day.firebaseapp.com',
    databaseURL: 'https://erik-catch-of-the-day.firebaseio.com',
    projectId: 'erik-catch-of-the-day',
    storageBucket: 'erik-catch-of-the-day.appspot.com',
    messagingSenderId: '940424097503',
    appId: '1:940424097503:web:8964d20b2702b9e080036a'
});

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp };

// This is the default export
export default base;
