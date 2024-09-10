# Planung: Bücher Suche und Details anzeigen

## Programm-Plan

Der User gibt in das Eingabefeld den Titel eines Buches ein. Während der Eingabe wird eine AJAX-Anfrage an den Server gesendet, um eine Liste von Büchern abzurufen, die zum eingegebenen Titel passen.

Die Ergebnisse werden in einer Tabelle angezeigt, die Autor, Verlag, Thumbnail und eine Schaltfläche zum Anzeigen von Details enthält. Wenn der User auf "Details" klickt, wird eine weitere AJAX-Anfrage gesendet, um detaillierte Informationen über das ausgewählte Buch abzurufen und anzuzeigen.

## zu klärende Fragen

Q: Welche Fehleingaben sind vom User zu erwarten und wie werden diese abgefangen?

A:
- Keine Eingabe oder leeres Feld.
- Falsche Zeichen, z.B. Sonderzeichen.
- Zu lange Eingaben.
- Tippfehler.

Falls keine Eingabe erfolgt oder die Eingabe fehlerhaft ist, wird die Tabelle nicht angezeigt. Sicherheitsrelevante Eingaben sollten durch serverseitige Validierung und Filterung (z.B. in PHP) sowie durch clientseitige Validierung (z.B. in JavaScript) behandelt werden.

Q: Welches Skript (JS oder PHP) ist für die HTML-Tabellenstruktur verantwortlich?

A: JavaScript, da die Tabelle dynamisch generiert und angezeigt wird, basierend auf den vom Server zurückgegebenen Daten. Dies reduziert den Datenverkehr und verbessert die Performance.

Q: In welcher Form soll das Ergebnis der Suche vom PHP-Script geliefert werden?

A: Die Ergebnisse werden als JSON-String geliefert, der von JavaScript verarbeitet und in HTML umgewandelt wird.

### JavaScript

- DOM Schutz
- Ein `XMLHttpRequest`-Objekt (`objXHR`) erstellen, um die Serveranfragen zu verwalten.
- Variablen und Konstanten für das Eingabefeld und den Ausgabebereich initialisieren.
- Einen Eventhandler für die Eingabe im Textfeld registrieren (z.B. bei jedem Tastendruck).

- Callback-Funktion (`fnCallPhp`) definieren:
  - Verbindung öffnen
  - Methode festlegen (GET)
  - Dateipfad und Daten übergeben
  - Anfrage senden
  - Den Inhalt des Textfeldes abrufen und validieren.
  - Eine GET-Anfrage vorbereiten, den URI-String mit den eingegebenen Daten erstellen, die Verbindung öffnen und die Anfrage senden.
- Callback-Funktion (`fnUpdatePage`) zur Verarbeitung der Serverantwort:
  - Prüfen, ob die Anfrage erfolgreich war.
  - Das JSON-Objekt aus der Serverantwort parsen und eine HTML-Tabelle generieren.
  - Die Tabelle in den Ausgabebereich einfügen und anzeigen.
  - Event Listener für die "Details"-Schaltflächen hinzufügen, um detaillierte Buchinformationen anzuzeigen.
- Eine zusätzliche Funktion (`ladeBuchDetails`) definieren, um bei Klick auf "Details" eine weitere AJAX-Anfrage zu senden und die Buchdetails anzuzeigen.

### PHP (mit SQL)

- Prüfen, ob eine Anfrage eingegangen ist und ob das Suchfeld leer ist.
  - Wenn keine Eingabe vorhanden ist, eine Fehlermeldung ausgeben und den Prozess beenden.
  - Wenn eine gültige Eingabe vorhanden ist, die Suche in der entsprechenden Datenquelle durchführen (z.B. in SQL Datenbank).
- Die Datenbank durchsuchen und die passenden Ergebnisse in ein Array laden.
- Das Array in einen JSON-String umwandeln und an das JavaScript zurücksenden.
- Sicherstellen, dass die Datenbankverbindung ordnungsgemäß geschlossen wird.

## Übersicht der Variablen, Konstanten und Funktionen

### JavaScript-Datei

| Bezeichner          | Bemerkung |
|---------------------|-----------|
| `const objXHR`      | `XMLHttpRequest`-Objekt für AJAX-Anfragen                                 |
| `const strInput`    | Inhalt des Eingabefeldes für den Buchtitel                                |
| `let strOutput`     | Die HTML-Tabelle für die Suchergebnisse                                   |
| `const objJSON`     | Das JSON-Objekt mit den vom Server gelieferten Buchdaten                  |
| `const strUri`      | Der URI für die PHP-Datei mit dem Query-String                            |
| `fnCallPhp()`       | Callback-Funktion zum Event `keyUp`                                       |
| `fnUpdatePage()`    | Callback-Funktion zum Event `readystatechange` / `load`                   |
| `fnInit()`          | Callback-Funktion zu DOM-Schutz                                           |
| `ladeBuchDetails()` | Funktion, um bei Klick auf "Details" die Buchdetails nachzuladen          |

### PHP-Datei

| Bezeichner     | Bemerkung  |                       
|----------------|------------|
| `$_GET`        | Superglobales Array, das die übergebenen Daten (z.B. Suchbegriff) enthält  |
| `$strSearch`   | Der Suchbegriff, der vom User eingegeben wurde                             |
| `$arrOutput`   | Array, das die Suchergebnisse speichert                                    |
| `$jsonOutput`  | Der JSON-String, der an das JavaScript zurückgegeben wird                  |

## Ordner-Struktur

- index.html
- include
  - booklist.php
  - bookitem.php
  - book.md
  - books.sql
  - pdo-connect.inc.php
- css
  - style.css
- js
  - script.js
  - buchDetails.js
- PAP_Datei