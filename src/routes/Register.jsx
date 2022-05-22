import { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserProvider'
import { erroresFirebase } from "../utilities/erroresFirebase";
import { formValidate } from "../utilities/formValidate";

import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

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

  const onSubmit = async ({email, password}) => {
    try {
      await registerUser(email, password);
      // console.log('Usuario Creado!');
      navigate("/");
    } catch (error) {
      console.log(error.code);
      const { code, message } = erroresFirebase(error.code);
      setError(code, {
        message  // El nombre de la propiedad message coincide con su valor
      });
    } 
  }

  return (
    <>
      <Title text={"Register"}/>
      {/* {errors.firebase && <p>{errors.firebase.message}</p>} */}
      {/* <FormError error={errors.firebase}/> */}
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
          label="Ingresa tu correo"
          error={errors.email}
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
          label="Ingresa tu password"
          error={errors.password}
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
            validate: validateEquals(getValues("password")),
          })}
          label="Repite tu contraseña"
          error={errors.repassword}
        >
          <FormError error={errors.repassword}/>
        </FormInput>
        {/* {errors.repassword && <p>{errors.repassword.message}</p>} */}
        <Button text="Register" type={"submit"}/>
      </form>
      {/* {console.log(errors)} */}
    </>
  );
};

export default Register;
