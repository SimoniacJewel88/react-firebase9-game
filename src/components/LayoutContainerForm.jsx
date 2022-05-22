import { Outlet } from "react-router-dom";

const LayoutContainerForm = () => {
  return(
    <div className="w-96 mx-auto mt-5">
      <Outlet /> 
    </div>
  );
};

export default LayoutContainerForm;
