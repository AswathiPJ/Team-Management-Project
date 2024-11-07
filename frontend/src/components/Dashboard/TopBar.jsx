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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const status = useSelector((state) => state.auth.status);
  const username = useSelector((state) => state.auth.username);

  return (
    <div className="px-4 mb-4 mt-2 pb-4">
      <div className="flex items-center justify-between p-0.5">
        <div>
          {status === "succeeded" ? (
            <>
              <span className="text-sm font-bold block">
                🚀 Good morning, {username}
              </span>
              <span className="text-xs block text-stone-500">
                Tuesday, Aug 8th 2023
              </span>
            </>
          ) : (
            <span className="text-xs block text-stone-500">
              Tuesday, Aug 8th 2023
            </span>
          )}
        </div>

        <button
          className={`flex text-sm items-center gap-2 ${
            isMenuOpen ? "bg-violet-100" : "bg-stone-100"
          } transition-colors hover:bg-violet-100 px-3 py-1.5 rounded`}
          onClick={toggleMenu}
        >
          <MdOutlineSettings />

          <span>Settings</span>
        </button>

        {isMenuOpen && (
          <div ref={menuRef} className="absolute top-9 right-0 m-8 z-50 ">
            <ul className="menu bg-base-200 rounded w-56">
              <li>
                <a
                  href="#"
                  className="flex text-sm items-center gap-2 transition-colors px-3 py-1.5 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <CgProfile />
                  <span>Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex text-sm items-center gap-2 transition-colors px-3 py-1.5 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MdHelpOutline />
                  <span>Help</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex text-sm items-center gap-2 transition-colors px-3 py-1.5 rounded"
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
