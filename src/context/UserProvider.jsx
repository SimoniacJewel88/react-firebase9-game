import { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = (props) => {

  const [user, setUser] = useState(false)

  return (
    <UserContext.Provider value={{user, setUser}}>
      {props.children}      
    </UserContext.Provider>
  );
};

export default UserProvider;
export { UserContext };
