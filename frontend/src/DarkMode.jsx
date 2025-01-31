import React, { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './components/ThemeProvider';

const DarkMode = () => {
  const { setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button 
        onClick={toggleDropdown} 
        className="p-2 rounded-full border-2 border-gray-300 dark:border-gray-600 relative"
      >
        <Sun className="h-6 w-6 transition-all dark:-rotate-90 dark:scale-0" />
        <span className="sr-only">Toggle theme</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-md">
          <button 
            onClick={() => setTheme("light")} 
            className="w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Light
          </button>
          <button 
            onClick={() => setTheme("dark")} 
            className="w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Dark
          </button>
          <button 
            onClick={() => setTheme("system")} 
            className="w-full px-4 py-2 text-left text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            System
          </button>
        </div>
      )}
    </div>
  );
};

export default DarkMode;
