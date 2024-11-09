import { useParams } from "react-router-dom";
import { TopBar } from "../components/Dashboard/TopBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectedProfile } from "../slices/profileSlice";
import { useEffect } from "react";

export const PersonDetailedView = () => {
  const { userId } = useParams();
  const selectedProfile = useSelector((state) => state.profiles.selected_profile);
  const selectedProfileFetchStatus = useSelector(
    (state) => state.profiles.selected_profile_status
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSelectedProfile(userId));
  }, [dispatch, userId]);

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      {selectedProfileFetchStatus === "succeeded" ? (
        <>
          <h1>{`Username: ${selectedProfile.username}`}</h1>
          <h1>{`address: ${selectedProfile.address}`}</h1>
          <h1>{`Contact: ${selectedProfile.contact_no}`}</h1>
          <h1>{`DOB: ${selectedProfile.date_of_birth}`}</h1>
          <h1>{`Email: ${selectedProfile.email}`}</h1>
          <h1>{`Joined da: ${selectedProfile.joining_date}`}</h1>
          <h1>{`Timezone: ${selectedProfile.timezone}`}</h1>
          
        </>
      ) : (
        <div className="flex justify-center items-center h-48">
          <span className="text-center loading loading-bars loading-lg"></span>
        </div>
      )}
    </div>
  );
};
