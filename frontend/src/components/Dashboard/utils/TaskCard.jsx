import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getTimeRemaining } from "./timeUtil";
import { useNavigate } from "react-router-dom";

export const TaskCard = ({ tasks }) => {
  const taskFetchStatus = useSelector((state) => state.tasks.status);
  const navigate = useNavigate()

  const handleTaskView = (taskId) => {
    navigate(`/task/${taskId}`)
  };

  return (
    <>
      {taskFetchStatus === "loading" ? (
        <div className="flex justify-center items-center h-52">
          <span className="text-center loading loading-infinity loading-lg"></span>
        </div>
      ) : tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded shadow-md m-2"
          >
            <div className="grid grid-cols-1 transition-colors hover:bg-green-300  cursor-pointer" onClick={() => handleTaskView(task.id)}>
              <span className="text-sm font-bold text-gray-800 mx-2 my-1.5">
                {task.title}
              </span>
              <div className="flex justify-between items-center mb-1.5">
                <div className="flex flex-col sm:flex-row items-start">
                  <span className="font-medium text-xs text-gray-600 ml-2">
                    {task.project.title}
                  </span>
                  <div className="flex flex-col sm:flex-row items-start ml-2 text-xs">
                    <span className="text-gray-500"> -&gt; Due in:</span> &nbsp;
                    <span className="font-bold">{getTimeRemaining(task.due_date)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex justify-center items-center h-48">
          <p className="text-center text-gray-500 mt-4">No tasks assigned.</p>
        </div>
      )}
    </>
  );
};

TaskCard.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string,
      project: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired,
      assigned_to: PropTypes.arrayOf(PropTypes.number),
      created_by: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      due_date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
      ]),
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};
