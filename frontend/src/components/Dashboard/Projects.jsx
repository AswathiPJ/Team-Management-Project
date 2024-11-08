import { MdOutlineSort } from "react-icons/md";
import { CardTitle } from "./utils/CardTitle";
import { ProjectCard } from "./utils/ProjectCard";

export const Projects = () => {
  const projects = [
    { id: 1, title: "project 1", logo: "", tasks: 5},
    { id: 2, title: "project 2", logo: "", tasks: 2 },
    { id: 3, title: "project 3", logo: "", tasks: 0 },
    { id: 4, title: "project 4", logo: "", tasks: 1 },
    { id: 5, title: "project 5", logo: "", tasks: 9 },
    { id: 6, title: "project 6", logo: "", tasks: 0 },
  ]

  return (
    <div className="col-span-6 rounded border h-72">
      <CardTitle title={`Projects (${projects.length})`} Icon={MdOutlineSort} action="Sort" />
      <ProjectCard items={projects} />
      <div className="m-2 mt-2.5">
        <button className="text-sm bg-stone-100 transition-colors hover:bg-violet-100 p-1.5 rounded w-full shadow">
          Show All
        </button>
      </div>
    </div>
  );
};
