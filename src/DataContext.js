
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from './Axios.js'
const MyContext = createContext(null);

function DataContext({ children }) {
    const [dataApi,setDataApi]=useState([])


    const getdata=async()=>{
         const res=await axios.get("/api/Department")
         const result=await res.data;
         setDataApi(result)
    }
useEffect(()=>{
    getdata();
},[])


  return (
    <MyContext.Provider value={{ dataApi}}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}

export default DataContext;

//value can be of any type but it should be one single object=>simple or complex object

//child consumes data from the context provided by parent component
//child should subsribe to parent by using useContext to get data from it
