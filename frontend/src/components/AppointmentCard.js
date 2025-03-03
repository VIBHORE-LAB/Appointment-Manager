import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ThreeDotMenu from "./ThreeDotMenu"; // Import the ThreeDotMenu component

const AppointmentCard = ({ appointment }) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-appointment/${appointment._id}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/appointments/cancel/${appointment._id}`, {
                withCredentials: true,
            });
            window.location.reload(); // Refresh the page to reflect the deletion
        } catch (err) {
            console.error("Error Deleting Appointment:", err);
        }
    };

    const formatDate = (isoString) => {
        const date = new Date(isoString);

        const options = { month: "long", day: "numeric", year: "numeric" };
        const formattedDate = date.toLocaleDateString("en-US", options);

        // Add ordinal suffix (st, nd, rd, th)
        const day = date.getDate();
        const suffix =
            day % 10 === 1 && day !== 11
                ? "st"
                : day % 10 === 2 && day !== 12
                ? "nd"
                : day % 10 === 3 && day !== 13
                ? "rd"
                : "th";

        return formattedDate.replace(/\d+/, `${day}${suffix}`);
    };

    const formatTime = (time) => {
        // Convert time to AM/PM format
        const [hours, minutes] = time.split(":");
        const parsedHours = parseInt(hours, 10);
        const ampm = parsedHours >= 12 ? "PM" : "AM";
        const formattedHours = parsedHours % 12 || 12; // Convert to 12-hour format
        return `${formattedHours}:${minutes} ${ampm}`;
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md relative">
            {/* Position ThreeDotMenu in the top-right corner */}
            <div className="absolute top-2 right-2">
                <ThreeDotMenu onEdit={handleEdit} onDelete={() => setShowDeleteDialog(true)} />
            </div>

            <h3 className="text-xl font-semibold mb-2">
                {appointment.businessId?.name || "Unknown Name"}
            </h3>
            <a
                href={appointment.businessId?.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 mb-2 block"
            >
               📍 { appointment.businessId?.address}
            </a>
            <p className="text-gray-600 mb-2">📅 {formatDate(appointment.date)}</p>
            <p className="text-gray-600 mb-2">⏰ {formatTime(appointment.time)}</p>
            <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                    appointment.status === "Upcoming"
                        ? "bg-yellow-200 text-yellow-800"
                        : appointment.status === "Completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                }`}
            >
                {appointment.status}
            </span>

            {/* Delete confirmation dialog */}
            {showDeleteDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold mb-4">
                            Are you sure you want to delete this appointment?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteDialog(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentCard;
