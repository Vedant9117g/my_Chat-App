import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, School } from "lucide-react";
import { toast } from "sonner";
import { useLogoutUserMutation } from "@/features/api/authApi";
import DarkMode from "@/DarkMode";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "User logged out.");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b dark:border-gray-800 border-gray-200 z-10 flex items-center justify-between px-6">
      {/* Left Side: Logo */}
      <div className="flex items-center gap-2">
        <School size={30} />
        <Link to="/" className="font-extrabold text-2xl">
          MY Chats
        </Link>
      </div>

      {/* Right Side: Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        {user ? (
          <div className="relative">
            <button
              className="flex items-center gap-2 focus:outline-none"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <img
                src={user?.profilePhoto || "https://github.com/shadcn.png"}
                alt="User"
                className="w-10 h-10 rounded-full border"
              />
            </button>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-md rounded-md py-2">
               
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Profile
                </Link>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Log out
                </button>

                
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 border rounded-md text-gray-700 dark:text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => navigate("/login")}
            >
              Signup
            </button>
          </div>
        )}
        <DarkMode />
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 rounded-md focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white dark:bg-gray-900 shadow-md p-4 flex flex-col gap-4 md:hidden">
          <Link to="/profile" className="block text-gray-700 dark:text-gray-300">
            Profile
          </Link>
          <button onClick={logoutHandler} className="text-left text-gray-700 dark:text-gray-300">
            Log out
          </button>
          
          <DarkMode />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
