import L from "leaflet";
import Dom7 from 'dom7';
import Framework7 from 'framework7/framework7.esm.bundle';
import app from "./F7App.js";
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';


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
        $$(".my-sheet").on("submit", e => {
            e.preventDefault();
            const sUser = firebase.auth().currentUser.uid;
            const waypointID = new Date().toISOString().replace(".", "_");
            const oNote = $$("#theNote");
            // evt is a closure
            firebase.database().ref('waypoints/' + sUser + '/' + waypointID).set({
                lat: evt.latlng.lat,
                lng: evt.latlng.lng,
                note: oNote.val()
            }).then(() => {
                oNote.val("");
                app.sheet.close(".my-sheet", true);
            }).catch(e => {
                console.log(e.toString());
            });

        })
    });
}

$$("#tab2").on("tab:show", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("geolocation not supported");
    }
    const sUser = firebase.auth().currentUser.uid;
    firebase.database().ref('waypoints/'+ sUser).on("value", snapshot => {
        let oWaypoints = snapshot.val();
        console.log(oWaypoints);
        Object.keys(oWaypoints).map((key) => {
            let oWaypoint = oWaypoints[key];
            let marker = L.marker([oWaypoint.lat, oWaypoint.lng]).addTo(mymap);
            marker.bindPopup(oWaypoint.note).openPopup();
        });
    });

});

