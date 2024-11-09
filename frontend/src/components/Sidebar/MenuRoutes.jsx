import { FiHome } from "react-icons/fi";
import { FaTasks } from "react-icons/fa";
// import { MdAllInbox } from "react-icons/md";
import { GoProjectSymlink } from "react-icons/go";
import { FiMessageSquare } from "react-icons/fi";
import { IoPeopleSharp } from "react-icons/io5";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setActiveRoute } from "../../slices/routeSlice";
import PropTypes from "prop-types";

const MenuRoutes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRouteChange = (route) => {
    dispatch(setActiveRoute(route));
    navigate(`/${route}`);
  };

  const handleRootPath = () => {
    dispatch(setActiveRoute("dashboard"));
    navigate("/");
  };

  const shouldSelectRoute = (routeName) => {
    const currentPath = window.location.pathname.split("/")[1];
    return (
      currentPath === routeName ||
      (currentPath === "" && routeName === "dashboard")
    );
  };

  return (
    <div className="space-y-1">
      <Route
        Icon={FiHome}
        isSelected={shouldSelectRoute("dashboard")}
        title="Dashboard"
        onClick={handleRootPath}
      />
      <Route
        Icon={FaTasks}
        isSelected={shouldSelectRoute("tasks")}
        title="Tasks"
        onClick={() => handleRouteChange("tasks")}
      />
      {/* <Route Icon={MdAllInbox} isSelected={shouldSelectRoute('inbox')} title="Inbox" onClick={() => handleRouteChange('inbox')} /> */}
      <Route
        Icon={GoProjectSymlink}
        isSelected={shouldSelectRoute("projects")}
        title="Projects"
        onClick={() => handleRouteChange("projects")}
      />
      <Route
        Icon={IoPeopleSharp}
        isSelected={shouldSelectRoute("peoples")}
        title="Peoples"
        onClick={() => handleRouteChange("peoples")}
      />
      <Route
        Icon={FaRegNoteSticky}
        isSelected={shouldSelectRoute("notes")}
        title="Private Notes"
        onClick={() => handleRouteChange("notes")}
      />
      <Route
        Icon={FiMessageSquare}
        isSelected={shouldSelectRoute("chats")}
        title="Chats"
        onClick={() => handleRouteChange("chats")}
      />
      <Route
        Icon={FaRegCalendarCheck}
        isSelected={shouldSelectRoute("calendar")}
        title="Calendar"
        onClick={() => handleRouteChange("calendar")}
      />
    </div>
  );
};

const Route = ({ isSelected, Icon, title, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-start gap-2 w-full rounded-lg px-2 py-1.5 text-sm transition-[box-shadow, _background-color, _color] ${isSelected ? "bg-stone-200 text-stone-950 shadow" : "hover:bg-stone-200 bg-transparent text-stone-500 shadow-none"}`}
    >
      <Icon className={`${isSelected ? "text-violet-500" : ""}`} />
      <span>{title}</span>
    </button>
  );
};

export default MenuRoutes;

Route.propTypes = {
  isSelected: PropTypes.bool.isRequired,
  Icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
