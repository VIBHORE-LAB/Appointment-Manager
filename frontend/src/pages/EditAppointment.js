import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";

const EditAppointment = () => {
    const { appointmentId } = useParams(); // Get appointmentId from the URL
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState(null);
    const [business, setBusiness] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");
    const [slots, setSlots] = useState([]);
    const [selectedSlot, setSelectedSlot] = useState(null);

    console.log("EditAppointment component mounted"); // Debugging log

    // Fetch appointment and business details on component mount
    useEffect(() => {
        console.log("Fetching appointment details..."); // Debugging log
        const fetchAppointmentDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/appointments/get-appointment/${appointmentId}`,
                    { withCredentials: true }
                );
                console.log("Appointment details fetched:", response.data); // Debugging log
                setAppointment(response.data);
                setSelectedDate(new Date(response.data.date).toISOString().split("T")[0]); // Pre-fill selected date
                setSelectedSlot(response.data.time); // Pre-fill selected time
                fetchBusinessDetails(response.data.businessId); // Fetch business details
            } catch (err) {
                console.error("Error fetching appointment details:", err);
            }
        };

        const fetchBusinessDetails = async (businessId) => {
            console.log("Fetching business details..."); // Debugging log
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/get-business/${businessId}`,
                    { withCredentials: true }
                );
                console.log("Business details fetched:", response.data); // Debugging log
                setBusiness(response.data);
            } catch (err) {
                console.error("Error fetching business details:", err);
            }
        };

        fetchAppointmentDetails();
    }, [appointmentId]);

    // Generate date range for the next 4 days
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

    // Fetch available slots for the selected date
    useEffect(() => {
        if (!selectedDate || !business) {
            setSlots([]); // Clear slots if no date or business is selected
            return;
        }

        const fetchSlots = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/slots/${business._id}/${selectedDate}`
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
    }, [selectedDate, business]);

    const handleDateSelect = (date) => {
        setSelectedDate(date); // Set the selected date
    };

    const handleSlotSelect = (slot) => {
        setSelectedSlot(slot); // Set the selected slot
    };

    const handleRescheduleAppointment = async () => {
        if (!selectedDate || !selectedSlot) {
            alert("Please select a date and time");
            return;
        }

        try {
            const response = await axios.put(
                `http://localhost:5000/api/appointments/reschedule/${appointmentId}`,
                { newDate: selectedDate, newTime: selectedSlot },
                { withCredentials: true }
            );
            alert("Appointment rescheduled successfully");
            console.log("Appointment rescheduled successfully", response.data);
            navigate("/dashboard"); // Redirect to the dashboard after rescheduling
        } catch (err) {
            console.error("Error rescheduling appointment:", err);
            alert(err.response?.data?.message || "Failed to reschedule appointment.");
        }
    };

    // Make sure business and appointment are loaded before rendering anything else
    if (!business || !appointment) {
        return <div>Loading...</div>; // Fallback loading screen while data loads
    }

    return (
        <>
            <Navbar />

            <div className="min-h-screen flex flex-col">
                {/* Business Details and Reschedule Section Combined */}
                <div className="max-w-6xl mx-auto mt-12">
                    <div className="bg-white rounded-xl shadow-xl overflow-hidden mb-16">
                        <div className="flex flex-col md:flex-row">
                            {/* Business Image */}
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

                    {/* Previous Appointment Details Section */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
                        <div className="bg-gray-800 h-32 pt-3 text-white">
                            <h2 className="text-4xl font-bold px-4 mt-6">Previous Appointment Details</h2>
                            <p className="text-white-600 font-semibold px-4">
                                Review your current appointment details before rescheduling
                            </p>
                        </div>

                        <div className="p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Previous Date */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Date</h3>
                                    <p className="text-gray-600">
                                        {new Date(appointment.date).toLocaleDateString("en-US", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </p>
                                </div>

                                {/* Previous Time */}
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">Time</h3>
                                    <p className="text-gray-600">{appointment.time}</p>
                                </div>

                                {/* Additional Details (if any) */}
                                {appointment.additionalDetails && (
                                    <div className="col-span-2">
                                        <h3 className="text-xl font-semibold text-gray-800">Additional Details</h3>
                                        <p className="text-gray-600">{appointment.additionalDetails}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Reschedule Appointment Section */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        <div className="bg-gray-800 h-32 pt-3 text-white">
                            <h2 className="text-4xl font-bold px-4 mt-6">Reschedule Appointment</h2>
                            <p className="text-white-600 font-semibold px-4">
                                Select a new date and time from the available options
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

                        {/* Reschedule Appointment Button */}
                        <div className="mt-6 px-10 pb-6">
                            <button
                                onClick={handleRescheduleAppointment}
                                className="w-full py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-950"
                                disabled={!selectedDate || !selectedSlot}
                            >
                                Reschedule Appointment
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

export default EditAppointment;