    import React, { useEffect, useState } from 'react';
    import Pagination from './Pagination';
    import Filter from './Filter'; 

    
    const ProductList = ({ searchTerm }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        categories: [],
        brands: [],
        tags: [],
    });
    const [selectedFilters, setSelectedFilters] = useState({
        category: '',
        brand: '',
        availability: '',
        priceRange: '',
        tag: '',
    });

    const itemsPerPage = 10;

    useEffect(() => {
        fetch('/data.json')
        .then((response) => response.json())
        .then((data) => {
            setProducts(data);

            // Extract unique filter options from products
            const uniqueCategories = [...new Set(data.map((p) => p.product_category))];
            const uniqueBrands = [...new Set(data.map((p) => p.product_brand))];
            const uniqueTags = [...new Set(data.flatMap((p) => p.product_tags))];

            setFilters({
            categories: uniqueCategories,
            brands: uniqueBrands,
            tags: uniqueTags,
            });
        })
        .catch((error) => console.error('Error fetching the data:', error));
    }, []);


        // Reset current page when searchTerm changes
        useEffect(() => {
            setCurrentPage(1);
        }, [searchTerm]);

        
    const handleFilterChange = (updatedFilters) => {
        setSelectedFilters(updatedFilters);
        setCurrentPage(1); // Reset to page 1 when filters change
    };

    const applyFilters = (product) => {
        const matchesSearch = product.product_name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesAvailability =
        selectedFilters.availability === '' ||
        (selectedFilters.availability === 'true' && product.product_availability) ||
        (selectedFilters.availability === 'false' && !product.product_availability);

        const matchesCategory =
        selectedFilters.category === '' || product.product_category === selectedFilters.category;

        const matchesBrand =
        selectedFilters.brand === '' || product.product_brand === selectedFilters.brand;

        const matchesPrice =
        selectedFilters.priceRange === '' ||
        (selectedFilters.priceRange === '0-50' && product.product_price < 50) ||
        (selectedFilters.priceRange === '50-200' && product.product_price >= 50 && product.product_price < 200) ||
        (selectedFilters.priceRange === '200-500' && product.product_price >= 200 && product.product_price < 500) ||
        (selectedFilters.priceRange === '500-1000' && product.product_price >= 500 && product.product_price < 1000) ||
        (selectedFilters.priceRange === '1000+' && product.product_price >= 1000);

        const matchesTag =
        selectedFilters.tag === '' || product.product_tags.includes(selectedFilters.tag);

        return (
        matchesSearch &&
        matchesAvailability &&
        matchesCategory &&
        matchesBrand &&
        matchesPrice &&
        matchesTag
        );
    };

    const filteredProducts = products.filter(applyFilters);

    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    return (
        <div className="p-4">

        {/* Render Filter Component */}
        <Filter filters={filters} onFilterChange={handleFilterChange} />
        <h1 className="text-6xl font-bold mb-6">Product List</h1>

        {filteredProducts.length === 0 ? (
            <p>No products found.</p>
        ) : (
            <>
            <div className="grid grid-cols-1 sm:grid-cols-2s md:grid-cols-3 lg:grid-cols-4 gap-6">
                {currentProducts.map((product) => (
                 <div
                 key={product.product_sku}
                 className="bg-cyan-100 shadow-md rounded-lg p-4 transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-cyan-300"
             >
                    <img
                    src={product.product_image_url}
                    alt={product.product_name}
                    className="w-full h-40 object-fit rounded-md mb-4"
                    />
                    
                    {/* <p className="text-sm text-gray-500">ID: {product.product_sku}</p> */}
                    <h2 className="text-2xl  font-semibold">{product.product_name}</h2>
                    <p className="text-3xl font-bold text-green-600">
                    ${product.product_price.toFixed(2)}
                    </p>
                    <p className="text-gray-700 ">{product.product_description}</p>
                    
                    <p className="text-lg text-gray-500">Category: {product.product_category}</p>
                    <p className="text-lg text-gray-500">Brand: {product.product_brand}</p>
                    <p className="text-lg text-gray-500">Rating: {product.product_rating} ⭐</p>
                    <p
                    className={`text-xl ${
                        product.product_availability ? 'text-green-500' : 'text-red-500'
                    }`}
                    >
                    Available :{product.product_availability ? 'Yes' : 'Currently Unavailable'}
                    </p>
                    <p className ="text-lg text-gray500"> Quantity: {product.product_quantity} </p>
                </div>
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
            </>
        )}
        </div>
    );
    };

    export default ProductList;
