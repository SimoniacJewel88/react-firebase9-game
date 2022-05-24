import { useEffect, useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utilities/formValidate";
import { useForm } from "react-hook-form";

import Button from "../components/Button";
import Title from "../components/Title";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { erroresFirebase } from "../utilities/erroresFirebase";

const Home = () => {
  // const [error, setError] = useState();
  // const { data, error: dataError , loading } = useFirestore();
  const [copy, setCopy] = useState({});
  const { required, patternUrl } = formValidate();

  const { data, error , loading, getData, addData, deleteData, updateData, /*setLoading*/ } = useFirestore();
  const [newOriginID, setNewOriginID] = useState();

  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    setError,
    resetField,
    setValue,
  } = useForm();

  useEffect(()=>{
    console.log('getData');
    getData();
  }, []);

  const onSubmit = async (/*e*/{url}) => {
    /* ya no necesitamos manejar el evento pues ya 
    lo gestiona el paquete de react-hook-form
    e.preventDefault();*/
    try {
      if(newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID('');
        // return;
      } else {
        await addData(url);
      }
      resetField('url');
    } catch (error) {
      const { code, message } = erroresFirebase(error.code);
      setError(code, { message });      
    }

    
  }

  const handleClickDelete = async (nanoid) => {
    console.log("click delete");
    // setLoading(prev => ({...prev, [nanoid]: true}));

    // setTimeout(async () => {
    await deleteData(nanoid);    
    // }, 3000);
  }

  const handleClickEdit = async (item) => {
    console.log("Clickeaste Edit");
    setValue('url', item.origin);
    setNewOriginID(item.nanoid)
  }

  const pathURL = window.location.href; 

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    setCopy(/*(prev)=>*/ ({[nanoid]: true}));
    console.log(copy[nanoid]);
    // setTimeout(() => {
    //   setCopy({...copy, [nanoid]: false});
    // }, 1500);

  }


  if (loading.getData) {
    return (
      <p>Loading Data...</p>
    )    
  }
  if (error) {
    return (
      <p>{error}</p>
    )
  }
  return (
    <>
      <Title text={"Home"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          type="text"
          placeholder="https://bluuweb.org"
          {...register("url", {
            required,
            pattern: patternUrl,
          })} 
          label = "Ingresa tu URL"
          error={errors.url}
        >
          <FormError error={errors.url}/>
        </FormInput>
        {
          newOriginID ? (
            <Button
              type={"submit"}
              text={"EDIT URL"}
              color={'yellow'}
              loading={loading.updateData}
            />
          ) : (
            <Button
              type={"submit"}
              text={"ADD URL"}
              color={'blue'}
              loading={loading.addData}
            />
          )
        }
        
      </form>
      {
        data.map((item) => {
          return(
            <div key={item.nanoid} className="p-6 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 mb-2">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{pathURL + item.nanoid}</h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.origin}</p>
              {/* <p>{item.uid}</p> */}
              <div className="flex space-x-2">
                <Button
                  type={"button"}
                  text={"Delete"}
                  color={'red'}
                  loading={loading[item.nanoid]}
                  onClick={() => handleClickDelete(item.nanoid)}
                />
                <Button
                  type={"button"}
                  text={"Edit"}
                  color={'yellow'}
                  onClick={() => handleClickEdit(item)}
                />
                <Button
                  type={"button"}
                  text={copy[item.nanoid] ?  "Copied!" : "Copy"}
                  color={'blue'}
                  onClick={() => handleClickCopy(item.nanoid)}
                />
              </div>
              
            </div>
          )
        })
      }
    </>
  );
};

export default Home;
