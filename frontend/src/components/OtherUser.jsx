import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../features/authSlice";

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const selectedUser = useSelector((state) => state.auth.selectedUser);

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
        } flex gap-2 items-center rounded p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600`}
      >
        <div className="relative w-12 h-12 rounded-full bg-gray-400 dark:bg-gray-600 overflow-hidden">
          <img src={user?.profilePhoto} alt="user-profile" className="w-full h-full object-cover" />
          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
        </div>
        <div className="flex flex-col flex-1">
          <p>{user?.name}</p>
        </div>
      </div>
      <div className="border-b border-gray-300 dark:border-gray-600"></div>
    </>
  );
};

export default OtherUser;
