import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-analytics.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js"
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-database.js"

const firebaseConfig = {
    apiKey: "AIzaSyAfwTATjpz_Jklgy1wA7uceaGtJr0eCBqU",
    authDomain: "projectiplan-b249d.firebaseapp.com",
    databaseURL: "https://projectiplan-b249d-default-rtdb.firebaseio.com",
    projectId: "projectiplan-b249d",
    storageBucket: "projectiplan-b249d.appspot.com",
    messagingSenderId: "694175753632",
    appId: "1:694175753632:web:52b682f0b145c07a1c70c5",
    measurementId: "G-S4LBR2763E"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
export const db = getDatabase()