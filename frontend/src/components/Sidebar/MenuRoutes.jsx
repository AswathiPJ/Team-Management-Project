import { FiHome } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { MdAllInbox } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { IoPeopleSharp } from "react-icons/io5";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";

const MenuRoutes = () => {
  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={true} title="Dashboard" />
      <Route Icon={FaTasks} selected={false} title="Tasks" />
      <Route Icon={MdAllInbox} selected={false} title="Inbox" />
      <Route Icon={IoPeopleSharp} selected={false} title="Peoples" />
      <Route Icon={FiMessageSquare} selected={false} title="Messages" />
      <Route Icon={FaRegNoteSticky} selected={false} title="Private Notes" />
      <Route Icon={FaRegCalendarCheck} selected={false} title="Calendar" />
    </div>
  );
};

const Route = ({ selected, Icon, title }) => {
  return (
    <button className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow, _background-color, _color] ${selected ? "bg-stone-200 text-stone-950 shadow" : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"}`}>
      <Icon className={`${selected ? "text-violet-500" : ""}`}/>
      <span>{title}</span>
    </button>
  );
};

export default MenuRoutes;
