import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'

function NoteDetailedView() {
    const noteId = useParams()

    const [note,setNote] =useState('')

    useEffect(()=>{
        const fetchNote = async ()=>{
            try{
                const response = await axios.get(`http://localhost:8000/note/${noteId}`)
                if (response.data.length > 0) {
                    setNote(response.data[0].content); 
                  }
                
            }
            catch (error) {
                console.error('Error fetching notes:', error);
              }
            
        }
        fetchNote()

    },[])
  return (
    <div>
        <h1>
            {note}
        </h1>
    </div>
  )
}

export default NoteDetailedView