import { FiHome } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
import { MdAllInbox } from "react-icons/md";
import { FiMessageSquare } from "react-icons/fi";
import { IoPeopleSharp } from "react-icons/io5";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const MenuRoutes = () => {
  const navigate = useNavigate()

  return (
    <div className="space-y-1">
      <Route Icon={FiHome} selected={true} title="Dashboard" onClick={() => navigate('/')} />
      <Route Icon={FaTasks} selected={false} title="Tasks" onClick={() => navigate('/tasks')} />
      <Route Icon={MdAllInbox} selected={false} title="Inbox" onClick={() => navigate('/inbox')} />
      <Route Icon={IoPeopleSharp} selected={false} title="Peoples" onClick={() => navigate('/peoples')} />
      <Route Icon={FiMessageSquare} selected={false} title="Messages" onClick={() => navigate('/messages')} />
      <Route Icon={FaRegNoteSticky} selected={false} title="Private Notes" onClick={() => navigate('/notes')} />
      <Route Icon={FaRegCalendarCheck} selected={false} title="Calendar" onClick={() => navigate('/calendar')}/>
    </div>
  );
};

const Route = ({ selected, Icon, title, onClick }) => {
  return (
    <button onClick={onClick} className={`flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow, _background-color, _color] ${selected ? "bg-stone-200 text-stone-950 shadow" : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"}`}>
      <Icon className={`${selected ? "text-violet-500" : ""}`}/>
      <span>{title}</span>
    </button>
  );
};

export default MenuRoutes;
