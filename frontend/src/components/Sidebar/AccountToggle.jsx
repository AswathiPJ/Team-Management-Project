import { useSelector } from "react-redux";

const AccountToggle = () => {
  const status = useSelector((state) => state.auth.status);
  const username = useSelector((state) => state.auth.username);
  const email = useSelector((state) => state.auth.email);

  return (
    <div className="border-b-2 border-dashed mb-4 mt-2 pb-4 border-stone-300">
      {status === "succeeded" ? (
        <span className="flex p-0.5 rounded transition-colors relative gap-2 w-full items-center cursor-default">
          <img
            width="64"
            height="64"
            src={`https://ui-avatars.com/api/?background=random&name=${username}`}
            alt="checklist--v2"
            className="size-8 rounded shrink-0 shadow bg-violet-500"
          />
          <div className="text-start">
            <span className="text-lg font-semibold block">{username}</span>
            <span className="text-xs block">{email}</span>
          </div>
        </span>
      ) : (
        <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
          <img
            width="64"
            height="64"
            src="https://api.dicebear.com/9.x/notionists/svg"
            alt="checklist--v2"
            className="size-8 rounded shrink-0 shadow bg-violet-500"
          />
          <div className="text-start">
            <span className="text-lg font-semibold block">TeamManagement</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default AccountToggle;
