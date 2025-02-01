import Messages from "@/components/Messages";
import SendInput from "@/components/SendInput";
import { useSelector } from "react-redux";

const MessageContainer = () => {
  const selectedUser = useSelector((state) => state.auth.selectedUser);

  if (!selectedUser) {
    return <p className="p-4 text-center">Select a user to chat</p>;
  }

  return (
    <div className="flex flex-col flex-1 bg-gray-100 dark:bg-gray-800 text-black dark:text-white">
      {/* ✅ Selected User Info */}
      <div className="flex items-center bg-gray-300 dark:bg-gray-700 p-3">
        <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600">
          <img
            src={selectedUser?.profilePhoto}
            alt="user-profile"
            className="w-full h-full object-cover"
          />
        </div>
        <p className="ml-3 text-lg">{selectedUser?.name}</p>
      </div>

      <Messages />
      <SendInput />
    </div>
  );
};

export default MessageContainer;
