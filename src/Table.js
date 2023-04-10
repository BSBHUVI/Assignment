import React, { useEffect, useRef, useState } from "react";
import { useMyContext } from "./DataContext";
import axios from "axios";
import SelectedTable from "./SelectedTable";

export default function Table({canDel}) {

  

    const {dataApi,setToggle}=useMyContext()
    const [data,setData]=useState([])
    const sortval=useRef()
 

    const [checkedData,setCheckedData]=useState([])
    const [checkedColumn,setCheckedColumn]=useState([])
   



    useEffect(()=>{
      setData(dataApi.slice())
    },[dataApi])
   
   
  let headers;

  if (data === undefined || data.length === 0)
    return <>No Data</>;
  else {
   
    headers = Object.keys(data[0]);
    headers=headers.slice(0,4)

    const deleteRecord=(id)=>{
     
        const url=`https://localhost:7105/api/Department?i=${id}`
 
        axios.delete(url).then(()=>{
          setToggle((prev)=>!prev)
        }).catch((err)=>{
            alert(err.message)
        })

    }
    const change=(e,record)=>{
      const element=document.getElementsByClassName(record.Id)
    if(e.target.checked){

     setCheckedData((prev)=>[...prev,record])
    
     for(let i=0;i<element.length;i++){
      element[i].style.backgroundColor="grey"
      element[i].style.color="white"
     }

    }else{
      const filter=checkedData.filter((val)=>val!==record)
      setCheckedData([...filter])
      for(let i=0;i<element.length;i++){
        element[i].style.backgroundColor="white"
        element[i].style.color="black"
       }
   
    }

    
    }
   const selectColumn=(e,val)=>{
    if(e.target.checked){
      const dataColum=data.map((item)=>item[val]+" , ")
    dataColum.unshift(val+" : ")
      setCheckedColumn((prev)=>[...prev,dataColum])
     

    }else{
      const dataCol=checkedColumn.filter((valu)=>valu!==val)
      setCheckedColumn(dataCol)
    }

   }

   

    const sortlist=()=>{
      switch(sortval.current.value){
        case "Name":
          setData(dataApi.slice().sort((a,b)=>a.Name.localeCompare(b.Name)))
          break
        case "Location":
          setData(dataApi.slice().sort((a,b)=>a.Location.localeCompare(b.Location)))
          break 
        case "Id":
          setData(dataApi.slice().sort((a,b)=>(Number(a.Id)-Number(b.Id))))
          break  
          case "Capacity":
          setData(dataApi.slice().sort((a,b)=>(Number(a.Capacity)-Number(b.Capacity))))
          break      
        default:  
        break
      }
    }
    return (
      <div style={{display:"flex",alignItems:"center",width:"100%",justifyContent:"space-around"}}>
      <div>
        <h3 style={{ textAlign: "center", margin: "2rem" }}>
          I am a DataGrid Chomponent I am Child
        </h3>

        
                <p>sort by</p>
                <select onChange={sortlist} ref={sortval}>
                <option value="Id">Id</option>
                <option value="Name">Name</option>
                <option value="Location">Location</option>
                <option value="Capacity">Capacity</option>
                </select>
        <table>
          <thead>
            <tr>
              {headers.map((h, i) => (
              
                <th key={i}>{h}
                <input onChange={(e)=>selectColumn(e,h)}  type="checkbox"/>
                </th>
              
              
               

              ))}
            </tr>
          </thead>

          <tbody>
            {data.map((rec, idx) => (
              
              <tr 
               key={idx} >
             
                {headers.map((h, i) => (
                  <td className={`${rec.Id}`} key={i}>{rec[h]}</td>
                ))}
                {canDel &&  <td className="redd" onClick={()=>deleteRecord(rec.Id)} style={{margin:"1rem"}}>delete</td>}
                <input  onChange={(e)=>change(e,rec)}  className="inp" type="checkbox"/>
              </tr>
      
           
            ))}
          </tbody>
        </table>


      
      </div>
      <SelectedTable dataSource={checkedData}/>

     <div>
     { checkedColumn.length!==0 &&  <h1>selected column data : </h1>}
     <table>
  
     <tr>
     {checkedColumn.map((val,idx)=>{
          return <tr key={idx}>
            <td>{val}</td>
          </tr>
     })}
     </tr>
</table>
     </div>
      </div>
    );
  }
}
