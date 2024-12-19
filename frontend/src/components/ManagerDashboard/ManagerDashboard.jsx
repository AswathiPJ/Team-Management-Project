import { Peoples } from "../Dashboard/Peoples"
import { TasksAssigned } from "./TasksAssigned";
// import { AssignedTasks } from "../Dashboard/AssignedTasks";
import { Projects } from "../Dashboard/Projects"
import { Notes } from "../Dashboard/Notes";

export const ManagerDashboard = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
      <TasksAssigned />
      {/* <AssignedTasks /> */}
      <Projects />
      <Peoples />
      <Notes />
    </div>
  );
};
