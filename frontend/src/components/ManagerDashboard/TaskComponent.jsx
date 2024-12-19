import { useSelector } from "react-redux";
import TasksView from "../../pages/TasksView";
import { TasksManagerView } from "./TasksManagerView";

export const TaskComponent = () => {
  const role = useSelector((state) => state.auth.role);

  if (role === "ProjectManager") {
    return <TasksManagerView />;
  }

  return <TasksView />;
};
