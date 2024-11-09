import { FiSearch } from "react-icons/fi";
import { RxSlash } from "react-icons/rx";
import { useState } from "react";
import { CommandMenu } from "./CommandMenu";

const Search = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-stone-200 mb-4 relative rounded-lg flex items-center px-3 py-1.5 text-sm">
        <FiSearch className="mr-2" />
        <input
        onFocus={(e) => {
            e.target.blur();
            setOpen(true)
        }}
          type="text"
          placeholder="Search"
          className="w-full bg-transparent placeholder:text-stone-400 focus:outline-none"
        />

        <span className="p-1 text-xs gap-0.5 items-cemter shadow bg-stone-50 rounded-lg absolute right-1.5 top-1/2 -translate-y-1/2">
          <RxSlash />
        </span>
      </div>

      <CommandMenu open={open} setOpen={setOpen}/>
    </>
  );
};

export default Search;
