import { useParams } from "react-router-dom";
import { TopBar } from "../components/Dashboard/TopBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectedTask, updateTaskStatus } from "../slices/taskSlice";
import { useEffect } from "react";
import { Card } from "antd";

export const TaskDetailedView = () => {
  const { taskId } = useParams();
  const selectedTask = useSelector((state) => state.tasks.selected_task);
  const selectedTaskFetchStatus = useSelector(
    (state) => state.tasks.selected_status
  );
  const statusUpdateStatus = useSelector(
    (state) => state.tasks.status_update_status
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSelectedTask(taskId));
  }, [dispatch, taskId, statusUpdateStatus]);

  const getAssignedUserNames = () => {
    return selectedTask.assigned_to.map((user) => user.username).join(", ");
  };

  const handleStatusChange = (newStatus) => {
    dispatch(updateTaskStatus({ id: taskId, status: newStatus }));
  };

  const getStatusButtons = () => {
    switch (selectedTask.status) {
      case "Pending":
        return (
          <>
            <button
              className="btn bg-yellow-400 my-1 mr-2"
              onClick={() => handleStatusChange("In Progress")}
            >
              Mark as In Progress
            </button>
            <button
              className="btn bg-green-400 my-1 mr-2"
              onClick={() => handleStatusChange("Completed")}
            >
              Mark as Completed
            </button>
          </>
        );
      case "In Progress":
        return (
          <>
            <button
              className="btn bg-green-400 my-1 mr-2"
              onClick={() => handleStatusChange("Completed")}
            >
              Mark as Completed
            </button>
          </>
        );
      case "Completed":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {selectedTaskFetchStatus === "succeeded" ? (
        <>
          <Card
            className="mx-4 rounded-lg bg-white shadow-xl border-2"
            title={
              <span className="text-3xl font-bold">{selectedTask.title}</span>
            }
            style={{ width: 600 }}
          >
            <p className="py-1 text-sm">{`Description: ${selectedTask.description}`}</p>
            <p className="py-1 text-sm">{`Project: ${selectedTask.project.title}`}</p>
            <p className="py-1 text-sm">{`Priority: ${selectedTask.priority}`}</p>
            <p className="py-1 text-sm">{`Due Date: ${formatDateTime(selectedTask.due_date)}`}</p>
            <p className="py-1 text-sm">{`Status: ${selectedTask.status}`}</p>
            <p className="py-1 text-sm">{`Assigned By: : ${selectedTask.created_by}`}</p>
            <p className="py-1 text-sm">{`Assigned Users: ${getAssignedUserNames()}`}</p>
            {getStatusButtons()}
          </Card>
        </>
      ) : (
        <div className="flex justify-center items-center h-48">
          <span className="text-center loading loading-bars loading-lg"></span>
        </div>
      )}
    </div>
  );
};

function formatDateTime(dateString) {
  const [date, time] = dateString.split('T');
  const [year, month, day] = date.split('-');
  const [hours, minutes] = time.split(':');
  const timeZoneOffset = dateString.match(/([+-]\d{2}:\d{2})$/)[0];

  return `${day}/${month}/${year} ${hours}:${minutes}  ${timeZoneOffset}`;
}