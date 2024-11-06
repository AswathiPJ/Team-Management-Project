import { MdOutlineSort } from "react-icons/md";
import { CardTitle } from "./utils/CardTitle";
import { TaskCard } from "./utils/TaskCard";

export const AssignedTasks = () => {
  const assignedTasks = [
    { id: 1, title: "Task 1", project: "project 1" },
    { id: 2, title: "Task 2", project: "project 2" },
    { id: 3, title: "Task 3", project: "project 3" },
  ];

  return (
    <div className="col-span-6 rounded bg-stone-200 h-80">
      <CardTitle title="Assigned Tasks" Icon={MdOutlineSort} action="Sort" />
      <TaskCard items={assignedTasks} />
      <div className="m-2">
        <button className="text-sm bg-stone-100 transition-colors hover:bg-violet-100 p-1.5 rounded w-full">
          Show All
        </button>
      </div>
    </div>
  );
};
