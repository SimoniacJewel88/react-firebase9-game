import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate, useNavigationType } from 'react-router-dom';

const Login = () => {

  const [email, setEmail] = useState('MarksmanArty@test.com');
  const [password, setPassword] = useState('123123');

  const { loginUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Procesando Form: ', email, password);
    try {
      await loginUser(email, password);
      console.log('Usuario Logueado!');
      navigate("/");
    } catch (error) {
      console.log(error.code);
    } 
  }
  
  

  return (
    <>
      <h1>Login</h1>
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
        <button type="submit" >Login</button>
      </form>
    </>
  );
};

export default Login;
