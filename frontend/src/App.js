import {React, useState, useEffect} from 'react';

import { Route, Routes } from "react-router-dom";
import { INITIAL_ROUTE,
   SIGN_UP_ROUTE,
    LOG_IN_ROUTE, 
    USER_DASHBOARD_ROUTE,
    MANAGER_DASHBOARD_ROUTE,
     FORGOT_PASSWORD_ROUTE,
      RESET_PASSWORD_ROUTE, 
      CREATE_BUSINESS_ROUTE,
       LIST_BUSINESS_ROUTE,
        BOOK_APPOINTMENT_ROUTE,
         ABOUT_US_ROUTE,
         EDIT_APPOINTMENT_ROUTE,
        LOG_OUT_ROUTE,
        INITIAL_MANAGER_ROUTE } from "./Constants/constants";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ManagerDashboard from "./pages/ManagerDashboard";
import UserDashboard from "./pages/UserDashboard";
import Home from "./pages/Home";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasssword from "./pages/ResetPasssword";
import CreateBusiness from "./pages/CreateBusiness";
import ListBusiness from "./pages/ListBusiness";
import BookAppointment from "./pages/BookAppointment";
import AboutUs from "./pages/AboutUs";
import EditAppointment from "./pages/EditAppointment";
import LogOut from './pages/LogOut';
import InitialManagerDashboard from './pages/Initial_Manager_Dashboard';
function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setUser(true);
    }
  }, []);

  return (
    <Routes>
      <Route path={INITIAL_ROUTE} element={<Home />} />
      <Route path={SIGN_UP_ROUTE} element={<Register />} />
      <Route path={LOG_IN_ROUTE} element={<Login />} />
      <Route path={MANAGER_DASHBOARD_ROUTE} element={
        <PrivateRoute>
          <ManagerDashboard />
        </PrivateRoute>
      } />
    
      <Route path={USER_DASHBOARD_ROUTE} element={
        <PrivateRoute>
          <UserDashboard />
        </PrivateRoute>
      } />
      <Route path={FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />
      <Route path={RESET_PASSWORD_ROUTE} element={<ResetPasssword />} />
      <Route path={CREATE_BUSINESS_ROUTE} element={<CreateBusiness />} />
      <Route path={LIST_BUSINESS_ROUTE} element={<ListBusiness />} />
      <Route path={BOOK_APPOINTMENT_ROUTE} element={<BookAppointment />} />
      <Route path={ABOUT_US_ROUTE} element={<AboutUs />} />
      <Route path={EDIT_APPOINTMENT_ROUTE} element={<EditAppointment />} />
      <Route path = {LOG_OUT_ROUTE} element={<LogOut />} />
      <Route path={INITIAL_MANAGER_ROUTE} element={<InitialManagerDashboard /> } />
    </Routes>
  );
}

export default App;