import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const BusinessCard = ({ business }) => {
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);
  
 

  const truncateDescription = (desc) => {
    const words = desc.split(' ');
    return words.slice(0, 30).join(' ') + (words.length > 30 ? '...' : '');
  };

  const handleDescriptionToggle = () => {
    setShowFullDescription(!showFullDescription);
  };

  const displayDescription = showFullDescription ? business.description : truncateDescription(business.description);

  return (
    <div className='bg-white rounded-lg shadow-md overflow-hidden flex flex-col'>
      <img    
        src={business.imageUrl}
        alt={business.name}
        className="w-full h-48 object-cover"
      />

      <div className='p-4 flex flex-col flex-grow'>
        <h2 className='text-xl font-semibold mb-2'>{business.name}</h2>

        <div className="flex-grow mb-3">
          <p className='text-gray-600 text-sm'>
            {displayDescription}
          </p>
          
          {!showFullDescription && business.description.length > 30 && (
            <button
              onClick={handleDescriptionToggle}
              className="text-blue-500 hover:underline text-sm mt-1"
            >
              Read More
            </button>
          )}
        </div>

        <div className='mb-3'>
        <a href={`mailto:${business.email}`} className="text-gray-700 text-sm">
  <span className="font-semibold">Email:</span> {business.email}
</a>
          <p className='text-gray-700 text-sm'>
            <span className='font-semibold'>Contact:</span> {business.contact}
          </p>
          <p className='text-gray-700 text-sm'>
            <span className='font-semibold'>Category:</span> {business.category}
          </p>
          <a className='text-gray-700 text-sm font-semibold' href={business.googleMapsUrl}>Address:  
            <a className='text-gray-700 font-normal' href={business.googleMapsUrl}> {business.address}</a>
          </a>
        </div>

        <div className='mb-3'>
          <p className="text-gray-700">
            <strong>Hours:</strong> {business.openHours.start} - {business.openHours.end}
          </p>
        </div>

     
        <div className="mt-auto">
          <button
            className="bg-gray-800 hover:bg-gray-950 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out w-full"
            onClick={() => navigate(`/book-appointment/${business._id}`, {state:{business}})}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BusinessCard;
