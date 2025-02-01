import { BiSearchAlt2 } from "react-icons/bi";
import DarkMode from "../DarkMode";
import OtherUsers from "./OtherUsers";
import { useLogoutUserMutation, useGetOtherUsersQuery } from "@/features/api/authApi";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = () => {
  const { data: otherUsers, isLoading } = useGetOtherUsersQuery();
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const [search, setSearch] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("User logged out.");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  useEffect(() => {
    if (search.trim() === "") {
      setFilteredUsers(otherUsers || []);
    } else {
      const matchedUsers = otherUsers?.filter(
        (user) => user.name && user.name.toLowerCase().includes(search.toLowerCase())
      );
      
      setFilteredUsers(matchedUsers || []);
    }
  }, [search, otherUsers]);

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    console.log(filteredUsers)
  };

  return (
    <div className="border-r border-gray-300 dark:border-gray-600 p-4 flex flex-col w-1/3 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Chat App</h1>
        <DarkMode />
      </div>

      <form className="flex items-center gap-2 mb-4" onSubmit={searchSubmitHandler}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered rounded-md w-full bg-gray-300 dark:bg-gray-700 p-2 text-black dark:text-white"
          type="text"
          placeholder="Search..."
        />
        <button type="submit" className="p-2 bg-gray-300 dark:bg-gray-700 rounded-md">
          <BiSearchAlt2 className="w-6 h-6" />
        </button>
      </form>

      <OtherUsers users={filteredUsers} />

      <button className="mt-4 bg-red-600 px-4 py-2 rounded-md" onClick={logoutHandler}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;