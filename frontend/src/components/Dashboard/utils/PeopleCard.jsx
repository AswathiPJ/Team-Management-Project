import { IoIosMore } from "react-icons/io";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PeopleCard = ({ persons }) => {
  const profileFetchStatus = useSelector((state) => state.profiles.status);
  const navigate = useNavigate();

  const handleProfileView = (userId) => {
    navigate(`/person/${userId}`);
  };

  return (
    <>
      {profileFetchStatus === "loading" ? (
        <div className="flex justify-center items-center h-52">
          <span className="text-center loading loading-bars loading-lg"></span>
        </div>
      ) : persons.length > 0 ? (
        <div className="grid grid-cols-3 gap-4 m-2">
          {persons.slice(0, 5).map((person) => (
            <div
              key={person.id}
              onClick={() => handleProfileView(person.id)}
              className="card bg-base-100 w-36 h-24 shadow-md rounded-lg cursor-pointer transition-colors hover:bg-green-300"
            >
              <figure className="mt-2">
                <img
                  src={`https://ui-avatars.com/api/?background=random&name=${person.username}`}
                  alt="avatar"
                  className="rounded-lg size-10 shadow"
                />
              </figure>
              <div className="card-body items-center text-center p-0">
                <span className="text-sm font-medium leading-none pt-1.5">
                  {person.username}
                </span>
                <span className="text-xs leading-none">{person.email}</span>
              </div>
            </div>
          ))}
          {persons.length > 5 && (
            <div className="card bg-base-100 w-36 h-24 shadow-md rounded-lg cursor-pointer transition-colors hover:bg-green-300">
              <figure className="mt-6">
                <IoIosMore />
              </figure>
              <div className="card-body items-center text-center p-0">
                <span className="text-sm font-medium leading-none pt-1.5">
                  {`Show All (${persons.length})`}
                </span>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-48">
          <p className="text-center text-gray-500 mt-4">No peoples yet.</p>
        </div>
      )}
    </>
  );
};

PeopleCard.propTypes = {
  persons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      date_of_birth: PropTypes.string,
      address: PropTypes.string,
      designation: PropTypes.string,
      joining_date: PropTypes.string,
      timezone: PropTypes.string,
      contact_no: PropTypes.string,
    })
  ).isRequired,
};
