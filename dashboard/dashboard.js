// ==========================
// IMPORT FIREBASE
// ==========================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

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