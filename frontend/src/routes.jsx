import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "/login", element: <Login /> },
      { path: "/logout", element: <Logout />},
    ],
  },
]);

export default router;
