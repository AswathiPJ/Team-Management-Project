import { MdOutlineSort } from "react-icons/md";
import { CardTitle } from "./utils/CardTitle";
import { TaskCard } from "./utils/TaskCard";
import { fetchTasks } from "../../slices/taskSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const AssignedTasks = () => {
  const userId = useSelector((state) => state.auth.userid);
  const tasks = useSelector((state) => state.tasks.task_list);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks(userId));
  }, [dispatch, userId]);

  return (
    <div className="col-span-6 rounded-lg bg-stone-200 h-72">
      <CardTitle
        title={`Assigned Tasks (${tasks.length})`}
        Icon={MdOutlineSort}
        action="Sort"
      />
      <TaskCard tasks={tasks.slice(0, 3)} />
      { tasks.length > 3 && (
        <div className="m-2">
          <button onClick={() => navigate(`/tasks`)} className="text-sm bg-stone-100 transition-colors shadow hover:bg-violet-100 p-1.5 rounded-lg w-full">
            {`Show All (${tasks.length})`}
          </button>
        </div>
      )}
    </div>
  );
};
