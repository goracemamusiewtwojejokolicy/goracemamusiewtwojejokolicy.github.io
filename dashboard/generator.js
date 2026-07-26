// ==========================
// IMPORT FIREBASE
// ==========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
import { getDatabase, ref, push, set } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js";

// ==========================
// FUNKCJE 
// ==========================
const birthdayInput = document.getElementById("birthday");
const peselInput = document.getElementById("pesel");
const sexInput = document.getElementById("sex");
const genBtn = document.getElementById("genBtn");

const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");

const fatherNameInput = document.getElementById("father_name");
const motherNameInput = document.getElementById("mother_name");

const nationalityInput = document.getElementById("nationality");
const birthPlaceInput = document.getElementById("birthPlace");
const countryOfBirthInput = document.getElementById("countryOfBirth");

const adress1Input = document.getElementById("adress1");
const adress2Input = document.getElementById("adress2");
const cityInput = document.getElementById("city");

const familyNameInput = document.getElementById("familyName");
const fathersFamilyNameInput = document.getElementById("fathersFamilyName");
const mothersFamilyNameInput = document.getElementById("mothersFamilyName");
const photoInput = document.getElementById("photo");


// ==========================
// FIREBASE
// ==========================

const firebaseConfig = {
    apiKey: "AIzaSyCugha5MbWAXTM689GtCzw1VoI9YwD4s_o",
    authDomain: "xobywatel-38a31.firebaseapp.com",
    databaseURL: "https://xobywatel-38a31-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "xobywatel-38a31",
    storageBucket: "xobywatel-38a31.firebasestorage.app",
    messagingSenderId: "583181736460",
    appId: "1:583181736460:web:650d74177f0952bd20ec29",
    measurementId: "G-6XW5T3SHGZ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const CLOUD_NAME = "sgkc9shk";
const UPLOAD_PRESET = "xobywatel";
async function uploadToCloudinary(file) {

    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {

        const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {

            method: "POST",
            body: formData

        });

        const data = await response.json();

        if(data.secure_url){

            return data.secure_url;

        }

        console.error(data);

        return null;

    } catch(err){

        console.error(err);

        return null;

    }

}

// ==========================
// SPRAWDZENIE LOGOWANIA
// ==========================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "log.html";
        return;

    }

});

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", async () => {

    await signOut(auth);

    window.location.href = "log.html";

});

const jokes = [
"Nie wciskaj Enter 20 razy. Nadal będzie jedno logowanie.",
"Hasło '123456' nadal nie jest dobrym pomysłem.",
"Administrator też czasem zapomina hasła.",
"Firebase nigdy nie śpi.",
"Token wygasa szybciej niż cierpliwość programisty.",
"Jeżeli to czytasz, to serwer jeszcze żyje.",
"Dzisiejszy cel: niczego nie zepsuć.",
"Cloudinary znowu udaje dysk twardy.",
"JavaScript działa... dopóki nie przestanie.",
"Backup istnieje właśnie po to, żebyś spał spokojnie."
];

const days = [
"Niedziela",
"Poniedziałek",
"Wtorek",
"Środa",
"Czwartek",
"Piątek",
"Sobota"
];

function updateClock() {

    const now = new Date();

    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("clock").textContent = `${h}:${m}:${s}`;

    const d = String(now.getDate()).padStart(2, "0");
    const mo = String(now.getMonth() + 1).padStart(2, "0");

    document.getElementById("date").textContent =
        `${days[now.getDay()]} • ${d}-${mo}-${now.getFullYear()}`;

}

updateClock();
setInterval(updateClock, 1000);

function jokeOfTheDay() {

    const day = Math.floor(Date.now() / 86400000);

    document.getElementById("joke").textContent =
        jokes[day % jokes.length];

}

jokeOfTheDay();
         // =========================================================
        // FUNKCJE POMOCNICZE
        // =========================================================

        // Konwertuje datę z YYYY-MM-DD (format input type="date") na DD.MM.RRRR
        function formatDateForDisplay(date) {
            if (!(date instanceof Date) || isNaN(date)) return '';
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const year = date.getFullYear();
            return `${day}.${month}.${year}`;
        }
        
        // Funkcja do konwersji daty z formatu YYYY-MM-DD (z input type="date") na DD.MM.RRRR
        function formatDateForURL(dateString) {
            if (!dateString) return '';
            const parts = dateString.split('-'); // [YYYY, MM, DD]
            return `${parts[2]}.${parts[1]}.${parts[0]}`; // DD.MM.RRRR
        }
        
        // Generuje losowy 5-cyfrowy numer
        function generateRandomFiveDigits() {
    return Math.floor(10000 + Math.random() * 90000);
}

// ==========================
// Logika Zdjecia
// ==========================
const photoBox = document.getElementById("photoBox");
const photoPreview = document.getElementById("photoPreview");
const photoText = document.getElementById("photoText");

photoBox.addEventListener("click", () => {
    photoInput.click();
});

photoInput.addEventListener("change", () => {

    const file = photoInput.files[0];

    if (!file) return;

    photoPreview.src = URL.createObjectURL(file);
    photoPreview.style.display = "block";
    photoText.style.display = "none";

});

genBtn.addEventListener("click", async () => {


    let photoURL = "";

    if (photoInput.files.length) {
      
        photoURL = await uploadToCloudinary(photoInput.files[0]);

    }

    const documentData = {

        name: nameInput.value,
        surname: surnameInput.value,
        birthday: formatDateForURL(birthdayInput.value),
        sex: sexInput.value.toLowerCase().startsWith("k") ? "k" : "m",

        pesel: peselInput.value,

        father_name: fatherNameInput.value,
        mother_name: motherNameInput.value,

        nationality: nationalityInput.value,
        birthPlace: birthPlaceInput.value,
        countryOfBirth: countryOfBirthInput.value,

        adress1: adress1Input.value,
        adress2: adress2Input.value,
        city: cityInput.value,

        familyName: familyNameInput.value,
        fathersFamilyName: fathersFamilyNameInput.value,
        mothersFamilyName: mothersFamilyNameInput.value,
        photo: photoURL

    };

const newDoc = push(ref(db, "documents"));

await set(newDoc, documentData);

const token = newDoc.key;

// TU WPISZ SWÓJ ADRES FIREBASE HOSTING
const qrLink = `https://twoj-projekt.web.app/?token=${token}`;

document.getElementById("mainToken").value = qrLink;

alert("Dokument został wygenerowany.");
