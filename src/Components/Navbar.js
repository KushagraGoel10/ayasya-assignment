

import React, { useState } from 'react';

const Navbar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm); // Call the parent component's search function
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            window.location.reload(); // Refresh the page
          }}
          className="text-white text-2xl font-bold mr-4"
        >
          Ayasya Task
        </a>
        <form onSubmit={handleSearch} className="flex flex-grow justify-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="p-3 rounded-l-md border border-gray-300 flex-grow mr-2"
          />
          <button type="submit" className="bg-blue-700 text-white p-3 rounded-r-md">
            Search
          </button>
        </form>
        <span className="text-white text-xl font-bold ml-4">By Kushagra Goel</span>
      </div>
    </nav>
  );
};

export default Navbar;
