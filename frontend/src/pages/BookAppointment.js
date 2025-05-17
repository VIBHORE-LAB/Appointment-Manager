import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const BookAppointment = () => {
  const { businessId } = useParams();
  const [business, setBusiness] = useState(null);
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const location = useLocation();

  // Load business details on component mount
  useEffect(() => {
    if (location.state?.business) {
      setBusiness(location.state.business);
    } else {
      console.log("Business details not found");
    }
  }, [location.state]);

  const generateDateRange = () => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 4; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split("T")[0]); // Ensure date is in a string format
    }
    return dates;
  };

  const availableDates = generateDateRange();

  useEffect(() => {
    if (!selectedDate) {
      setSlots([]); // Clear slots if no date is selected
      return;
    }

    const fetchSlots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/slots/${businessId}/${selectedDate}`
        );
        console.log("API response:", response.data);

        // Filter slots for today's date
        const today = new Date().toISOString().split("T")[0];
        if (selectedDate === today) {
          const currentTime = new Date();
          const filteredSlots = response.data.availableSlots.filter((slot) => {
            const slotTime = new Date(`${selectedDate}T${slot.time}`);
            return slotTime - currentTime > 2 * 60 * 60 * 1000; // 2 hours in milliseconds
          });
          setSlots(filteredSlots);
        } else {
          setSlots(response.data.availableSlots || []); // No filtering for future dates
        }
      } catch (err) {
        console.error("Error fetching slots:", err);
        setSlots([]); // Set empty slots on error
      }
    };

    fetchSlots();
  }, [selectedDate, businessId]);

  const handleDateSelect = (date) => {
    setSelectedDate(date); // Set the selected date
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot); // Set the selected slot
  };

  const handleBookAppointment = async () => {
    if (!selectedDate || !selectedSlot) {
      alert("Please select a date and time");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:5000/api/appointments/book/${businessId}`,
        { date: selectedDate, time: selectedSlot },
        { withCredentials: true }
      );
      alert("Appointment Booked successfully");
      console.log("Appointment Booked successfully", response.data);
      navigate("/user/dashboard"); // Redirect to the dashboard after booking
    } catch (err) {
      console.error("Error booking appointment:", err);
    }
  };

  // Make sure business is loaded before rendering anything else
  if (!business) {
    return <div>Loading...</div>; // Fallback loading screen while business data loads
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex flex-col">
        <div className="max-w-6xl mx-auto mt-12">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-16">
            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3">
                <img
                  className="h-56 md:h-80 w-full object-cover"
                  src={business.imageUrl}
                  alt={business.name}
                />
              </div>

              {/* Business Info */}
              <div className="p-8 md:w-2/3">
                <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
                <p className="mt-4 text-gray-600 leading-relaxed">{business.description}</p>
                <p className="mt-2 text-gray-600">{business.address}</p>
              </div>
            </div>
          </div>

          {/* Appointment Booking Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gray-800 h-32 pt-3 text-white">
              <h2 className="text-4xl font-bold px-4 mt-6">Book an Appointment</h2>
              <p className="text-white-600 font-semibold px-4">
                Select Date and Time from the available options
              </p>
            </div>

            {/* Date Selection */}
            <div className="pb-6 px-10">
              <h2 className="text-2xl font-semibold pt-10 text-gray-800">Available Dates:-</h2>
              <div className="flex space-x-4 overflow-x-auto pb-4 pt-6">
                {availableDates.map((date, index) => (
                  <button
                    key={index}
                    onClick={() => handleDateSelect(date)}
                    className={`w-32 p-4 rounded-xl border-2 transition-all duration-200 
                      ${selectedDate === date ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-blue-300"}`}
                  >
                    <div className="text-center">
                      <div className={`text-sm font-medium ${selectedDate === date ? "text-blue-600" : "text-gray-600"}`}>
                        {new Date(date).toLocaleDateString("en-US", { weekday: "short" })}
                      </div>
                      <div className="text-2xl font-bold text-gray-800 my-1">
                        {new Date(date).toLocaleDateString("en-US", { day: "numeric" })}
                      </div>
                      <div className="text-sm text-gray-600">
                        {new Date(date).toLocaleDateString("en-US", { month: "short" })}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Slot Selection */}
            {selectedDate && (
              <div className="px-10">
                <h2 className="text-2xl font-semibold mb-4 pt-10 text-gray-800">Available Slots:-</h2>
                {slots.length === 0 ? ( // Check if no slots are available
                  <h2 className="text-xl text-gray-600">No more slots available for today.</h2>
                ) : (
                  <div className="flex flex-wrap gap-4">
                    {slots.map((slot, index) => (
                      <button
                        key={index}
                        onClick={() => slot.status === "available" && handleSlotSelect(slot.time)}
                        className={`px-4 py-2 rounded-xl border-2 transition-all duration-200 
                          ${slot.status === "booked" ? "border-gray-400 text-gray-500 opacity-50 cursor-not-allowed" :
                          selectedSlot === slot.time ? "border-green-500 bg-green-50" : "border-green-400 hover:border-green-700 text-green-600"}`}
                        disabled={slot.status === "booked"}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Book Appointment Button */}
            <div className="mt-6 px-10 pb-6">
              <button
                onClick={handleBookAppointment}
                className="w-full py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-950"
                disabled={!selectedDate || !selectedSlot}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default BookAppointment;