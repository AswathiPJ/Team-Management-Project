import { useParams } from "react-router-dom";
import { TopBar } from "../components/Dashboard/TopBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectedTask } from "../slices/taskSlice";
import { useEffect } from "react";

export const TaskDetailedView = () => {
  const { taskId } = useParams();
  const selectedTask = useSelector((state) => state.tasks.selected_task);
  const selectedTaskFetchStatus = useSelector(
    (state) => state.tasks.selected_status
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSelectedTask(taskId));
  }, [dispatch, taskId]);

  const getAssignedUserNames = () => {
    return selectedTask.assigned_to.map((user) => user.username).join(", ");
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {selectedTaskFetchStatus === "succeeded" ? (
        <>
          <h1>{`Title: ${selectedTask.title}`}</h1>
          <h1>{`Description: ${selectedTask.due_date}`}</h1>
          <h1>{`Due date: ${selectedTask.due_date}`}</h1>
          <h1>{`Priority: ${selectedTask.priority}`}</h1>
          <h1>{`Project: ${selectedTask.project.title}`}</h1>
          <h1>{`status: ${selectedTask.status}`}</h1>
          <h2>Assigned Users:</h2>
          <ul>
            {getAssignedUserNames()
              .split(",")
              .map((userName, index) => (
                <li key={index}>{userName}</li>
              ))}
          </ul>
        </>
      ) : (
        <div className="flex justify-center items-center h-48">
          <span className="text-center loading loading-bars loading-lg"></span>
        </div>
      )}
    </div>
  );
};
