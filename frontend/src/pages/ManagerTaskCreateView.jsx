import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { TopBar } from "../components/Dashboard/TopBar";
import { getSelectedNote,editNote } from "../slices/noteSlice";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function NoteDetailedView() {
  const { noteId } = useParams();
  const selectedNote = useSelector((state) => state.notes.selectedNote);
  const [content, setContent] = useState("");
  const selectedNoteFetchStatus = useSelector(
    (state) => state.notes.getSelectedNoteStatus
  );
  const editNoteStatus = useSelector((state) => state.notes.editNoteStatus)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSelectedNote(noteId));
  }, [dispatch, noteId]);

  useEffect(() => {
    if (selectedNote && selectedNote.content) {
      setContent(selectedNote.content);
    }
  }, [selectedNote]);

  const handleSave = () => {
    console.log(noteId, content)
    dispatch(editNote({"id": noteId, "content": content}))
  };

  useEffect(() => {
    if (editNoteStatus === "succeeded") {
      toast.success("Note saved successfully!");
    } else if(editNoteStatus === "failed") {
      toast.error("Failed to save Note")
    }
  }, [editNoteStatus]);

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {selectedNoteFetchStatus === "success" ? (
        <div className="mx-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 rounded-lg border focus:outline-none"
            rows="10"
          ></textarea>
          <p className="text-sm">Created at: {formatDateTime(selectedNote.created_at)}</p>
          <p className="text-sm">Updated at: {formatDateTime(selectedNote.updated_at)}</p>
          <button
            onClick={handleSave}
            className="mt-2 btn btn-primary text-white rounded-lg"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <span className="text-center loading loading-bars loading-lg"></span>
        </div>
      )}
    </div>
  );
}

function formatDateTime(dateString) {
  const [date, time] = dateString.split('T');
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  const timeZoneOffset = dateString.match(/([+-]\d{2}:\d{2})$/)[0];

  return `${day}/${month}/${year} ${hours}:${minutes}  ${timeZoneOffset}`;
}

export default NoteDetailedView;
