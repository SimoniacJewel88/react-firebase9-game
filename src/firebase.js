import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    
  apiKey: "AIzaSyCh_360tfFXMDRasUqhwxem0WUOb-Yv0w4",
  authDomain: "react-game-2b93c.firebaseapp.com",
  projectId: "react-game-2b93c",
  storageBucket: "react-game-2b93c.appspot.com",
  messagingSenderId: "332260083628",
  appId: "1:332260083628:web:3ae24f98f65f27728cdc09"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };