import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import SideBar from "../components/SideBar";
import AppointmentCard from "../components/AppointmentCard";

const UserDashboard = ({ user }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(null);

    useEffect(() => {
        setIsSidebarCollapsed(true); // Default sidebar state
    }, []);

    useEffect(() => {
        if (!user || !user.id) {
            console.log("User ID is missing:", user);
            return;
        }

        const fetchAppointments = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await axios.get(
                    "http://localhost:5000/api/appointments/user/appointments",
                    { withCredentials: true }
                );
                console.log("Fetched Appointments:", response.data);
                setAppointments(response.data);
            } catch (err) {
                console.error("Error Fetching Appointments: ", err);
                setError("Failed to fetch appointments. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        fetchAppointments();
    }, [user]);

    if (isSidebarCollapsed === null) {
        return <div className="h-screen flex justify-center items-center">Loading...</div>;
    }

    // Get today's date in LOCAL TIMEZONE (Midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingAppointments = appointments.filter((appointment) => {
        try {
            if (!appointment.date) return false;
            const appointmentDate = new Date(appointment.date);
            appointmentDate.setHours(0, 0, 0, 0);
            return (
                appointment.status.trim().toLowerCase() === "upcoming" &&
                appointmentDate >= today
            );
        } catch (err) {
            console.error("Error filtering appointment:", err);
            return false;
        }
    });

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <SideBar
                    isCollapsed={isSidebarCollapsed}
                    toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                />
                <div
                    className={`flex-1 p-8 transition-all duration-300 ${
                        isSidebarCollapsed ? "ml-20" : "ml-64"
                    } bg-white border-l border-gray-200 shadow-sm`}
                >
                    <h1 className="text-3xl font-bold mb-8">Welcome, {user?.name}!</h1>
                    <h2 className="text-xl font-semibold mb-6">Your Upcoming Appointments</h2>
                    {loading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                        </div>
                    ) : error ? (
                        <p className="text-red-500 mb-6">{error}</p>
                    ) : upcomingAppointments.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {upcomingAppointments.map((appointment) => (
                                <AppointmentCard key={appointment._id} appointment={appointment} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500">No upcoming appointments.</p>
                    )}
                </div>
            </div>
            <div className="mt-8">
                <Footer />
            </div>
        </div>
    );
};

export default UserDashboard;
