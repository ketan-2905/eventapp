import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-purple-600">Where to go?</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-purple-600">
              Party
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              Music
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              Cinema
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              Sport
            </a>
            <a href="#" className="text-gray-600 hover:text-purple-600">
              Contacts
            </a>
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-purple-600">
              Login
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
