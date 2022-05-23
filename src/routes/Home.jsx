import { useEffect, useState } from "react";
import Button from "../components/Button";
import Title from "../components/Title";
import { useFirestore } from "../hooks/useFirestore";

const Home = () => {
  // const [error, setError] = useState();
  // const { data, error: dataError , loading } = useFirestore();
  const { data, error , loading, getData, addData, deleteData, updateData, /*setLoading*/ } = useFirestore();
  const [text, setText] = useState('');
  const [newOriginID, setNewOriginID] = useState();


  useEffect(()=>{
    console.log('getData');
    getData();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if(newOriginID) {
      await updateData(newOriginID, text);
      setNewOriginID('');
      setText('')
      return;
    }
    await addData(text);
    setText("");
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
    setText(item.origin);
    setNewOriginID(item.nanoid)
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
      <form onSubmit={handleSubmit}>
        <input 
          placeholder="ex: http://articbusiness.com"
          type="text" 
          value={text}
          onChange={e => setText(e.target.value)}
        />
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
            <div key={item.nanoid}>
              <p>{item.nanoid}</p>
              <p>{item.origin}</p>
              <p>{item.uid}</p>
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
            </div>
          )
        })
      }
    </>
  );
};

export default Home;
