import { CardTitle } from "./utils/CardTitle";
import { PeopleCard } from "./utils/PeopleCard";
import { useSelector, useDispatch } from "react-redux";
import { fetchProfiles } from "../../slices/profileSlice";
import { useEffect } from "react";

export const Peoples = () => {
  const profiles = useSelector((state) => state.profiles.profile_list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  return (
    <div className="col-span-6 rounded border h-72">
      <CardTitle title={`Peoples (${profiles.length})`} />
      <PeopleCard persons={profiles.slice(0, 5)} />
    </div>
  );
};
