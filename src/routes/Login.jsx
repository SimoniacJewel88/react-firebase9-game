import { useContext, } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utilities/erroresFirebase";
import { formValidate } from "../utilities/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

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
      // console.log("Redireccionando");
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message  // El nombre de la propiedad message coincide con su valor
      });
    } 
  };
  
  return (
    <>
      <Title text={"Login"}/>
      {/* <FormError error={errors.firebase}/> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          {...register("email", {
            required,
            pattern: patternEmail,
          })} 
          label = "Ingresa tu correo"
          error={errors.email}
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
          label = "Ingresa password"
          error={errors.password}
        >
          <FormError error={errors.password}/>
        </FormInput>
        <Button text="Login" type={"submit"}/>
      </form>
    </>
  );
};

export default Login;
