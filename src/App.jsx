import { Routes, Route } from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';


const App = () => {

  const { user } = useContext(UserContext);
  //console.log(user); // Cuando refrescamos la pagina se inicializa el valor de  user en false

  if(user === false){
    return <p>Loading User...</p>
  }

  return (
    <>
      <Navbar />
      <h1>APP</h1>
      <Routes>
        <Route path='/' element={
          <RequireAuth>
            <Home />
          </RequireAuth>
        }/>
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register />}/>
      </Routes>
    </>
  );
};

export default App
