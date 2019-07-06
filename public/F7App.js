import Framework7 from 'framework7/framework7.esm.bundle';

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