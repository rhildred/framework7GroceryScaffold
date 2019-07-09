import Framework7 from 'framework7/framework7.esm.bundle';
import $$ from 'dom7';
import firebase from 'firebase/app';
import app from "./F7App.js";
import 'firebase/database';
import 'firebase/auth';



$$("#tab2").on("tab:show", () => {
    //put in firebase ref here
    const sUser = firebase.auth().currentUser.uid;
    firebase.database().ref("groceries/" + sUser).on("value", (snapshot) =>{
        const oItems = snapshot.val();
        const aKeys = Object.keys(oItems);
        $$("#groceryList").html("");
        for(let n = 0; n < aKeys.length; n++){
            let sCard = `
            <div class="card">
            <div class="card-content card-content-padding">${oItems[aKeys[n]].item}</div>
            </div>
            `
            $$("#groceryList").append(sCard);
        }
    });

});

$$(".my-sheet").on("submit", e => {
    //submitting a new note
    e.preventDefault();
    const oData = app.form.convertToData("#addItem");
    const sUser = firebase.auth().currentUser.uid;
    const sId = new Date().toISOString().replace(".", "_");
    firebase.database().ref("groceries/" + sUser + "/" + sId).set(oData);
    app.sheet.close(".my-sheet", true);
});