import { useContext } from "react";
import { UserContext } from "../../context/UserProvider";
import { Navigate, Outlet } from 'react-router-dom';

const LayoutRequireAuth = (/*{children}*/) => {
  const { user } = useContext(UserContext);

  if(!user) {
    return <Navigate to="/login"/>
  }

  // return (children);
  return (
    <div>
      <Outlet />
    </div>
  )
};

export default LayoutRequireAuth;
