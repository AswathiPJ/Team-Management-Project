export const ProjectCard = ({ items }) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {items.map((project) => (
          <div key={project.id} className="mx-2 my-1 border rounded">
            <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
              <img
                width="64"
                height="64"
                src={`https://ui-avatars.com/api/?background=random&name=${project.title}`}
                alt="checklist--v2"
                className="size-8 rounded shrink-0 shadow m-1"
              />
              <div className="text-start">
                <span className="text-sm font-semibold block">
                  {project.title}
                </span>
                <span className="text-xs block">
                  {project.tasks > 0
                    ? `${project.tasks} tasks due soon`
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
