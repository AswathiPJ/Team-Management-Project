import { Link } from "react-router-dom";
import { useSelector } from "react-redux"

const NavBar = () => {
  const status = useSelector((state) => state.auth.status);

  return (
    <div className="navbar bg-base-100 px-4">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          {/* <img src="" alt="logo" width="36" height="36" /> */}
          TeamManagement
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal">
          {status === "succeeded" ? (
            <li className="px-1">
              <Link to="/logout">Logout</Link>
            </li>
          ) : (
            <li className="px-1">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
