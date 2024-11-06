export const TaskCard = ({ items }) => {
  return (
    <>
      {items.map((task) => (
        <div key={task.id} className="card bg-white shadow-xl rounded m-2">
          <div className="card-body p-2">
            <p className="text-sm">{task.title}</p>
            <p className="text-sm">{task.project}</p>
          </div>
        </div>
      ))}
    </>
  );
};
