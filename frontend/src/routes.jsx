import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import { TaskDetailedView } from "./pages/TaskDetailedView";
import { PersonDetailedView } from "./pages/PersonDetailedView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Logout /> },
      { path: "/task/:taskId", element: <TaskDetailedView /> },
      { path: "/person/:userId", element: <PersonDetailedView /> }
    ],
  },
]);

export default router;
