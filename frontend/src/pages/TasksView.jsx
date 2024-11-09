import { TopBar } from "../components/Dashboard/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "../slices/taskSlice";
import { useNavigate } from "react-router-dom";

const TasksView = () => {
  const userId = useSelector((state) => state.auth.userid);
  const tasks = useSelector((state) => state.tasks.task_list);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks(userId));
  }, [dispatch, userId]);

  const handleTaskView = (taskId) => {
    navigate(`/task/${taskId}`)
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {tasks.map((task) => (
        <div key={task.id} className="m-4 border-2 cursor-pointer" onClick={() => handleTaskView(task.id)}>
          <p>{task.title}</p>
          <p>{task.description}</p>
          <p>{task.priority}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksView;
