import React from 'react';
import { ShoppingBag, Moon, Sun, Menu } from 'lucide-react';

interface HeaderProps {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleTheme }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer group">
            <ShoppingBag className="h-8 w-8 text-primary group-hover:text-primaryDark transition-colors" />
            <div className="ml-2 flex flex-col">
              <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight leading-none">
                Moda<span className="text-primary">Flex</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">
                Edivina Company
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
              aria-label="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            </button>
            
            <button className="p-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors md:hidden">
                <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;