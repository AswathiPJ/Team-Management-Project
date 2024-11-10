import { useSelector } from "react-redux";
import { TopBar } from "../components/Dashboard/TopBar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getNotes } from "../slices/noteSlice";
import { useNavigate } from "react-router-dom";

const NotesView = () => {
  const userId = useSelector((state) => state.auth.userid);
  const notes = useSelector((state) => state.notes.notes);
  const getNotesStatus = useSelector((state) => state.notes.getNotesStatus);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNotes(userId));
  }, [dispatch, userId]);

  const handleNotesView = (noteId) => {
    navigate(`/note/${noteId}`);
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {getNotesStatus === "loading" ? (
        <div className="flex justify-center items-center h-48">
          <span className="text-center loading loading-bars loading-lg"></span>
        </div>
      ) : (
        <>
          {notes.map((note) => (
            <div
              className="shadow-lg m-4 rounded-lg hover:bg-stone-200 cursor-pointer"
              onClick={() => handleNotesView(note.id)}
              key={note.id}
            >
              <div className="p-6">
                <p className="text-truncate text-base truncate">
                  {note.content.length > 60
                    ? `${note.content.substring(0, 60)}...`
                    : note.content}
                </p>
                <p className="text-xs">Created at: {formatDateTime(note.created_at)}</p>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

function formatDateTime(dateString) {
  const [date, time] = dateString.split('T');
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  const timeZoneOffset = dateString.match(/([+-]\d{2}:\d{2})$/)[0];

  return `${day}/${month}/${year} ${hours}:${minutes}  ${timeZoneOffset}`;
}

export default NotesView;
