import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import UserDashboard from "./UserDashboard";
import ManagerDashboard from "./ManagerDashboard";

const Dashboard = () => {
  const navigate = useNavigate();
  const { businessId } = useParams(); // Get businessId from the URL
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/check-auth", { withCredentials: true })
      .then((response) => {
        console.log("Dashboard Auth Response:", response.data);
        if (!response.data.authenticated) {
          navigate("/log-in");
        } else {
          setUser(response.data.user);
          console.log("User Data:", response.data.user); // Check if businessId is present
        }
      })
      .catch(() => navigate("/log-in"))
      .finally(() => setLoading(false));
  }, [navigate]);

  // Show loading message while waiting for user data
  if (loading) return <p>Loading dashboard...</p>;

  // Fallback if user data is not present
  if (!user) return <p>Error: User not found</p>;

  // Logic to determine which dashboard to render
  if (user.role === "Manager" && businessId) {
    // Render ManagerDashboard if the user is a manager and businessId is present
    return <ManagerDashboard user={user} />;
  } else {
    // Render UserDashboard for all other cases
    return <UserDashboard user={user} />;
  }
};

export default Dashboard;