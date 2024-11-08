import { useEffect, useState } from "react";
import { CardTitle } from "./utils/CardTitle";
import axios from 'axios'
import {useSelector} from "react-redux"

export const Notes = () => {
  const userid = useSelector((state)=> state.auth.userid) 
  const [notes,setNotes] =useState('')

  // useEffect(()=>{
  //   const fetchNotes = async ()=>{
  //   //   const response = await axios.get(`http://localhost:8000/notes/${userid}`)
  //   //   setNotes(response.data[0].content)
  //   //   console.log(response.data[0].content)
  //   // }
  //   try {
  //     const response = await axios.get(`http://localhost:8000/notes/?user=${userid}`);
  //     if (response.data.length > 0) {
  //       setNotes(response.data[0].content);
  //       console.log("Notes", response.data[0].content);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching notes:', error);
  //   }
  //   }
  // if (userid){
  //   fetchNotes();
  // }
   
  // },[]);

  const handleSave = async ()=>{
    const response = await axios.post(`http://localhost:8000/notes/`,{ userid:userid,
      content:notes})
      setNotes("")
  }


  return (
    <>
      <div className="col-span-6 rounded border flex flex-col h-full bg-stone-200">
        <CardTitle title="Private Notepad" />
        <div className="m-2 flex-grow">
          <textarea value={notes}
            className=" focus:outline-none w-full h-full resize-none bg-transparent"
            placeholder="Write down anything here..."
            onChange={(e)=>setNotes(e.target.value)}
          ></textarea>
        </div>
        <div className="h-10 m-2 flex-shrink-0">
          <button className="text-sm bg-stone-100 transition-colors hover:bg-green-400 p-1.5 rounded w-full"
          onClick={handleSave}>
            Save
          </button>
        </div>
      </div>
    </>
  );
};
