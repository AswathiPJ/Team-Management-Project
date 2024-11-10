import { TopBar } from "../components/Dashboard/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProjects } from "../slices/projectSlice";
import { Card } from "antd";

const ProjectsView = () => {
  const userId = useSelector((state) => state.auth.userid);
  const projects = useSelector((state) => state.projects.project_list);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects(userId));
  }, [dispatch, userId]);

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {projects.map((project) => (
          <Card
            key={project.id}
            className="mx-4 rounded-lg bg-white shadow-xl border-2 my-2 cursor-default"
            title={
              <span className="flex items-center text-3xl font-bold">
                <img
                  width="32"
                  height="32"
                  src={`https://ui-avatars.com/api/?background=random&name=${project.name}`}
                  alt="checklist--v2"
                  className="rounded-lg shadow mr-4"
                />
                {project.name}
              </span>
            }
            style={{ width: 600 }}
          >
            <p className="py-1 text-sm">{`Description: ${project.description}`}</p>
            <p className="py-1 text-sm">{`Team: ${project.team}`}</p>
            <p className="py-1 text-sm">{`Start Date: ${project.start_date}`}</p>
            <p className="py-1 text-sm">{`End Date: ${project.end_date}`}</p>
          </Card>
      ))}
    </div>
  );
};

export default ProjectsView;
