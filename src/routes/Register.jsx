import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from '../context/UserProvider'

const Register = () => {

  const [email, setEmail] = useState('MarksmanArty@test.com')
  const [password, setPassword] = useState('123123');

  const navigate = useNavigate();

  const { registerUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Procesando Form: ', email, password);
    try {
      await registerUser(email, password);
      console.log('Usuario Creado!');
      navigate("/");
    } catch (error) {
      console.log(error.code);
      alert('Este email ya esta registrado');
    } 
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="email" 
          placeholder="Ingrese email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          type="password" 
          placeholder="Ingrese Password" 
          id="" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" >Enviar</button>
      </form>
    </>
  );
};

export default Register;
