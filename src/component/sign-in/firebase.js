import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAg-hKqcrysR_yc7B2pwu76Ato1jnCZzck",
    authDomain: "assignment-management-eb1a7.firebaseapp.com",
    projectId: "assignment-management-eb1a7",
    storageBucket: "assignment-management-eb1a7.firebasestorage.app",
    messagingSenderId: "91382432463",
    appId: "1:91382432463:web:d701788af956704f2e6dba"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"  // <-- Forces account selection
});

export { auth, provider, signInWithPopup };
