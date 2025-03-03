import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/check-auth", { withCredentials: true }) // Ensure cookies are sent
      .then((response) => {
        console.log("Auth Response:", response.data);
        setIsAuthenticated(response.data.authenticated);
      })
      .catch((error) => {
        console.error("Auth Check Error:", error);
        setIsAuthenticated(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading authentication...</p>;
  if (!isAuthenticated) return <Navigate to="/log-in" />;

  return children;
};

export default PrivateRoute;
