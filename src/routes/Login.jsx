import { useContext, } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utilities/erroresFirebase";
import { formValidate } from "../utilities/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Login = () => {

  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { required, patternEmail, validateTrim, minLength } = formValidate();


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log('Procesando Form: ', email, password);
  //   try {
  //     await loginUser(email, password);
  //     console.log('Usuario Logueado!');
  //     navigate("/");
  //   } catch (error) {
  //     console.log(error.code);
  //   } 
  // }

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setError,
  } = useForm();

  const onSubmit = async ({email, password}) => {
    try {
      await loginUser(email, password);
      // console.log('Usuario Creado!');
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: erroresFirebase(error.code)
      });
      console.log(errors);
    } 
  };
  
  return (
    <>
      <FormError error={errors.firebase}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })} 
        >
          <FormError error={errors.email}/>
        </FormInput>

        <FormInput
          type="password" 
          autoComplete="off"
          {...register("password", {
            required,
            minLength,
            validate: validateTrim,
          })}
        >
          <FormError error={errors.password}/>
        </FormInput>
        <button type="submit" >Login</button>
      </form>
    </>
  );
};

export default Login;
