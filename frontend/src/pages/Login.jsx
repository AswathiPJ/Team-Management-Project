import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/authSlice";
import { TopBar } from "../components/Dashboard/TopBar";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const error = useSelector((state) => state.auth.error);
  const status = useSelector((state) => state.auth.status);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "succeeded") {
      navigate("/");
    }
  }, [status, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ username, password }));
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div
        className={`card ${
          error ? "bg-red-400" : "bg-violet-400"
        } w-96 m-4 text-base font-medium rounded`}
      >
        <div className="card-body p-3">
          {error ? (
            <p>{error}</p>
          ) : (
            <p className="text-sm">Please use the following form to Sign In.</p>
          )}
        </div>
      </div>

      <div className="w-96 m-4 rounded">
        <form onSubmit={handleLogin}>
          <label className="input input-bordered rounded flex items-center gap-2 my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              className="grow"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label className="input input-bordered rounded flex items-center gap-2 my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              type="password"
              className="grow"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <button className="btn bg-violet-400 rounded p-0 text-sm" type="submit">
            {status === "loading" ? (
              <span className="loading loading-dots loading-md mx-4"></span>
            ) : (
              <span className="mx-4">Login</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
