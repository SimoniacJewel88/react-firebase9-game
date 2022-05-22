const erroresFirebase = (code) => {
  switch (code) {
    case "auth/email-already-in-use" :
      // console.log('Usuario ya registrado');
      return {
        code: "email",
        message : "Usuario ya registrado"
      }
    case "auth/invalid-email" : 
      // console.log('Formato Email no válido'); 
      return {
        code: "email",
        message : 'Formato Email no válido'
      }

    case 'auth/user-not-found' : 
      return {
        code: "email",
        message : 'Usuario no encontrado'
      }
      
    case 'auth/wrong-password' :
      return {
        code: "password",
        message : 'Password incorrecto'
      }

    default :
      // console.log('OcurriÓ un error en el server');
      return {
        code: "email",
        message : 'Ocurrió un error en el server'
      }
  }
}

export { erroresFirebase };
