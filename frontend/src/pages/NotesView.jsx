import { useSelector } from "react-redux";
import { TopBar } from "../components/Dashboard/TopBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotes } from "../slices/noteSlice";

const NotesView = () => {
  const userId = useSelector((state) => state.auth.userid);
  const notes = useSelector((state) => state.notes.notes);
  const getNotesStatus = useSelector((state) => state.notes.getNotesStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNotes(userId));
  }, [dispatch, userId]);

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {getNotesStatus === "loading" ? (
        <div className="flex justify-center items-center h-48">
          <span className="text-center loading loading-infinity loading-lg"></span>
        </div>
      ) : (
        <>
          {notes.map((note) => (
            <h1 key={note.id}>
              {note.id} -&gt; {note.content}
            </h1>
          ))}
        </>
      )}
    </div>
  );
};

export default NotesView;
