import { forwardRef } from "react";

const FormInput = forwardRef(
  ({type, placeholder, onChange, onBlur, name, autoComplete, children}, ref) => {
    return(
      <>
        <input 
          type={type} 
          placeholder={placeholder} 
          ref={ref} onChange={onChange} 
          onBlur={onBlur} 
          name={name} 
          autoComplete={autoComplete}
        />
        {children}
      </>
        
    )
  }
);

export default FormInput;
