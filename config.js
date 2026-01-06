// تهيئة Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCnnkPDJLB5-EONapFjp045PradpD-wTxc",
    authDomain: "quizmasters-f25bb.firebaseapp.com",
    projectId: "quizmasters-f25bb",
    storageBucket: "quizmasters-f25bb.firebasestorage.app",
    messagingSenderId: "1092821859984",
    appId: "1:1092821859984:web:f774fb77573e29482fe215",
    measurementId: "G-N2FE7Q1MDT"
};

// تهيئة التطبيق
firebase.initializeApp(firebaseConfig);

// خدمات Firebase
export const auth = firebase.auth();
export const db = firebase.firestore();
export const rtdb = firebase.database();

// إعدادات Firestore
db.settings({ timestampsInSnapshots: true });

export const firebaseApp = firebase;