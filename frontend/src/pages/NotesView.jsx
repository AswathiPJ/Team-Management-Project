import { useSelector } from "react-redux";
import { TopBar } from "../components/Dashboard/TopBar";
import axios from 'axios'
import { useState,useEffect } from "react";

const NotesView = () => {
    const userid = useSelector((state)=>state.auth.userid)
    const [notes,setNotes] =useState([])

    useEffect(()=>{
        const fetchNotes = async ()=>{
            try{
                const response = await axios.get(`http://localhost:8000/notes`)
                if (response.data.length > 0) {
                    setNotes(response.data.filter(note => note.userid === userid)); 
                  }
                
            }
            catch (error) {
                console.error('Error fetching notes:', error);
              }
            
        }
        fetchNotes()

    },[])

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {notes.map((note)=>
    (
    <><h1>{note.id}</h1>
        <h1>{note.content}</h1>
        </>
    ))}
    </div>
  );
};

export default NotesView;
