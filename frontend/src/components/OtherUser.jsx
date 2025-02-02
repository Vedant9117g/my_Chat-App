import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../features/authSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector((state) => ({
    selectedUser: state.auth.selectedUser,
    onlineUsers: state.auth.onlineUsers,
  }));

  // Convert object to array & check if user is online
  const onlineUserIds = Object.values(onlineUsers || {}); // Convert object to array
  const isOnline = onlineUserIds.includes(user._id);

  const selectUserHandler = () => {
    console.log(user);
    dispatch(setSelectedUser(user)); // ✅ Pass user as payload
  };

  return (
    <>
      <div
        onClick={selectUserHandler}
        className={`${
          selectedUser?._id === user?._id ? "bg-zinc-200 text-black" : "text-white"
        } flex gap-3 items-center rounded-lg p-3 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200`}
      >
        <div className="relative w-14 h-14 rounded-full bg-gray-400 dark:bg-gray-600 overflow-hidden">
          {/* User Profile Image */}
          <img src={user?.profilePhoto} alt="user-profile" className="w-full h-full object-cover" />

          {/* Online Status Indicator */}
          {isOnline && (
            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-gray-800 rounded-full shadow-md"></span>
          )}
        </div>

        <div className="flex flex-col flex-1">
          <p className="text-lg font-medium">{user?.name}</p>
        </div>
      </div>

      <div className="border-b border-gray-300 dark:border-gray-600"></div>
    </>
  );
};

export default OtherUser;
