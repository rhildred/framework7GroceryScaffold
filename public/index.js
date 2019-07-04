import Framework7 from 'framework7/framework7.esm.bundle';
import Dom7 from 'dom7';
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import config from "./firebase.js";

firebase.initializeApp(config);
const $$ = Dom7;

// Init F7
const app = new Framework7({
    root: '#app',
    theme: 'auto',
    // Fix for iPhone X notch
    statusbar: {
        overlay: Framework7.device.ios ? Framework7.device.webView || Framework7.device.cordova : 'auto',
    },
});

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        app.tab.show("#tab2", true);
        console.log(user);
    } else {
        app.tab.show("#tab1", true);
        console.log("logged out");
    }
});

$$("#signInButton").on("click", () => {
    var formData = app.form.convertToData('#loginForm');
    firebase.auth().signInWithEmailAndPassword(formData.username, formData.password).then(
        () => {
            // could save extra info in a profile here I think.
            app.loginScreen.close(".loginYes", true);
        }
    ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $$("#signInError").html(errorCode + " error " + errorMessage)
        console.log(errorCode + " error " + errorMessage);
        // ...
    });

});

$$("#signUpButton").on("click", () => {
    var formData = app.form.convertToData('#signUpForm');
    //alert("clicked Sign Up: " + JSON.stringify(formData));
    firebase.auth().createUserWithEmailAndPassword(formData.username, formData.password).then(
        () => {
            // could save extra info in a profile here I think.
            app.loginScreen.close(".signupYes", true);
        }
    ).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        $$("#signUpError").html(errorCode + " error " + errorMessage)
        console.log(errorCode + " error " + errorMessage);
        // ...
    });

});

$$("#logout").on("click", () => {
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
    }).catch(function(error) {
        // An error happened.
    });
});
