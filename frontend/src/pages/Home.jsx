import Sidebar from "@/components/Sidebar";
import MessageContainer from "@/components/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
















// import React from "react";
// import { useGetOtherUsersQuery } from "@/features/api/authApi";
// import { useSelector } from "react-redux";

// const Home = () => {
//   const { user } = useSelector((state) => state.auth);
//   const { data: otherUsers, isLoading } = useGetOtherUsersQuery();

//   return (
//     <div className="p-4 max-w-4xl mx-auto">
//       <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
//       <div className="flex items-center space-x-4 p-4 border rounded-lg shadow-md">
//         <img
//           src={user?.profilePhoto}
//           alt={user?.name}
//           className="w-12 h-12 rounded-full"
//         />
//         <div>
//           <p className="font-semibold">{user?.name}</p>
//           <p className="text-gray-600">{user?.email}</p>
//         </div>
//       </div>
//       <h2 className="text-xl font-semibold mt-6 mb-2">Other Users</h2>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {otherUsers?.map((otherUser) => (
//             <li
//               key={otherUser._id}
//               className="p-4 border rounded-lg shadow-md flex items-center space-x-4"
//             >
//               <img
//                 src={otherUser.profilePhoto}
//                 alt={otherUser.name}
//                 className="w-10 h-10 rounded-full"
//               />
//               <div>
//                 <p className="font-semibold">{otherUser.name}</p>
//                 <p className="text-gray-600">{otherUser.email}</p>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Home ;
