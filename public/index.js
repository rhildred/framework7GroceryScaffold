import Framework7 from 'framework7/framework7.esm.bundle';
import Dom7 from 'dom7';

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

$$("#signInButton").on("click", evt=>{
    var formData = app.form.convertToData('#loginForm');
    alert("clicked Sign in: " + JSON.stringify(formData));

});

$$("#signUpButton").on("click", evt=>{
    var formData = app.form.convertToData('#signUpForm');
    alert("clicked Sign Up: " + JSON.stringify(formData));

});
