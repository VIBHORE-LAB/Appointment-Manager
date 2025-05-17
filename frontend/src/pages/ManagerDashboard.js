import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer";

const ManagerDashboard = ({ user }) => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = async () => {
        if (!selectedAppointment) return;

        try {
            await axios.delete(`http://localhost:5000/api/appointments/cancel/${selectedAppointment._id}`, {
                withCredentials: true,
            });
            setAppointments((prevAppointments) =>
                prevAppointments.filter((appt) => appt._id !== selectedAppointment._id)
            );
            setSelectedAppointment(null); // Clear selection
            setShowDeleteDialog(false);  // Close the confirmation dialog
        } catch (err) {
            console.error("Error Deleting Appointment:", err.response?.data || err);
        }
    };

    useEffect(() => {
        if (!user?.id || user.role !== "Manager") return;

        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/get-business/appointments/${user.businessId}`);
                setAppointments(response.data || []);
            } catch (err) {
                console.error("Error fetching appointments:", err.response?.data || err);
            }
        };

        fetchAppointments();
    }, [user?.id]);

    const handleAppointmentClick = (appointment) => {
        setSelectedAppointment(appointment);
    };

    // Group and sort appointments by date
    const upcomingAppointments = appointments.reduce((acc, appt) => {
        const date = new Date(appt.date).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(appt);
        return acc;
    }, {});

    const sortedDates = Object.keys(upcomingAppointments).sort(
        (a, b) => new Date(a) - new Date(b)
    );

    return (
        <div className="min-h-screen flex flex-col w-full bg-gray-100">
            <div className="mx-auto p-8 w-full flex-grow">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Business Manager Dashboard</h1>

                <div className="bg-white shadow w-full overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                        <h2 className="text-lg leading-6 font-medium text-gray-900">Upcoming Appointments</h2>
                    </div>
                    <div className="border-t border-gray-200 flex">
                        <div className="w-1/2 border-r">
                            {sortedDates.length === 0 ? (
                                <div className="p-4">
                                    <p className="text-gray-500 italic">No Upcoming Visitor</p>
                                </div>
                            ) : (
                                sortedDates.map((date) => (
                                    <div key={date} className="p-4 border-b">
                                        <h3 className="text-lg font-semibold mb-2">{date}</h3>
                                        <ul className="space-y-2">
                                            {upcomingAppointments[date].map((appointment) => (
                                                <li
                                                    key={appointment._id}
                                                    className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer rounded"
                                                    onClick={() => handleAppointmentClick(appointment)}
                                                >
                                                    <span>{appointment.time} - {appointment.name}</span>
                                                    <span className={`px-2 py-1 rounded-full text-xs ${
                                                        appointment.status === 'Confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                                                    }`}>
                                                        {appointment.status}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="w-1/2 p-4">
                            <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
                            {selectedAppointment ? (
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <p><strong>Customer:</strong> {selectedAppointment.name}</p>
                                    <p><strong>Service:</strong> {selectedAppointment.service}</p>
                                    <p><strong>Time:</strong> {selectedAppointment.time}</p>
                                    <p><strong>Duration:</strong> {selectedAppointment.duration}</p>
                                    <p><strong>Status:</strong> {selectedAppointment.status}</p>
                                    <div className="mt-4">
                                        <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                            onClick={() => setShowDeleteDialog(true)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">Select an appointment to view details</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            {showDeleteDialog && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <p className="text-lg font-semibold mb-4 text-center">
                            Are you sure you want to cancel this appointment?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => setShowDeleteDialog(false)}
                                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default ManagerDashboard;
