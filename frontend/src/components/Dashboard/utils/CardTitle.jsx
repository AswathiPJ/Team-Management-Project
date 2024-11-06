export const CardTitle = ({ title, Icon, action }) => {
  return (
    <div className="border-b-2 border-dashed m-2 pb-2 border-gray-300">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-bold block">{title}</span>
        </div>
        <div>
          {Icon && (
            <button
              className={`flex text-sm items-center gap-2 bg-stone-100 transition-colors hover:bg-violet-100 px-3 py-1.5 rounded`}
            >
              <Icon />
              {action}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
