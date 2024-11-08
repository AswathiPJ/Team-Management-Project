import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import { TopBar } from '../components/Dashboard/TopBar'
import { getSelectedNote} from "../slices/noteSlice";

function NoteDetailedView() {
    const {noteId } = useParams()
    const selectedNote = useSelector((state) => state.notes.selectedNote);
    const selectedNoteFetchStatus = useSelector(
    (state) => state.notes.getSelectedNoteStatus
  );
  const dispatch = useDispatch();

    const [note,setNote] =useState('')

    useEffect(() => {
        dispatch(getSelectedNote(noteId));
      }, [dispatch, noteId]);

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {selectedNoteFetchStatus === "success" ? (
        <>
          <h1>{`Content : ${selectedNote.content}`}</h1>
        </>
      ) : (
        <div className="flex justify-center items-center h-48">
          <span className="text-center loading loading-infinity loading-lg"></span>
        </div>
      )}
    </div>
  )
}

export default NoteDetailedView