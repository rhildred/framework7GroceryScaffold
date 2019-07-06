import L from "leaflet";
import Dom7 from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle';
import app from "./F7App.js";

const $$ = Dom7;

let mymap = null;

function showPosition(oPosition) {
    mymap = L.map('map-here').setView([oPosition.coords.latitude, oPosition.coords.longitude], 13);
    // Use OpenStreetMap tiles and attribution
    let osmTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attribution = '© OpenStreetMap contributors';

    // Create the basemap and add it to the map
    L.tileLayer(osmTiles, {
        maxZoom: 18,
        attribution: attribution
    }).addTo(mymap);

    mymap.on("contextmenu", (evt) => {
        // right click ... this is a long press on a phone
        $$("#lat").html(evt.latlng.lat);
        $$("#lng").html(evt.latlng.lng);
        app.sheet.open(".my-sheet", true);
    });
}

$$("#tab2").on("tab:show", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("geolocation not supported");
    }

});
