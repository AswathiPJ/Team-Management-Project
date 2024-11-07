import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getTimeRemaining } from "./timeUtil";

export const TaskCard = ({ tasks }) => {
  const taskFetchStatus = useSelector((state) => state.tasks.status);

  return (
    <>
      {taskFetchStatus === "loading" ? (
        <span className="loading loading-infinity loading-lg"></span>
      ) : tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className="bg-white rounded shadow-md m-2 cursor-pointer">
            <div className="grid grid-cols-1">
              <span className="text-sm font-bold text-gray-800 ml-2">
                {task.title}
              </span>
              <div className="flex justify-between items-center">
                <div className="flex flex-col sm:flex-row items-start">
                  <span className="font-medium text-gray-600 ml-2">
                    {task.project.title}
                  </span>
                  <div className="flex flex-col sm:flex-row items-start ml-2">
                    <span className="text-gray-500">Due in:</span>
                    <span>{getTimeRemaining(task.due_date)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 mt-4">No tasks assigned</p>
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
