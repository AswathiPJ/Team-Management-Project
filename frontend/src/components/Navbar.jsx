import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

const NavBar = () => {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
      const access_token = Cookies.get("access_token");
      console.log(access_token);
      setIsAuth(!!access_token);
  }, []);

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
                    <li className="px-1">
                        <Link to="#">About</Link>
                    </li>
                    {isAuth ? (
                        <li className="px-1">
                            <Link to="#">Logout</Link>
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