import { useSelector } from "react-redux";

import { TopBar } from "./TopBar";
import { Grid } from "./Grid";
import { ManagerDashboard } from "../ManagerDashboard/ManagerDashboard";

const Dashboard = () => {
  const role = useSelector((state) => state.auth.role);

  return <div className="bg-white rounded-lg pb-4 shadow">
    <TopBar />
    {role === "ProjectManager" ? <ManagerDashboard /> : <Grid />}
  </div>;
};

export default Dashboard;
