import { useSelector } from "react-redux";
import TasksView from "../../pages/TasksView";
import ManagerTasksView from "./ManagerTasksView";

export const TaskComponent = () => {
  const role = useSelector((state) => state.auth.role);

  if (role === "ProjectManager") {
    return <ManagerTasksView />;
  }

  return <TasksView />;
};
