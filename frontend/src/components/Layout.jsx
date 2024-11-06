import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";

const Layout = () => {
  return (
    <main className="grid gap-4 p-4 grid-cols-[220px,_1fr]">
      <Sidebar />
      <Outlet />
    </main>
  );
};

export default Layout;
