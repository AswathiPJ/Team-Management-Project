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

  const getStatusColor = (status) => {
    switch(status) {
      case "Pending":
        return "bg-red-300 hover:bg-red-400";
      case "In Progress":
        return "bg-yellow-200 hover:bg-yellow-300";
      case "Completed":
        return "bg-green-300 hover:bg-green-400";
      default:
        return "bg-slate-300 hover:bg-slate-400";
    }
  };

  return (
    <>
      {taskFetchStatus === "loading" ? (
        <div className="flex justify-center items-center h-52">
          <span className="text-center loading loading-bars loading-lg"></span>
        </div>
      ) : tasks.length > 0 ? (
        tasks.map((task) => (
          <div
            key={task.id}
            className="bg-white rounded-lg shadow-md m-2"
          >
            <div className={`grid grid-cols-1 transition-colors rounded-lg ${getStatusColor(task.status)} cursor-pointer`} onClick={() => handleTaskView(task.id)}>
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
      assigned_to: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number.isRequired,
          username: PropTypes.string,
          email: PropTypes.string.isRequired,
          first_name: PropTypes.string,
          last_name: PropTypes.string,
          date_of_birth: PropTypes.string,
          address: PropTypes.string,
          designation: PropTypes.string,
          joining_date: PropTypes.string,
          timezone: PropTypes.string,
          contact_no: PropTypes.string,
          user: PropTypes.number,
        })
      ),
      created_by: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      priority: PropTypes.oneOf(['Low', 'Medium', 'High']).isRequired,
      due_date: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.instanceOf(Date),
      ]).isRequired,
      created_at: PropTypes.string.isRequired,
      updated_at: PropTypes.string.isRequired,
    })
  ).isRequired,
};
