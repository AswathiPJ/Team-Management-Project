import AccountToggle from "./AccountToggle";
import RouteSelect from "./MenuRoutes";
import Search from "./Search";
import { Toaster } from "react-hot-toast";

const Sidebar = () => {
  return (
    <div>
      <div className="sticky top-4 h-[calc(100vh-32px-48px)]">
        <div className="flex flex-col space-y-2">
          <AccountToggle />
          <Search />
          <RouteSelect />
          <div className=" my-2 border-b-2 border-dashed"></div>
        </div>
      </div>
      <Toaster position="bottom-left" reverseOrder={true} />
    </div>
  );
};

export default Sidebar;
