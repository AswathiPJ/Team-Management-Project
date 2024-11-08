import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export const ProjectCard = ({ projects }) => {
  const [noOfTasks, setNoOfTasks] = useState({});

  useEffect(() => {
    const fetchNoOfNotesOfAllProjects = async () => {
      const promises = projects.map((project) =>
        axios.get(`http://localhost:8000/projects/tasks/?project=${project.id}`)
      );

      try {
        const results = await Promise.all(promises);
        const taskCounts = {};
        results.forEach((result) => {
          if (result.data && result.data.length > 0) {
            result.data.forEach((task) => {
              const projectId = task.project.id;
              taskCounts[projectId] = (taskCounts[projectId] || 0) + 1;
            });
          }
        });
        setNoOfTasks(taskCounts)
      } catch (error) {
        console.error("Error fetching project tasks:", error);
      }
    };

    fetchNoOfNotesOfAllProjects();
  }, [projects]);

  return (
    <>
      <div className="grid grid-cols-2">
        {projects.map((project) => (
          <div key={project.id} className="mx-2 my-1 border rounded">
            <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
              <img
                width="64"
                height="64"
                src={`https://ui-avatars.com/api/?background=random&name=${project.name}`}
                alt="checklist--v2"
                className="size-8 rounded shrink-0 shadow m-1"
              />
              <div className="text-start">
                <span className="text-sm font-semibold block">
                  {project.name}
                </span>
                <span className="text-xs block">
                  {noOfTasks[project.id] > 0
                    ? `${noOfTasks[project.id]} tasks due soon`
                    : "No task"}
                </span>
              </div>
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

ProjectCard.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      team: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      start_date: PropTypes.string,
      end_date: PropTypes.string,
    })
  ).isRequired,
};
