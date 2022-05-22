import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Navbar = () => {

  const { user, signOutUser } = useContext(UserContext);

  const handleClickLogout = async (e) => {
    e.preventDefault();
    try {
      await signOutUser();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      {/* <button onClick={handleClickLogout}>Logout</button> */}
      {user ? ( 
        <>
          <NavLink to="/">Inicio</NavLink> 
          <button onClick={handleClickLogout}>Logout</button>
        </>
      ) : (
        <>
          <NavLink to="/login">Login |</NavLink>
          <NavLink to="/register">Register |</NavLink>
        </>
      )}
    </div>
  );
};

export default Navbar;
