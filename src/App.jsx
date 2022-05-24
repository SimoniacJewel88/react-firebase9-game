import { Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './context/UserProvider';

import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Perfil from './routes/Perfil';

import Navbar from './components/Navbar';
import LayoutRequireAuth from './components/Layouts/LayoutRequireAuth';
import LayoutContainerForm from './components/Layouts/LayoutContainerForm';
import LayoutRedirect from './components/Layouts/LayoutRedirect';
import NotFound from './routes/NotFound';

const App = () => {

  const { user } = useContext(UserContext);
  //console.log(user); // Cuando refrescamos la pagina se inicializa el valor de  user en false

  if(user === false){
    return <p>Loading User...</p>
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* para no escribir path="/" en la Ruta que renderiza Home
        escribimos index y hace lo mismo, ambos elementos comparten 
        el Layout de autenticacion */}
        <Route path='/' element={<LayoutRequireAuth />}>
          <Route index element={<Home />} />
          <Route path='perfil' element={<Perfil />} />
        </Route>

        {/* de esta manera ambos elementos comparten el mismo layout
        tanto Login, como Register */}
        <Route path="/" element={<LayoutContainerForm />}>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
        </Route>
        
        <Route path='/:nanoid' element={<LayoutRedirect />}>
          <Route index path="*" element={<NotFound />}>
          
        </Route>

        </Route>
      </Routes>
    </>
  );
};

export default App
