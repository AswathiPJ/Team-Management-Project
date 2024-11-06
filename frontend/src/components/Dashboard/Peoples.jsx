import { CardTitle } from "./utils/CardTitle";
import { PeopleCard } from "./utils/PeopleCard";

export const Peoples = () => {
  const peoplesList = [
    { id: 1, name: "John Doe", mail: "john@gmail.com", photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Liam" },
    { id: 2, name: "Jane Smith", mail: "jane@gmail.com", photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Leo" },
    { id: 3, name: "Mike Johnson", mail: "emily@gmail.com", photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Brian" },
    { id: 4, name: "Bob M", mail: "bob@gmail.com", photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jack"},
    { id: 5, name: "David Lee", mail: "david@gmail.com", photo: "https://api.dicebear.com/9.x/adventurer/svg?seed=Easton" },
  ];

  return (
    <div className="col-span-6 rounded border h-80">
      <CardTitle title={`People (${peoplesList.length})`} />
      <PeopleCard items={peoplesList} />
    </div>
  );
};
