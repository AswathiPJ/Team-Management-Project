import { Peoples } from "../Dashboard/Peoples"
import { TasksAssigned } from "./TasksAssigned";
import { Projects } from "../Dashboard/Projects"
import { Notes } from "../Dashboard/Notes";

export const ManagerDashboard = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <TasksAssigned />
      <Projects />
      <Peoples />
      <Notes />
    </div>
  );
};
