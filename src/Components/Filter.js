import React, { useState } from 'react';

const Filter = ({ filters, onFilterChange }) => {
  const initialFilters = {
    category: '',
    brand: '',
    availability: '',
    priceRange: '',
    tag: '',
  };

  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...selectedFilters, [name]: value };
    setSelectedFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  const handleReset = () => {
    setSelectedFilters(initialFilters);
    onFilterChange(initialFilters);
  };

  return (
    <div className="flex justify-center p-4 mb-6">
      <div className="bg-gray-100 rounded-md max-w-md w-full p-4"> 
        <h2 className="text-xl font-bold mb-4 text-center">Filter Products</h2>

        {/* Category Filter */}
        <select
          name="category"
          value={selectedFilters.category}
          onChange={handleChange}
          className="p-2 border rounded-md mb-4 w-full"
        >
          <option value="">All Categories</option>
          {filters.categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Brand Filter */}
        <select
          name="brand"
          value={selectedFilters.brand}
          onChange={handleChange}
          className="p-2 border rounded-md mb-4 w-full"
        >
          <option value="">All Brands</option>
          {filters.brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Availability Filter */}
        <select
          name="availability"
          value={selectedFilters.availability}
          onChange={handleChange}
          className="p-2 border rounded-md mb-4 w-full"
        >
          <option value="">All</option>
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>

        {/* Price Range Filter */}
        <select
          name="priceRange"
          value={selectedFilters.priceRange}
          onChange={handleChange}
          className="p-2 border rounded-md mb-4 w-full"
        >
          <option value="">All Prices</option>
          <option value="0-50">$0 - $50</option>
          <option value="50-200">$50 - $200</option>
          <option value="200-500">$200 - $500</option>
          <option value="500-1000">$500 - $1000</option>
          <option value="1000+">Above $1000</option>
        </select>

        {/* Product Tag Filter */}
        <select
          name="tag"
          value={selectedFilters.tag}
          onChange={handleChange}
          className="p-2 border rounded-md mb-4 w-full"
        >
          <option value="">All Tags</option>
          {filters.tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-200 w-full"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filter;
