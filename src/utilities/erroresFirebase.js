const erroresFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use" :
      // console.log('Usuario ya registrado');
      return "Usuario ya registrado";
    case "auth/invalid-email" : 
      // console.log('Formato Email no válido');
      return 'Formato Email no válido';

    case 'auth/user-not-found' :
      return 'Usuario no encontrado'
      
    case 'auth/wrong-password' :
      return 'Password incorrecto'

    default :
      // console.log('OcurriÓ un error en el server');
      return 'Ocurrió un error en el server';
  }
}

export { erroresFirebase };
