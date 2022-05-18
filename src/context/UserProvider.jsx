import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const UserContext = createContext();

const UserProvider = (props) => {

  const [user, setUser] = useState(false)

  useEffect(() => {
    const onsuscribe = onAuthStateChanged(auth, user => {
      console.log(user);
      if (user) {
        setTimeout(() => {
          console.log("esperando");
          const {email, photoURL, uid, displayName} = user
          setUser({email: email, photoURL: photoURL, uid, displayName});
        }, 0);
        
      } else {
        setUser(null);
      }
    });
  
    return () => {
      onsuscribe();
    }
  }, [])
  

  const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

  const signOutUser = () => signOut(auth);

  return (
    <UserContext.Provider value={{user, setUser, registerUser, loginUser, signOutUser}}>
      {props.children}      
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
