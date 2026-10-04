"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: DITT NAMN
 */

// 1. Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");

// Hämtar värdet från formuläret
const fullnameInput = document.querySelector("#fullname");

// Arrayer  för att lägga informationen 
let errors = [];

// Läser in historiken från localStorage
let history = JSON.parse(localStorage.getItem("studentHistory")) || []; 
// Om historiken inte finns så craschar inte sidan
displayHistory();
/**
 * Validera form inmatning.
 * @returns {boolean}    true om validering lyckas, annars false
 */
function validateForm() {
    // Nollställ felen inför varje kontroll så gamla fel inte ligger kvar
    errors = []; 

    // Kontrollera formulärets obligatoriska fält och ta bort mellanslag (.trim)
    if (fullnameInput.value.trim() === "") {
        errors.push("Fyll i ditt fullständiga namn");
    }
    if (emailInput.value.trim() === "") {
        errors.push("Fyll i din e-postadress");
    }
    if (phoneInput.value.trim() === "") {
        errors.push("Fyll i ditt telefonnummer");
    }

    // Om det finns fel, visa dem och returnera false för att stoppa processen
    if (errors.length > 0) {
        displayErrors();
        return false; 
    }
    // Om inga fel fanns, rensa listan på skärmen och godkänn valideringen
    errorList.innerHTML = "";
    return true;
}
/**
 * Visar felmeddelanden på sidan.
 */
function displayErrors() {
    // Rensa tidigare felmeddelanden från skärmen
    errorList.innerHTML = "";
    
    // Skriv ut aktuella felmeddelanden till DOM som punkter i listan
    errors.forEach(function(errorMessage) {
        const li = document.createElement("li");
        li.textContent = errorMessage;
        errorList.appendChild(li); // Lägger till i <ul id="errorlist">
    });
}

// Händelselyssnare för när användaren klickar på submit
form.addEventListener("submit", function(event) {
    // Vi stoppar ALLTID omladdningen direkt så att sidan inte nollställs och tömmer vår JavaScript-historik
    event.preventDefault(); 

    // Kör valideringen
    const isValid = validateForm();

    if (isValid) {
        // Den här rutan visas bara om ALLT är korrekt ifyllt
        alert("Formuläret är korrekt! Här ska vi spara kortet sen.");
    }
});

/**
 * Skapar ett studentkort.
 * @returns {object} studentkort
 */
function createStudentCard() {
    // Hämta information från formuläret
    const studentCard = {
        name: fullnameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        font: fontSelect.value
    };

    // Uppdatera studentkortet
    previewFullname.textContent = studentCard.name;
    previewEmail.textContent = studentCard.email;
    previewPhone.textContent = studentCard.phone;   

    previewFullname.style.fontFamily = studentCard.font;
    previewEmail.style.fontFamily = studentCard.font;
    previewPhone.style.fontFamily = studentCard.font;

    // Lägg till studentkortet i historiken
history.unshift(studentCard); . 


    // Spara och uppdatera historiken
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    // Skriv ut innehållet i history till DOM
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa"


// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik