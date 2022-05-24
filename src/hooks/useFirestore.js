import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite";
import { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { nanoid } from "nanoid";

const useFirestore = () =>{ 
  
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState({});

  const addData = async (url) => {
    try {
      // el parametro "prev" es como una COPIA DEL STATE ANTERIOR
      setLoading(prev => ({...prev, addData: true}));
      const newDoc = {
        enabled: true,
        nanoid: nanoid(6),
        origin: url,
        uid: auth.currentUser.uid,
      }
      const docRef = doc(db, "urls", newDoc.nanoid);
      await setDoc(docRef, newDoc);
      // actualizamos la informacion de la vista
      setData([...data, newDoc]);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(prev => ({...prev, addData: false}));
    }
  }

  const getData = async () => {
    console.log(auth.currentUser);
    try {
      setLoading(prev => ({...prev, getData: true}));
      const dataRef = collection(db, "urls");
      const q = query(
        dataRef, 
        where("uid", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const dataDB = querySnapshot.docs.map((doc) => {
        // return {
        //   id: doc.id,
        //   ...doc.data()
        // }

        /* Como tenemos el id dentro del objeto data, no es necesario 
        traernos el doc.id */
        return doc.data(); // este metodo regresa ya un formato de objeto
      });
      setData(dataDB);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(prev => ({...prev, getData: false}));

    }
  }

  const deleteData = async (nanoid) => {
    try {
      //  se pasa la propiedad nanoid como [nanoid]  por si la propiedad tuviera
      // caracteres raros como un guion,   las propiedades de objetos se pueden pasar entre corchetes
      
      setLoading(prev => ({...prev, [nanoid]: true}));
      
      console.log("Hola");
      
      const docRef = doc(db, "urls", nanoid);
      await deleteDoc(docRef);
      
      // Borramos de manera local en nuestro useState 
      setData(data.filter((itemDoc) => {
        return itemDoc.nanoid !== nanoid;
      }));
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(prev => ({...prev, [nanoid]: false}));
    }
  }

  const updateData = async (nanoid, newOrigin) => {
    try {
      setLoading(prev => ({...prev, updateData: true}));
      const docRef = doc(db, "urls", nanoid);
      await updateDoc(docRef, {origin: newOrigin});
      // Actualizamos localmente los datos
      setData(data.map((item) => {
        return item.nanoid === nanoid ? ({...item, origin: newOrigin}) : item;
      }));

    } catch (error) {
      
    } finally {
      setLoading(prev => ({...prev, updateData: false}));
    }
  }

  const searchData = async (nanoid) => {
    try {
      const docRef = doc(db, "urls", nanoid);
      const docSnap = await getDoc(docRef);

      return docSnap;
      
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  }
  
  return {
    data, 
    error, 
    loading,
    //setLoading,
    getData,
    addData,
    deleteData,
    updateData,
    searchData,
  };
};

export { useFirestore };