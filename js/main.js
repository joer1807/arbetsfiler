"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Johanna Lilja 
 * 
 * /min planering;
 * användaren klickar på knappen (event submit)
 * kontroll att inte rutorna är tomma(value.trim.) 
 * om allt lugnt spara infon i en lista(arrrayen)
 * kom ihåg listan (local storage)
 * rita ut listan på skärmen(JSON/ render/DOM)
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

/**
 * Validera form inmatning.
 * @returns {boolean}    true om validering lyckas, annars false
 */
function validateForm() {
    // Nollställ felen inför varje kontroll så gamla fel inte ligger kvar
    errors = [];  //den tomma listan 

    // Kontrollera formulärets obligatoriska fält och ta bort mellanslag (.trim)
    // om den hittar ngt tomt fält så lägger i error list. 
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
     //for each loop.
    for (let i = 0; i < errors.length; i++) {
        const error = document.createElement("li");
        error.textContent = errors[i];
        errorList.appendChild(error);
    }
}



// Skapar ett studentkort.
//@returns {object} studentkort

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
    saveHistory();   //anrop till funktion
    renderHistory();   //tömmer historiken  visar på skärmen
    return studentCard;   //returnerar studentkort

}


// nu kommer vi att spara historiken i localStorage.

function saveHistory() {
    // Spara history i localStorage
    localStorage.setItem("studentHistory", JSON.stringify(history));
}
/**
 * Läser in tidigare historik från localStorage.
 */
// Hämta eventuell sparad historik
function loadHistory() {
    history = JSON.parse(localStorage.getItem("studentHistory")) || [];

}


// Visar historiken på sidan.

function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    // Skriv ut innehållet i history till DOM
   for (let i = 0; i < history.length; i++) {
    const card = history[i];
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
`;
        //kortet i history på HTML
        historySection.appendChild(cardDiv);

    }
}

//Rensar formulär, aktuellt studentkort och felmeddelanden.

function clearForm() {
    form.reset();
    // Återställ formulär och studentkort
    previewFullname.textContent = "";
    previewEmail.textContent = "";
    previewPhone.textContent = "";

}

//Raderar hela historiken.
function deleteHistory() {

    localStorage.removeItem("studentHistory");
    history = [];
    renderHistory();
    clearForm();
    // Radera sparad historik
    // Uppdatera history och visningen på sidan
}


// Eventlyssnare

// När formuläret skickas:
form.addEventListener("submit", function (event) {
    event.preventDefault();

    // - validera inmatningen
    const isValid = validateForm();
    // - skapa studentkort om valideringen lyckas
    if (isValid) {
        createStudentCard();
        form.reset();   //tömmer formuläret
    }
});


// När användaren klickar på "Rensa" och radera historiken

clearButton.addEventListener("click", function () {
    clearForm();
});

deleteHistoryButton.addEventListener("click", function () {
    if (confirm("Är du säker på att du vill radera fälten i historiken?")) {
        deleteHistory();
    }
});

fontselect.addEventListener("change", function () {
    previewFullname.style.fontFamily = fontSelect.value;
    previewEmail.style.fontFamily = fontSelect.value;
    previewPhone.style.fontFamily = fontSelect.value;


if (history.length > 0) {
    history[0].font = fontSelect.value;
    saveHistory();
    renderHistory();
    }
});

// När sidan laddas läs in och visa eventuell tidigare historik
loadHistory();
renderHistory();
