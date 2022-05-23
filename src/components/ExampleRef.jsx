import { forwardRef, useRef } from "react";

/** ForwardRed recibe como parámetro todo el componente
 * con el que va a usar las refs
 * Los refs los toma siempre como el segundo parametro
 */
const InputText = forwardRef((props, ref) => {
  return(
    <>
      <input type="text" ref={ref}/>
    </>
  )
});

const ExampleRef = () => {

  const inputFocus = useRef(null);

  const handleButtonClick = () => {
    console.log("me diste click");
    // const inputFocus = document.getElementById('inputFocus');
    // inputFocus.focus();

    /** Todo elemento que captures como un ref lo llamamos con current */
    inputFocus.current.focus();

    
    // console.log(first);
  }
  return (
    <>
      {/* Con esta ref se asigna al useRef de React */}
      {/* <input type="text" /*id="inputFocus" ref={inputFocus}/> */}
      <InputText ref={inputFocus}/>
      <button onClick={handleButtonClick}>Click ref</button>
    </>
  );
};

export default ExampleRef;
