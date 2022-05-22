/** Regresa un objeto con las opciones de validaciones
 * de react-hook-form
 */
const formValidate = (getValues) => {
  return {
    required: {
      value: true,
      message: 'Campo obligatorio'
    },
    patternEmail: {
      value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
      message: "Formato de email incorrecto"
    },
    minLength: {
      value: 6, 
      message: "Minimo 6 caracteres"
    },
    validateTrim: {
      trim: (v) => {
        // Verifica si no hay espacios en blanco al inicio o al final
        if (!v.trim()) {
          return "No seas 🤡, ESCRIBE ALGO"
        }
        return true; // si regresa true, la validacion pasó 
      }
    },
    validateEquals(value) {
      return {
        equals: (v) => v=== value || // En este caso v representa el 
        'No coinciden las contraseñas',            // valor actual del input, (respassword)
      }
    }
    
  }
}

export { formValidate };
