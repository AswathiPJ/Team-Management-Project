import { CardTitle } from "./utils/CardTitle";

export const Notes = () => {
  return (
    <>
      <div className="col-span-6 rounded border flex flex-col h-full bg-stone-200">
        <CardTitle title="Private Notepad" />
        <div className="m-2 flex-grow">
          <textarea
            className=" focus:outline-none w-full h-full resize-none bg-transparent"
            placeholder="Write down anything here..."
          ></textarea>
        </div>
        <div className="h-10 m-2 flex-shrink-0">
          <button className="text-sm bg-stone-100 transition-colors hover:bg-green-400 p-1.5 rounded w-full">
            Save
          </button>
        </div>
      </div>
    </>
  );
};
