"use strict";

function fnUpdateDetails() {
    let objResponse = null;
    let strOutput = "";

    // Überprüfen, ob die Anfrage abgeschlossen und erfolgreich ist
    if (this.readyState === 4 && this.status === 200) {
        if (this.responseText) {
            // JSON-Daten aus der Antwort parsen
            objResponse = JSON.parse(this.responseText);

            if (objResponse && objResponse.id) {
                // Daten in HTML umwandeln und anzeigen
                strOutput = '<h4>' + objResponse.title + '</h4>';
                strOutput += '<p><strong>Autor:</strong> ' + objResponse.author + '</p>';
                strOutput += '<p><strong>Verlag:</strong> ' + objResponse.publisher + '</p>';
                strOutput += '<p><strong>Beschreibung:</strong> ' + objResponse.description + '</p>';
                strOutput += '<img src="' + objResponse.image + '" alt="' + objResponse.title + '" width="100">';

                // Inhalte in das Element #detailsInhalt einfügen
                const detailsInhaltElem = document.querySelector("#detailsInhalt");
                if (detailsInhaltElem) {
                    detailsInhaltElem.innerHTML = strOutput; // Neue Inhalte einfügen
                    document.querySelector("#buchDetails").style.display = 'block'; // Detailbereich anzeigen
                }
            } else {
                // Keine Details verfügbar
                const detailsInhaltElem = document.querySelector("#detailsInhalt");
                if (detailsltElem) {
                    detailsInhaltElem.innerHTML = "Keine Details verfügbar!";
                }
            }
        }
    }
}

function ladeBuchDetails(buchId) {
    if (!buchId) return; // Wenn keine Buch-ID vorhanden ist, beenden

    const objDetailXHR = new XMLHttpRequest(); // Neues XMLHttpRequest-Objekt erstellen
    const strUri = "include/bookitem.php?q=" + encodeURI(buchId); // URI für die Anfrage erstellen

    objDetailXHR.open("get", strUri); // GET-Anfrage vorbereiten
    objDetailXHR.onreadystatechange = fnUpdateDetails.bind(objDetailXHR); // Statusänderungen überwachen
    objDetailXHR.send(null); // Anfrage senden
}
