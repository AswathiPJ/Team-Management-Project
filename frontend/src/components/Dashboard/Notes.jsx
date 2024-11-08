import { useState, useEffect } from "react";
import { CardTitle } from "./utils/CardTitle";
import { useDispatch, useSelector } from "react-redux";
import { postNote } from "../../slices/noteSlice";

export const Notes = () => {
  const dispatch = useDispatch();
  const userid = useSelector((state) => state.auth.userid);
  const notePostStatus = useSelector((state) => state.notes.postStatus)
  const [noteContent, setNoteContent] = useState("");

  const handleSave = async () => {
    dispatch(postNote({
      userid: userid,
      content: noteContent
    }))
  };

  useEffect(() => {
    if (notePostStatus === "succeeded") {
      setNoteContent("");
    }
  }, [notePostStatus])

  return (
    <>
      <div className="col-span-6 rounded border flex flex-col h-full bg-stone-200">
        <CardTitle title="Private Notepad" />
        <div className="m-2 flex-grow">
          <textarea
            value={noteContent}
            className=" focus:outline-none w-full h-full resize-none bg-transparent"
            placeholder="Write down anything here..."
            onChange={(e) => setNoteContent(e.target.value)}
          ></textarea>
        </div>
        <div className="h-10 m-2 flex-shrink-0">
          <button
            className="text-sm bg-stone-100 transition-colors hover:bg-green-400 p-1.5 rounded w-full"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};
