
import User from "./user";
import useGetAllUsers from "../../context/userGetAllUsers";

const users = () => {
  const [allUsers, loading] = useGetAllUsers();

 

  if (!Array.isArray(allUsers)) {
    console.error("Invalid data format for allUsers:", allUsers);
    return <div>Error: Unable to load users.</div>;
  }

  if (allUsers.length === 0) {
    return <div>No users available.</div>;
  }

  return (
    <div
      style={{ maxHeight: "calc(84vh - 5vh)" }}
      className="py-2 flex-adi overflow-y-auto"
    >
      {allUsers.map((user, index) => (
        <User key={user.id || index} user={user} />
      ))}
    </div>
  );
};

export default users;
