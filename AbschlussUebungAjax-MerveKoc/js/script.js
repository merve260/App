"use strict";

const objXHR = new XMLHttpRequest(); // XMLHttpRequest-Objekt erstellen

function fnUpdatePage() {
    if (objXHR.readyState === 4 && objXHR.status === 200) { // Überprüfen, ob die Anfrage abgeschlossen und erfolgreich ist
        if (objXHR.responseText) {
            // JSON-Daten aus der Antwort parsen und Tabelle erstellen
            let objResponse = JSON.parse(objXHR.responseText);
            let strOutput = '<table class="table">';

            for (let i in objResponse) {
                strOutput += "<tr>";
                strOutput += '<td>' + objResponse[i].author + '</td>'; // Autor
                strOutput += '<td>' + objResponse[i].publisher + '</td>'; // Verlag
                strOutput += '<td><img src="' + objResponse[i].image + '" alt="' + objResponse[i].title + '" width="50"></td>'; // Thumbnail
                strOutput += '<td><button class="detailsButton" data-id="' + objResponse[i].id + '">Details</button></td>'; // Details-Button
                strOutput += "</tr>";
            }
            strOutput += '</table>';

            // Tabelle in das entsprechende Element einfügen und anzeigen
            document.querySelector("#ergebnisTabelle").innerHTML = strOutput;
            document.querySelector("#ergebnisTabelle").style.display = 'table'; // Tabelle anzeigen

            // Event Listener für die "Details"-Buttons hinzufügen
            const detailButtons = document.querySelectorAll('.detailsButton');
            for (let button of detailButtons) {
                button.addEventListener('click', function () {
                    ladeBuchDetails(button.getAttribute('data-id')); // Buch-ID abrufen und Details laden
                });
            }
        }
    }
}

function fnCallPhp() {
    const strInput = document.querySelector("#buchTitel").value.trim(); // Benutzerinput abrufen und trimmen
    if (strInput !== "") {
        const strUri = "include/booklist.php?q=" + encodeURI(strInput); // URI für die Anfrage erstellen
        objXHR.open("get", strUri); // Anfrage öffnen
        objXHR.onreadystatechange = fnUpdatePage; // Callback-Funktion festlegen
        objXHR.send(null); // Anfrage senden
    } else {
        document.querySelector("#ergebnisTabelle").style.display = 'none'; // Tabelle ausblenden, wenn kein Input vorhanden ist
    }
}

function fnInit() {
    document.querySelector("#buchTitel").addEventListener("keyup", fnCallPhp); // Event Listener für die Eingabe hinzufügen
}

document.addEventListener("DOMContentLoaded", fnInit); // Initialisierungsfunktion beim Laden der Seite aufrufen
