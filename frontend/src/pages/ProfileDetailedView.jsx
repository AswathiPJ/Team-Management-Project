import { useParams } from "react-router-dom";
import { TopBar } from "../components/Dashboard/TopBar";
import { useSelector} from "react-redux";
import { useState ,useEffect } from "react";
import { Card } from "antd";
import axios from "axios";

export const ProfileDetailedView = () => {
  const userId = useSelector(
    (state) => state.auth.userid
  );

  const [profile, setProfile] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    if (userId) {  
      axios.get(`http://localhost:8000/profiles/team-members/`, { params: { id: userId } })
        .then(response => {
          console.log(response.data[0])
          setProfile(response.data[0]);
        })
        .catch(error => {
          setError(error);
          console.error('Error fetching profile details:', error);
        });
    }
  }, [userId]);

  const isProfileLoaded = profile && Object.keys(profile).length > 0;

 


  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      { isProfileLoaded ?  (
        <Card
          className="mx-4 rounded-lg bg-white shadow-xl border-2"
          title={
            <span className="flex items-center text-3xl font-bold">
              <img
                width="32"
                height="32"
                src={`https://ui-avatars.com/api/?background=random&name=${profile.username}`}
                alt="checklist--v2"
                className="rounded-lg shadow mr-4"
              />
              {profile.username}
            </span>
          }
          style={{ width: 600 }}
        >
          <p className="py-1 text-sm">{`Username: ${profile.username}`}</p>
          <p className="py-1 text-sm">{`Designation: ${profile.designation}`}</p>
          <p className="py-1 text-sm">{`Address: ${profile.address}`}</p>
          <p className="py-1 text-sm">{`Contact: ${profile.contact_no}`}</p>
          <p className="py-1 text-sm">{`DOB: ${profile.date_of_birth}`}</p>
          <p className="py-1 text-sm">{`Email: ${profile.email}`}</p>
          <p className="py-1 text-sm">{`Joined date: ${profile.joining_date}`}</p>
          <p className="py-1 text-sm">{`Timezone: ${profile.timezone}`}</p>
        </Card>
      ) : (
        <div className="flex justify-center items-center h-48">
          <span className="text-center loading loading-bars loading-lg"></span>
        </div>
      )}
    </div>
  );
      

};
