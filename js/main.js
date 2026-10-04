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
let history = [];
//JSON.parse(localStorage.getItem("studentHistory")) || []; 
// Om historiken inte finns så craschar inte sidan
renderHistory();
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
    errors.forEach(function (errorMessage) {
        const li = document.createElement("li");
        li.textContent = errorMessage;
        errorList.appendChild(li); // Lägger till i <ul id="errorlist">
    });
}

// Händelselyssnare för när användaren klickar på submit
form.addEventListener("submit", function (event) {
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
    history.unshift(studentCard);

    // Spara och uppdatera historiken
    saveHistory();   /anrop till funktion
    renderHistory();   /tömmer historiken  visar på skärmen
    return studentCard;   //returnerar studentkort

}

/**
 * nu kommer vi att spara historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("studentHistory", JSON.stringify(history));
}
/**
 * Läser in tidigare historik från localStorage.
 */
// Hämta eventuell sparad historik
function loadHistory() {
    history = JSON.parse(localstorage.getItem("studentHistory")) || [];

}

/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
    history.forEach(function (card) {
        //ett nytt element till varje studentkort
        const cardDiv = document.createElement("div");
        cardDiv.classList.add("history-card");
        cardDiv.style.fontFamily = card.font;

        //studentens info
        cardDiv.innerHTML = `
        <div class="card-info">
            <p class="card-name">${card.name}</p>
            <p class="card-email">${card.email}</p>
            <p class="card-phone">${card.phone}</p>
        </div>

        //koret i history på HTML
        historySection.appendChild(cardDiv);

));
 {

//Rensar formulär, aktuellt studentkort och felmeddelanden.
 
 function clearForm() {
 form.reset();
 previewFullname.textContent = "";
 previewEmail.textContent = "";
 previewPhone.textContent = "";
 previewFullname.style.fontFamily = "";
 previewEmail.style.fontFamily = "";
 previewPhone.style.fontFamily = "";

 */
function clearForm() {
    // Återställ formulär och studentkort
errors [];
 // Rensa eventuella felmeddelanden
errorList.innerHTML = "";
   
}

/**
 * Raderar hela historiken.
 * function deleteHistory() {
 */
localStorage.removeItem("studentHistory");  // Radera sparad historik
history = [];
renderHistory();

    // Radera sparad historik

    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
form.addEventListener("submit", function(event) {
event.preventDefault();

// - validera inmatningen
const isValid = validateForm();
// - skapa studentkort om valideringen lyckas
if (isValid) {
createStudentCard();
form.reset();   //tömmer formuläret
});


// När användaren klickar på "Rensa" och radera historiken
deleteHistoryButton.addEventListener("click", function() {
if (confirm("Är du säker på att du vill radera fälten i historiken?")) {
deleteHistory();

// När sidan laddas läs in och visa eventuell tidigare historik
loadHistory();
renderHistory();
}
// När användaren klickar på "Radera historik ovan.