// ==========================
// XOBYWATEL LOGIN
// ==========================
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

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

function updateClock(){

const now = new Date();

const h = String(now.getHours()).padStart(2,"0");
const m = String(now.getMinutes()).padStart(2,"0");
const s = String(now.getSeconds()).padStart(2,"0");

document.getElementById("clock").textContent =
`${h}:${m}:${s}`;

const d = String(now.getDate()).padStart(2,"0");
const mo = String(now.getMonth()+1).padStart(2,"0");
const y = now.getFullYear();

document.getElementById("date").textContent =
`${days[now.getDay()]} • ${d}-${mo}-${y}`;

}

updateClock();

setInterval(updateClock,1000);


// ==========================
// ŻART DNIA
// ==========================

function jokeOfTheDay(){

const now = new Date();

const dayNumber = Math.floor(now.getTime()/86400000);

const joke = jokes[dayNumber % jokes.length];

document.getElementById("joke").textContent = joke;

}

jokeOfTheDay();


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

const ADMIN_UIDS = [
    "RIi8rzfuMhcbv960nYAhH1qULci2",
    "F4TxosfZwOe2RTkfnzQTITu7AXO2"
];

const loginForm = document.getElementById("loginForm");
const loginBtn = document.getElementById("loginBtn");
const loginError = document.getElementById("loginError");

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    loginError.textContent = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    loginBtn.disabled = true;
    loginBtn.textContent = "Logowanie...";

    try {

        await signInWithEmailAndPassword(auth, email, password);

    } catch (err) {

        loginBtn.disabled = false;
        loginBtn.textContent = "Zaloguj do Dashboardu";

        loginError.textContent = "Nieprawidłowy email lub hasło.";

    }

});

onAuthStateChanged(auth, (user) => {

    if (!user) return;

    if (!ADMIN_UIDS.includes(user.uid)) {

        loginError.textContent = "To konto nie posiada uprawnień administratora.";

        auth.signOut();

        loginBtn.disabled = false;
        loginBtn.textContent = "Zaloguj do Dashboardu";

        return;

    }

    window.location.href = "dashboard.html";

});