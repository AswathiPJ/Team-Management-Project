import { TopBar } from "../components/Dashboard/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProjects } from "../slices/projectSlice";
import { useNavigate } from "react-router-dom";

const ProjectsView = () => {
  const userId = useSelector((state) => state.auth.userid);
  const projects = useSelector((state) => state.projects.project_list);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProjects(userId));
  }, [dispatch, userId]);

  const handleProjectView = (projectId) => {
    navigate(`/project/${projectId}`)
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {projects.map((project) => (
        <div key={project.id} className="m-4 border-2 cursor-pointer" onClick={() => handleProjectView(project.id)}>
          <p>{`title: ${project.name}`}</p>
          <p>{`team: ${project.team}`}</p>
          <p>{`description: ${project.description}`}</p>
          <p>{`start_date: ${project.start_date}`}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectsView;
