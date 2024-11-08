import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import { TaskDetailedView } from "./pages/TaskDetailedView";
import { PersonDetailedView } from "./pages/PersonDetailedView";
import NotesVeiw from "./pages/NotesView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Logout /> },
      { path: "/notes", element: <NotesVeiw /> },
      { path: "/task/:taskId", element: <TaskDetailedView /> },
      { path: "/person/:userId", element: <PersonDetailedView /> }
    ],
  },
]);

export default router;
