import { AssignedTasks } from "./AssignedTasks";
import { Peoples } from "./Peoples"
import { Projects } from "./Projects"
import { Notes } from "./Notes";

export const Grid = () => {
  return (
    <div className="px-4 grid gap-3 grid-cols-12">
        <AssignedTasks />
        <Projects />
        <Peoples />
        <Notes />
    </div>
  );
};