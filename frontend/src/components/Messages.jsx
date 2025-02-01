import Message from "./Message";
import { useSelector } from "react-redux";
import { useGetMessagesQuery } from "@/features/api/conversationApi";

const Messages = () => {
  const selectedUser = useSelector((state) => state.auth.selectedUser);
  const { data: messages, isLoading } = useGetMessagesQuery(selectedUser?._id, { skip: !selectedUser });

  if (!selectedUser) {
    return <p className="p-4 text-center">Select a user to start chatting</p>;
  }

  return (
    <div className="flex-1 overflow-auto p-4 space-y-2 bg-gray-100 dark:bg-gray-900">
      {isLoading ? (
        <p className="text-center">Loading messages...</p>
      ) : (
        messages?.map((msg) => <Message key={msg._id} message={msg} />)
      )}
    </div>
  );
};

export default Messages;
