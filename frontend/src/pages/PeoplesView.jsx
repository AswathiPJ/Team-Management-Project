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
    dispatch(fetchProfiles());
  }, [dispatch, userId]);

  const handleProfileView = (userId) => {
    navigate(`/person/${userId}`)
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {profiles.map((profile) => (
        <div key={profile.id} className="m-4 border-2 cursor-pointer" onClick={() => handleProfileView(profile.id)}>
          <p>{profile.username}</p>
          <p>{profile.email}</p>
          <p>{profile.designation}</p>
        </div>
      ))}
    </div>
  );
};

export default PeoplesView;
