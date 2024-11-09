import { MdOutlineSort } from "react-icons/md";
import { CardTitle } from "./utils/CardTitle";
import { TaskCard } from "./utils/TaskCard";
import { fetchTasks } from "../../slices/taskSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useMemo } from 'react';

const SORT_OPTIONS = ["All", "Pending", "In Progress", "Completed", "Overdue"];

export const AssignedTasks = () => {
  const userId = useSelector((state) => state.auth.userid);
  const tasks = useSelector((state) => state.tasks.task_list);
  // const [filteredTasks, setFilteredTasks] = useState(tasks);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sortOptionIndex = 0;
  const [sortOption, setSortOption] = useState(SORT_OPTIONS[sortOptionIndex]);

  const handleSortClick = useCallback(() => {
    const currentIndex = SORT_OPTIONS.indexOf(sortOption);
    const nextIndex = (currentIndex + 1) % SORT_OPTIONS.length;
    setSortOption(SORT_OPTIONS[nextIndex]);
  }, [sortOption]);

  const filteredTasks = useMemo(() => {
    switch (sortOption) {
      case "All":
        return tasks.filter((task) => task.status !== "Completed");
      
      case "Overdue":
        return tasks
          .filter(task => 
            new Date(task.due_date) < new Date() && task.status !== "Completed"
          )
          .sort((a, b) => new Date(a.due_date) - new Date(b.due_date));

      default:
        return tasks.filter((task) => task.status === sortOption);
    }
  }, [sortOption, tasks]);

  useEffect(() => {
    dispatch(fetchTasks(userId));
  }, [dispatch, userId]);

  return (
    <div className="col-span-6 rounded-lg bg-stone-200 h-72">
      <CardTitle
        title={`Assigned Tasks (${tasks.length})`}
        button={
          <button
            onClick={handleSortClick}
            className="flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 px-3 py-1.5 rounded-lg"
          >
            <MdOutlineSort />
            {sortOption}
          </button>
        }
      />
      <TaskCard tasks={filteredTasks.slice(0, 3)} />
      {filteredTasks.length > 3 && (
        <div className="m-2">
          <button
            onClick={() => navigate(`/tasks`)}
            className="text-sm bg-stone-100 transition-colors shadow hover:bg-violet-100 p-1.5 rounded-lg w-full"
          >
            {`Show All (${tasks.length})`}
          </button>
        </div>
      )}
    </div>
  );
};
