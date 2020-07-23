import 'https://cdnjs.cloudflare.com/ajax/libs/framework7/5.7.10/js/framework7.bundle.js';

// Init F7
const app = new Framework7({
    root: '#app',
    theme: 'auto',
    // Fix for iPhone X notch
    statusbar: {
        overlay: Framework7.device.ios ? Framework7.device.webView || Framework7.device.cordova : 'auto',
    },
});

export default app;