import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard/Dashboard";
import { TaskDetailedView } from "./pages/TaskDetailedView";
import { PersonDetailedView } from "./pages/PersonDetailedView";
import NoteDetailedView from "./pages/NoteDetailedView";
import ChatDetailedView from "./pages/ChatDetailedView";
import NotesVeiw from "./pages/NotesView";
import TasksView from "./pages/TasksView";
import ProjectsView from "./pages/ProjectsView";
import PeoplesView from "./pages/PeoplesView";
import ChatsView from "./pages/ChatsView";
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
      { path: "/projects", element: <ProjectsView /> },
      { path: "/peoples", element: <PeoplesView/> },
      { path: "/chats", element: <ChatsView/> },
      { path: "/notes", element: <NotesVeiw /> },
      { path: "/calendar", element: <CalendarView/> },
      { path: "/note/:noteId", element: <NoteDetailedView /> },
      { path: "/task/:taskId", element: <TaskDetailedView /> },
      { path: "/chat/:slug", element: <ChatDetailedView/> },
      { path: "/person/:userId", element: <PersonDetailedView /> }
    ],
  },
]);

export default router;
