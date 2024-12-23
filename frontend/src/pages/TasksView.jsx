import { TopBar } from "../components/Dashboard/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchTasks } from "../slices/taskSlice";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const TasksView = () => {
  const userId = useSelector((state) => state.auth.userid);
  const tasks = useSelector((state) => state.tasks.task_list);
  const [selectedStatus, setSelectedStatus] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTasks(userId));
  }, [dispatch, userId]);

  const handleTaskView = (taskId) => {
    navigate(`/task/${taskId}`);
  };

  const countTasksByStatus = (tasks) => {
    const counts = {
      Completed: 0,
      Pending: 0,
      InProgress: 0,
    };

    tasks.forEach((task) => {
      if (task.status === "Completed") {
        counts.Completed += 1;
      } else if (task.status === "In Progress") {
        counts.InProgress += 1;
      } else {
        counts.Pending += 1;
      }
    });

    return counts;
  };

  const taskCounts = countTasksByStatus(tasks);
  console.log(taskCounts);

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="container p-4">
        <div className="stats shadow">
          <StatsCard
            title="Total"
            value={tasks.length}
            selectedStatus={selectedStatus === null}
            onClick={() => setSelectedStatus(null)}
          />
          <StatsCard
            title="Pending"
            value={taskCounts.Pending}
            selectedStatus={selectedStatus === "Pending"}
            onClick={() => setSelectedStatus("Pending")}
          />
          <StatsCard
            title="In Progress"
            value={taskCounts.InProgress}
            selectedStatus={selectedStatus === "In Progress"}
            onClick={() => setSelectedStatus("In Progress")}
          />
          <StatsCard
            title="Completed"
            value={taskCounts.Completed}
            selectedStatus={selectedStatus === "Completed"}
            onClick={() => setSelectedStatus("Completed")}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {selectedStatus
          ? tasks
              .filter((task) => task.status === selectedStatus)
              .map((task) => (
                <CardComponent
                  key={task.id}
                  title={task.title}
                  description={task.description}
                  onClick={() => handleTaskView(task.id)}
                  priority={task.priority}
                  project={task.project.title}
                  className={
                    task.priority === "High"
                      ? "text-red-400"
                      : task.priority === "Medium"
                        ? "text-yellow-300"
                        : "text-green-400"
                  }
                />
              ))
          : tasks.map((task) => (
              <CardComponent
                key={task.id}
                title={task.title}
                description={task.description}
                onClick={() => handleTaskView(task.id)}
                priority={task.priority}
                project={task.project.title}
                className={
                  task.priority === "High"
                    ? "text-red-400"
                    : task.priority === "Medium"
                      ? "text-yellow-300"
                      : "text-green-400"
                }
              />
            ))}
      </div>
    </div>
  );
};

const CardComponent = ({
  title,
  description,
  onClick,
  className,
  priority,
  project
}) => {
  return (
    <div
      className="card bg-base-100 w-72 shadow-xl cursor-default"
    >
      <div className="card-body p-4">
        <h2 className="card-title truncate">
          {title.length > 30 ? `${title.substring(0, 30)}...` : title}
        </h2>
        <p className="text-truncate text-sm truncate">
          {description.length > 30
            ? `${description.substring(0, 30)}...`
            : description}
        </p>
        <p className="text-sm">
          Project: {project}
          {/* {console.log(project)} */}
        </p>
        <p className="text-sm">
          Priority: <span className={className}>{priority}</span>
        </p>
        <div className="card-actions justify-end">
          <button onClick={onClick} className="btn btn-primary px-4 py-3 rounded-lg">
            <span className="text-sm font-semibold">View</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const StatsCard = ({ title, value, onClick, selectedStatus }) => {
  let className = "stat hover:bg-stone-200 cursor-pointer";
  if (selectedStatus) {
    className += " bg-stone-200";
  }

  return (
    <div onClick={onClick} className={className}>
      <div className="stat-title">{title}</div>
      <div className="stat-value text-center">{value}</div>
    </div>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  priority: PropTypes.string,
  project: PropTypes.string
};

StatsCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  selectedStatus: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
};

export default TasksView;
