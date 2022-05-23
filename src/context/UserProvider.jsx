import { 
  createUserWithEmailAndPassword, 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut 
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(false);

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      // console.log(user);
      if (user) {
        const {email, photoURL, uid, displayName} = user;
        setUser({email: email, photoURL: photoURL, uid, displayName});
        // setTimeout(() => {
        //   // console.log("esperando");
        //   const {email, photoURL, uid, displayName} = user
        //   setUser({email: email, photoURL: photoURL, uid, displayName});
        // }, 0);
        
      } else {
        setUser(null);
      }
    });
  
    return () => {
      unsuscribe();
    }
  }, [])
  

  const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);

  return (
    <UserContext.Provider value={{user, setUser, registerUser, loginUser, signOutUser}}>
      {children}      
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
