import AccountToggle from "./AccountToggle";
import RouteSelect from "./MenuRoutes";
import Search from "./Search";

const Sidebar = () => {
  return <div>
    <div className="overflow-y-scroll sticky top-4 h-[calc(100vh-32px-48px)]">
        <AccountToggle />
        <Search />
        <RouteSelect />
        <div className=" my-2 border-b-2 border-dashed"></div>

    </div>
  </div>;
};

export default Sidebar;
