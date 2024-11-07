import { IoIosMore } from "react-icons/io";

export const PeopleCard = ({ items }) => {
  return (
    <>
      <div className="grid grid-cols-3 gap-2 m-2 cursor-pointer">
        {items.map((person) => (
          <div
            key={person.id}
            className="card bg-base-100 w-36 h-32 shadow-md rounded"
          >
            <figure className="mt-2">
              <img
                src={`https://ui-avatars.com/api/?background=random&name=${person.name}`}
                alt="avatar"
                className="rounded-full size-10 bg-slate-600"
              />
            </figure>
            <div className="card-body items-center text-center p-0">
              <span className="text-sm font-medium leading-none pt-1.5">
                {person.name}
              </span>
              <span className="text-xs leading-none">{person.mail}</span>
            </div>
          </div>
        ))}
        <div className="card bg-base-100 w-36 h-32 shadow-md rounded cursor-pointer">
          <figure className="mt-10">
            <IoIosMore />
          </figure>
          <div className="card-body items-center text-center p-0">
            <span className="text-sm font-medium leading-none pt-1.5">
              View All
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
