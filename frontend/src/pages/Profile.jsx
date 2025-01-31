import React from "react";
import { useLoadUserQuery } from "@/features/api/authApi";

const Profile = () => {
  const { data, isLoading } = useLoadUserQuery();

  if (isLoading) return <h1 className="text-center text-xl">Loading Profile...</h1>;

  const user = data?.user;

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        {/* Profile Photo */}
        <div className="flex flex-col items-center">
          <img
            src={user?.profilePhoto || "https://via.placeholder.com/150"}
            alt="Profile"
            className="h-24 w-24 md:h-32 md:w-32 rounded-full border"
          />
        </div>

        {/* Profile Details */}
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900">
              Name:
              <span className="font-normal text-gray-700 ml-2">{user?.name}</span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900">
              Email:
              <span className="font-normal text-gray-700 ml-2">{user?.email}</span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
