import OtherUser from "./OtherUser";

const OtherUsers = ({ users = [] }) => {
  return (
    <div className="overflow-auto flex-1">
      {users.length > 0 ? (
        users.map((user) => <OtherUser key={user._id} user={user} />)
      ) : (
        <p className="text-center text-gray-500">No users found.</p>
      )}
    </div>
  );
};

export default OtherUsers;
