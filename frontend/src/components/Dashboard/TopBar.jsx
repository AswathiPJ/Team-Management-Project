import { CgProfile } from "react-icons/cg";
import {
  MdOutlineLogout,
  MdOutlineLogin,
  MdOutlineSettings,
  MdHelpOutline,
  MdOutlineFeedback,
} from "react-icons/md";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const TopBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const status = useSelector((state) => state.auth.status);
  const username = useSelector((state) => state.auth.username);
  const email = useSelector((state) => state.auth.email);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="px-4 mb-4 mt-2 pb-4">
      <div className="flex items-center justify-between p-0.5">
        <div>
          {status === "succeeded" ? (
            <>
              <span className="flex p-1 rounded-lg transition-colors relative gap-2 items-center cursor-default">
                <img
                  width="64"
                  height="64"
                  src={`https://ui-avatars.com/api/?background=random&name=${username}`}
                  alt="checklist--v2"
                  className="size-8 rounded-lg shrink-0 shadow"
                />
                <div className="text-start">
                  <span className="text-lg font-semibold block">
                    {username}
                  </span>
                  <span className="text-xs block">{email}</span>
                </div>
              </span>
            </>
          ) : (
            <>
              <span className="text-sm font-bold block">Not Signed In</span>
            </>
          )}
        </div>
        <button
          className={`flex text-sm items-center gap-2 ${
            isMenuOpen ? "bg-violet-100" : "bg-stone-100"
          } transition-colors hover:bg-violet-100 px-3 py-1.5 rounded-lg`}
          onClick={toggleMenu}
        >
          <MdOutlineSettings />

          <span>Settings</span>
        </button>

        {isMenuOpen && (
          <div ref={menuRef} className="absolute top-9 right-0 m-8 z-50 ">
            <ul className="menu bg-base-200 rounded-lg w-56">
              <li>
                <a
                  href="#"
                  className="flex text-sm items-center gap-2 transition-colors px-3 py-1.5 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CgProfile />
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex text-sm items-center gap-2 transition-colors px-3 py-1.5 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MdHelpOutline />
                  <span>Help</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex text-sm items-center gap-2 transition-colors px-3 py-1.5 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MdOutlineFeedback />
                  <span>Leave a feedback</span>
                </a>
              </li>
              <div className="w-full border-t-2 border-gray-300 border-dashed my-1 "></div>
              <li>
                <Link
                  to={status === "succeeded" ? "/logout" : "/login"}
                  className="flex text-sm items-center gap-2 transition-colors px-3 py-1.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {status === "succeeded" ? (
                    <>
                      <MdOutlineLogout className="text-red-500" />
                      <span className=" text-red-500">Sign Out</span>
                    </>
                  ) : (
                    <>
                      <MdOutlineLogin className="text-green-500" />
                      <span className="text-green-500">Sign In</span>
                    </>
                  )}
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
