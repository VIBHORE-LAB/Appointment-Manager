import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import Footer from "../components/footer";
import Cookies from 'js-cookie';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

export default function CreateBusiness() {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    contact: '',
    email: '',  
    description: '',
    address: '',
    website: '',
    ownerId: '',
    openHours: { start: '', end: '' },
    image:null,
    googleMapsUrl:"",
  });

  const [error, setError] = useState(null); // State for handling error messages
  const navigate = useNavigate();

  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "website" && value && !value.startsWith("http")) {
      value = `https://${value}`;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleTimeChange = (name, newValue) => {
    setFormData({
      ...formData,
      openHours: { ...formData.openHours, [name]: newValue.format("HH:mm") }, 
    });
  };

  const handleFileChange = (e) => {
    const file= e.target.files[0];
    setFormData({...formData,image:file});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const businessData = new FormData();
    
    // Append text fields
    businessData.append("name", formData.name);
    businessData.append("category", formData.category);
    businessData.append("contact", formData.contact);
    businessData.append("email", formData.email);
    businessData.append("description", formData.description);
    businessData.append("address", formData.address);
    businessData.append("website", formData.website);
    businessData.append("ownerId", formData.ownerId);
    businessData.append("googleMapsUrl", formData.googleMapsUrl);
    
    // Append open hours
    businessData.append("openHours", JSON.stringify(formData.openHours));

    
    // Append image file if exists
    if (formData.image) {
      businessData.append("image", formData.image);
    }
    for (let [key, value] of businessData.entries()) {
      console.log(key, value);
    }
  
    console.log('📤 Sending Request to Backend');
    console.log('Submitting:', formData);
  
    try {
      const res = await axios.post('http://localhost:5000/api/create-business', businessData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,  
      });
  
      console.log('Business Creation Successful', res.data);
      navigate('/dashboard');
    } catch (err) {
      if (err.response) {
        console.error('Business Creation Unsuccessful:', err.res.data);
        alert(`Error: ${err.res.data.message || 'An error occurred during business creation.'}`);
      } else {
        console.error('Unknown Error:', err);
        alert('An unknown error occurred.');
      }
    }
  };
  
  
  return (
    <>
    <div className='container mx-auto px-4 py-8'>
    <div className='bg-gray-800 max-w-6xl mx-auto mb-2 rounded-xl h-32 pt-3 text-white'>
    <h2 className='text-4xl font-bold mb-4 px-4 mt-6'>Upload Business Details</h2> {/* Added mt-6 to add margin-top */}
    <p className='text-white-600 mb-6 px-4'>Fill in the information about your business</p>
  </div>
      <div className='max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl'>
        
        {error && (
          <div className="text-red-600 mb-4">
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className='space-y-4'>
        
          <div>
            <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>Business Name</label>
            <input 
              id='name'
              type='text'
              name="name"  
              placeholder="Enter Your Business Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-100"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
  id="category"
  name="category"
  value={formData.category}
  onChange={handleChange}
  required
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-100"
>
  <option value="">Select Category</option>
  <option value="Restaurant">Restaurant</option> {/* PascalCase */}
  <option value="Retail">Retail</option> {/* PascalCase */}
  <option value="Service">Service</option> {/* PascalCase */}
  <option value="Healthcare">Healthcare</option> {/* PascalCase */}
  <option value="Other">Other</option> {/* PascalCase */}
</select>
          </div>

          {/* Business Description */}
          <div>
            <label htmlFor='description' className='block text-sm font-medium text-gray-700 mb-1'>Business Description</label>
            <textarea 
              id='description'
              name="description"
              placeholder="Enter Your Business's Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-100"
            />
          </div>
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Business Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
                            <label htmlFor="googleMapsUrl" className="block text-sm font-medium text-gray-700 mb-1">
                                Google Maps URL
                            </label>
                            <input
                                id="googleMapsUrl"
                                type="url"
                                name="googleMapsUrl"
                                placeholder="Enter Google Maps URL for Navigation"
                                value={formData.googleMapsUrl}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-100"
                            />
                        </div>

          {/* Contact */}
          <div>
            <label htmlFor='contact' className='block text-sm font-medium text-gray-700 mb-1'>Contact</label>
            <input 
              id='contact'
              type='text'
              name="contact"
              placeholder="Enter Contact Number"
              value={formData.contact}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-100"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
            <input 
              id='email'
              type='email'
              name="email"
              placeholder="Enter Your Business Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-100"
            />
          </div>

          {/* Website */}
          <div>
            <label htmlFor='website' className='block text-sm font-medium text-gray-700 mb-1'>Website</label>
            <input 
              id='website'
              type='url'
              name="website"
              placeholder="Enter Your Website URL"
              value={formData.website}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-100"
            />
          </div>
                    {/* Open Hours */}
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className='flex gap-4'>
              {/* Start Time Picker */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>Start Time</label>
                <TimePicker
                  value={formData.openHours.start ? dayjs(formData.openHours.start, "HH:mm") : null}
                  onChange={(newValue) => handleTimeChange("start", newValue)}
                  renderInput={(params) => <input {...params} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />}
                />
              </div>

              {/* End Time Picker */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>End Time</label>
                <TimePicker
                  value={formData.openHours.end ? dayjs(formData.openHours.end, "HH:mm") : null}
                  onChange={(newValue) => handleTimeChange("end", newValue)}
                  renderInput={(params) => <input {...params} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />}
                />
              </div>
            </div>
          </LocalizationProvider>

          {/* Address */}
          <div>
            <label htmlFor='address' className='block text-sm font-medium text-gray-700 mb-1'>Address</label>
            <textarea 
              id='address'
              name="address"
              placeholder="Enter Address"
              value={formData.address}
              onChange={handleChange}
              required
              rows='3'
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-100"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-gray-800 w-full text-white font-bold py-2 px-4 rounded mt-4 hover:bg-gray-950"
          >
            Submit
          </button>
        </form>
      </div>
      </div>
      {/* Footer */}
      <Footer />

    </>
  );
}
