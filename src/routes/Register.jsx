import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserProvider'
import { erroresFirebase } from "../utilities/erroresFirebase";
import { formValidate } from "../utilities/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";

const Register = () => {

  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { required, patternEmail, minLength, validateTrim, validateEquals} = formValidate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    getValues,
    setError,
  } = useForm();

  console.log(errors);

  const onSubmit = async ({email, password}) => {
    try {
      await registerUser(email, password);
      // console.log('Usuario Creado!');
      navigate("/");
    } catch (error) {
      console.log(error.code);
      setError("firebase", {
        message: erroresFirebase(error.code)
      });
    } 
  }

  return (
    <>
      <h1>Register</h1>
      
      {/* {errors.firebase && <p>{errors.firebase.message}</p>} */}
      <FormError error={errors.firebase}/>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="email"
          placeholder="Ingrese email"
          // Esta linea segun la documentacion de react-hook-form
          // nos retorna 4 elementos: onBlur, onChange, ref y name
          {...register("email", {
            required,
            pattern: patternEmail,
          })}     
        >
          <FormError error={errors.email}/>
        </FormInput>
        {/* {errors.email && <p>{errors.email.message}</p>} */}
        <FormInput
          type="password" 
          placeholder="Ingrese Password" 
          autoComplete="off"
          {...register("password", {
            // setValueAs: (v) => v.trim(),
            minLength,
            validate: validateTrim,
          })}
        >
          <FormError error={errors.password}/>
        </FormInput>
        {/* {errors.password && <p>{errors.password.message}</p>} */}
        <FormInput
          type="password" 
          placeholder="Ingrese Password" 
          autoComplete="off"
          {...register("repassword", {
            // setValueAs: (v) => v.trim(),
            validate: validateEquals(getValues),
          })}
        >
          <FormError error={errors.repassword}/>
        </FormInput>
        {/* {errors.repassword && <p>{errors.repassword.message}</p>} */}
        <button type="submit" >Enviar</button>
      </form>
      {console.log(errors)}
    </>
  );
};

export default Register;
