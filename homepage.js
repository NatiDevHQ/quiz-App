// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase Configuration (Replace with actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyBxDd0uUQREj7ql-bIjBzQ-whVVBxOMXiI",
  authDomain: "login-form-5b101.firebaseapp.com",
  projectId: "login-form-5b101",
  storageBucket: "login-form-5b101.firebasestorage.app",
  messagingSenderId: "780897821919",
  appId: "1:780897821919:web:df63d860fa25305989b56a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Check if a user is logged in
onAuthStateChanged(auth, (user) => {
  if (user) {
    const loggedInUserId = user.uid; // Get user ID directly from auth
    localStorage.setItem("loggedInUserId", loggedInUserId);

    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.getElementById("loggedinfName").innerHTML =
            userData.firstName;
        } else {
          console.log("No document found for this user.");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });
  } else {
    console.log("User is not logged in.");
  }
});

// Logout functionality
const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log("Error signing out:", error);
    });
});
