import { TopBar } from "../components/Dashboard/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchProfiles } from "../slices/profileSlice";
import { useNavigate } from "react-router-dom";

const PeoplesView = () => {
  const userId = useSelector((state) => state.auth.userid);
  const profiles = useSelector((state) => state.profiles.profile_list);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProfiles(userId));
  }, [dispatch, userId]);

  const handleProfileView = (userId) => {
    navigate(`/person/${userId}`);
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="grid grid-cols-5 gap-4 p-4">
        {profiles.map((profile) => (
          <div
            key={profile.id}
            onClick={() => handleProfileView(profile.id)}
            className="card shadow-lg bg-base-100 w-36 h-24 rounded-lg cursor-pointer transition-colors hover:bg-stone-300"
          >
            <figure className="mt-2">
              <img
                src={`https://ui-avatars.com/api/?background=random&name=${profile.username}`}
                alt="avatar"
                className="rounded-lg size-10 shadow"
              />
            </figure>
            <div className="card-body items-center text-center p-0">
              <span className="text-sm font-medium leading-none pt-1.5">
                {profile.username}
              </span>
              <span className="text-xs leading-none">{profile.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeoplesView;
