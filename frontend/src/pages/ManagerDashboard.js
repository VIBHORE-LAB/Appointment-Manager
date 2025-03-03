import React, { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/footer";

const ManagerDashboard = ({ user }) => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    
    useEffect(() => {
        if (!user?.id || user.role !== "Manager") return;

        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/get-business/appointments/${user.businessId}`);
                setAppointments(response.data || []);
            } catch (err) {
                console.error("Error fetching appointments", err);
            }
        };

        fetchAppointments();
    }, [user?.id]);

    const handleAppointmentClick = (appointment) => {
        setSelectedAppointment(appointment);
    };

    // Group appointments by date
    const upcomingAppointments = appointments.reduce((acc, appt) => {
        const date = new Date(appt.date).toDateString();
        if (!acc[date]) acc[date] = [];
        acc[date].push(appt);
        return acc;
    }, {});

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
                        {Object.entries(upcomingAppointments).map(([date, appts]) => (
                            <div key={date} className="p-4 border-b">
                                <h3 className="text-lg font-semibold mb-2">{date}</h3>
                                <ul className="space-y-2">
                                    {appts.map((appointment) => (
                                        <li 
                                            key={appointment.id}
                                            className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer rounded"
                                            onClick={() => handleAppointmentClick(appointment)}
                                        >
                                            <span>{appointment.time} - {appointment.customerName}</span>
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                                appointment.status === 'Confirmed' ? 'bg-green-200 text-green-800' : 'bg-yellow-200 text-yellow-800'
                                            }`}>
                                                {appointment.status}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="w-1/2 p-4">
                        <h3 className="text-lg font-semibold mb-4">Appointment Details</h3>
                        {selectedAppointment ? (
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <p><strong>Customer:</strong> {selectedAppointment.customerName}</p>
                                <p><strong>Service:</strong> {selectedAppointment.service}</p>
                                <p><strong>Time:</strong> {selectedAppointment.time}</p>
                                <p><strong>Duration:</strong> {selectedAppointment.duration}</p>
                                <p><strong>Status:</strong> {selectedAppointment.status}</p>
                                <div className="mt-4">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600">
                                        Edit
                                    </button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
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
        <Footer />
    </div>
    
    );
};

export default ManagerDashboard;
