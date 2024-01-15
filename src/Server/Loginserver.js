import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCWdp6bduCHsY3h5LBIA2heXHQYRTOmitE",
  authDomain: "cryptopanda-3f268.firebaseapp.com",
  projectId: "cryptopanda-3f268",
  storageBucket: "cryptopanda-3f268.appspot.com",
  messagingSenderId: "917484567768",
  appId: "1:917484567768:web:388d4e49ce35d8c9ee6bad",
  measurementId: "G-S52ED7ZZGL"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
 