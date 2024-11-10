import { useParams } from "react-router-dom";
import { TopBar } from "../components/Dashboard/TopBar";
import { useSelector, useDispatch } from "react-redux";
import { fetchSelectedProfile } from "../slices/profileSlice";
import { useEffect } from "react";
import { Card } from "antd";

export const PersonDetailedView = () => {
  const { userId } = useParams();
  const selectedProfile = useSelector(
    (state) => state.profiles.selected_profile
  );
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
        <Card
          className="mx-4 rounded-lg bg-white shadow-xl border-2"
          title={
            <span className="flex items-center text-3xl font-bold">
              <img
                width="32"
                height="32"
                src={`https://ui-avatars.com/api/?background=random&name=${selectedProfile.username}`}
                alt="checklist--v2"
                className="rounded-lg shadow mr-4"
              />
              {selectedProfile.username}
            </span>
          }
          style={{ width: 600 }}
        >
          <p className="py-1 text-sm">{`Username: ${selectedProfile.username}`}</p>
          <p className="py-1 text-sm">{`address: ${selectedProfile.address}`}</p>
          <p className="py-1 text-sm">{`Contact: ${selectedProfile.contact_no}`}</p>
          <p className="py-1 text-sm">{`DOB: ${selectedProfile.date_of_birth}`}</p>
          <p className="py-1 text-sm">{`Email: ${selectedProfile.email}`}</p>
          <p className="py-1 text-sm">{`Joined date: ${selectedProfile.joining_date}`}</p>
          <p className="py-1 text-sm">{`Timezone: ${selectedProfile.timezone}`}</p>
        </Card>
      ) : (
        //   <h1>{`Username: ${selectedProfile.username}`}</h1>
        //   <h1>{`address: ${selectedProfile.address}`}</h1>
        //   <h1>{`Contact: ${selectedProfile.contact_no}`}</h1>
        //   <h1>{`DOB: ${selectedProfile.date_of_birth}`}</h1>
        //   <h1>{`Email: ${selectedProfile.email}`}</h1>
        //   <h1>{`Joined da: ${selectedProfile.joining_date}`}</h1>
        //   <h1>{`Timezone: ${selectedProfile.timezone}`}</h1>
        <div className="flex justify-center items-center h-48">
          <span className="text-center loading loading-bars loading-lg"></span>
        </div>
      )}
    </div>
  );
};
