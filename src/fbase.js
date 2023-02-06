import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// 위 코드는 공식문서에 있다.

// 코드 그대로 가져오면 된다. 홈페이지

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD-ag4ShpBIbb6thwmx7LKD2IWubiq5H8",
  authDomain: "lyt-twitter.firebaseapp.com",
  projectId: "lyt-twitter",
  storageBucket: "lyt-twitter.appspot.com",
  messagingSenderId: "521008383225",
  appId: "1:521008383225:web:f98f778da31c5bcae54e28"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const dbFirestore = getFirestore();