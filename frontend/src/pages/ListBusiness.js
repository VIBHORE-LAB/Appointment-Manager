import React, { useEffect, useState } from 'react';
import BusinessCard from '../components/BusinessCard';
import axios from 'axios';
import Footer from "../components/footer";
import Navbar from "../components/Navbar";

const ListBusiness = () => {
    const [business, setBusiness] = useState([]);
    const [filteredBusiness, setFilteredBusiness] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchBusiness = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/get-businesses");
                console.log("API Response:", response.data);
                setBusiness(response.data);
                setFilteredBusiness(response.data); // Initially show all businesses
            } catch (err) {
                console.error("Error fetching Businesses: ", err);
            }
        };

        fetchBusiness();
    }, []);

    // Function to filter based on category and name
    const filterBusinesses = () => {
        const filtered = business.filter((b) => {
            // Ensure the category is case-insensitive
            const categoryMatch = selectedCategory === '' || b.category.toLowerCase() === selectedCategory.toLowerCase();
            // Search query match (case insensitive)
            const searchMatch = b.name.trim().toLowerCase().includes(searchQuery.trim().toLowerCase());
            
            return categoryMatch && searchMatch;
        });

        console.log("Filtered businesses: ", filtered); // Debugging
        setFilteredBusiness(filtered);
    };

    // Function to handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    // Function to handle search query change
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    // Whenever category or search query changes, filter businesses
    useEffect(() => {
        filterBusinesses();
    }, [selectedCategory, searchQuery]);

    return (
        <>
            <Navbar />

            <div className='container mx-auto px-4 py-8'>
                <h1 className='text-5xl font-bold text-center mb-6'>Business Listings</h1>
                <p className='text-2xl font-normal text-left mb-10'>
                    Browse through a variety of businesses listed on this page. Choose the one that best suits your needs and easily book an appointment directly.
                </p>

                {/* Category Filter Dropdown */}
                <select
                    value={selectedCategory}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                    className="border px-4 py-2 rounded mb-4"
                >
                    <option value="">Select Category</option>
                    <option value="restaurant">Restaurant</option>
                    <option value="retail">Retail</option>
                    <option value="service">Service</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="other">Other</option>
                </select>

                {/* Search Input */}
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Search by business name..."
                    className="border px-4 py-2 rounded mb-4 w-full md:w-1/3"
                />

                {/* Display Filtered Businesses */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    {filteredBusiness.length > 0 ? (
                        filteredBusiness.map((business) => (
                            <BusinessCard key={business._id} business={business} />
                        ))
                    ) : (
                        <p>No businesses found</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default ListBusiness;
