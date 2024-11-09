import { MdOutlineSort } from "react-icons/md";
import { CardTitle } from "./utils/CardTitle";
import { ProjectCard } from "./utils/ProjectCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchProjects } from "../../slices/projectSlice";

export const Projects = () => {
  const userId = useSelector((state) => state.auth.userid);
  const projects = useSelector((state) => state.projects.project_list);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProjects(userId));
  }, [dispatch, userId]);

  return (
    <div className="col-span-6 rounded-lg border h-72">
      <CardTitle title={`Projects (${projects.length})`} Icon={MdOutlineSort} action="Sort" />
      <ProjectCard projects={projects.length > 8 ? projects.slice(0, 6) : projects} />
      { projects.length > 8 && (
        <div className="m-2">
          <button className="text-sm bg-stone-100 transition-colors shadow hover:bg-violet-100 p-1.5 rounded-lg w-full mt-3">
          {`Show All (${projects.length})`}
          </button>
        </div>
      )}
    </div>
  );
};
