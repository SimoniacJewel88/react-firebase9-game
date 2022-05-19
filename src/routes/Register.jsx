import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserProvider'

const Register = () => {

  const { registerUser } = useContext(UserContext);
  const navigate = useNavigate();

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
      console.log('Usuario Creado!');
      navigate("/");
    } catch (error) {
      console.log(error.code);
      switch (error.code) {
        case "auth/email-already-in-use" :
          setError("email", {
            message: 'Usuario ya registrado'
        })
          console.log('Usuario ya registrado');
          break;
        case "auth/invalid-email" : 
          setError("email", {
            message: 'Formato Email no válido'
          })
          break;
        default :
          console.log('OcurriÓ un error en el server');
          break;

      }
    } 
  }

  // const handleSubmit = async (e) => {
  //   
  // }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input 
          type="email" 
          placeholder="Ingrese email"
          {...register("email", {
            required: {
              value: true,
              message: "Campo obligatorio"
            },
            pattern: {
              value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
              message: "Formato de email incorrecto"
            }
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input 
          type="password" 
          placeholder="Ingrese Password" 
          {...register("password", {
            setValueAs: (v) => v.trim(),
            minLength: {
              value: 6, 
              message: "Minimo 6 caracteres"
            },
            validate: {
              trim: (v) => {
                if (!v.trim()) {
                  return "No seas 🤡, ESCRIBE ALGO"
                }
                return true; // si regresa true, la validacion pasó
              }
            }
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <input 
          type="password" 
          placeholder="Ingrese Password" 
          {...register("repassword", {
            setValueAs: (v) => v.trim(),
            validate: {
              equals: v => v=== getValues("password") || // En este caso v representa el 
              'No coinciden las contraseñas',            // valor actual del input, (respassword)
            }
          })}
        />
        {errors.repassword && <p>{errors.repassword.message}</p>}
        <button type="submit" >Enviar</button>
      </form>
    </>
  );
};

export default Register;
