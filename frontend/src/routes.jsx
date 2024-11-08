import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import { TaskDetailedView } from "./pages/TaskDetailedView";
import { PersonDetailedView } from "./pages/PersonDetailedView";
import NoteDetailedView from "./pages/NoteDetailedView";
import NotesVeiw from "./pages/NotesView";
import TasksView from "./pages/TasksView";
import InboxView from "./pages/InboxView";
import PeoplesView from "./pages/PeoplesView";
import MessagesView from "./pages/MessagesView";
import CalendarView from "./pages/CalendarView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Logout /> },
      { path: "/tasks", element: <TasksView/> },
      { path: "/inbox", element: <InboxView/> },
      { path: "/peoples", element: <PeoplesView/> },
      { path: "/messages", element: <MessagesView/> },
      { path: "/notes", element: <NotesVeiw /> },
      { path: "/calendar", element: <CalendarView/> },
      { path: "/note/:noteId", element: <NoteDetailedView /> },
      { path: "/task/:taskId", element: <TaskDetailedView /> },
      { path: "/person/:userId", element: <PersonDetailedView /> }
    ],
  },
]);

export default router;
