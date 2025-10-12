import React, { useState, useEffect } from "react";
// import { ReactRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";


import { CssBaseline } from "@mui/joy";
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';
import Dashboard from "./components/Dashboard.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";

import LoginPage from "./components/loginPage.jsx";


import Home from "./components/Home.jsx";
import ProductionDashboard from "./components/ProductionDashboard.jsx"

import Approvals from "./components/ApprovalScreen.jsx";
import Notifications from "./components/NotificationScreen.jsx";
import Tasks from "./components/TaskScreen.jsx";
import Ordertable from "./components/OrderTable.jsx";
import BillingPage from "./components/BillingPage.jsx";
import ApparelOrder from "./components/ApparelOrder.jsx";
import SalesOrderReport from "./components/SalesOrderReport.jsx";

import EmployeeFilter from "./components/SkplPersonnelFile/EmployeeFilter.jsx";
import ProductionStatus from "./components/Production/productionStatus.jsx";
import ConfirmationOrder from "./components/SkplPersonnelFile/confirmationOrder.jsx";
import { SalesOrder2, ServInvoice, VendorBill, StkRecpNote, StyleJobWork, ProcureOrder, StkRequestNote } from "./components/approvals/SalesOrder2.jsx";
import AppointmentOrder from "./components/SkplPersonnelFile/AppoinmentOrder.jsx";

import { AuthProvider } from "./AuthContext.jsx";


const joyTheme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: { 500: '#1976d2' },
        background: { body: '#f5f7fa', surface: '#ffffff' },
        text: { primary: '#263238', secondary: '#546E7A' },
      },
    },
  },
  fontFamily: {
    body: '"Roboto", "Segoe UI", "Arial", sans-serif',
  },
  shape: { borderRadius: 8 },
});

// Protected Route
const ProtectedRoute = ({ children, auth }) => {
  return auth ? children : <Navigate to="/login" replace />;
};

// Public Route
const PublicRoute = ({ children, auth }) => {
  // return auth ? <Navigate to="/dashboard" replace /> : children;
  return auth ? <Navigate to="/" replace /> : children;
};

export default function App() {
  // const [auth, setAuth] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [auth, setAuth] = useState(() => !!localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // const auth = !!token;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuth(true);
    }
  }, []);


  // const handleLogin = (token, userData) => {
  //   localStorage.setItem("token", token);
  //   setAuth(true);
  //   setUser(userData);
  // };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   setAuth(false);
  //   setUser(null);
  // };

  // const handleLogin = (token, userData) => {
  //   localStorage.setItem("token", token);
  //   localStorage.setItem("userdata", userData);
  //   setAuth(true);
  //   setUser(userData);
  //   setToken(token);
  // };

  const handleLogin = ({ user, token }) => {
    console.log("handleLogin called with:", user, token);
    setUser(user);
    setToken(token);
    setAuth(true);          // <-- Add this line
    localStorage.setItem("token", token);
    localStorage.setItem("name", user?.name || '!name');
    localStorage.setItem("email", user?.email || '!email ');
  };



  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("email")
    setAuth(false);
    setUser(null);
    setToken(null);
  };

  const apiUrl = import.meta.env.VITE_API_URL;
  const salesOrderss = `${apiUrl}/sales-order`;
  // const SalesOrder2apiUrl = `http://localhost:3000/api/salesOrder2`;


  return (
    <AuthProvider value={{ user, token, onLogout: handleLogout }}>
      <CssVarsProvider theme={joyTheme}>
        <CssBaseline />
        <Router>
          {/* <Header toggleSidebar={toggleSidebar} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} /> */}
          {/* <Sidebar /> */}
          <Routes>
            {/* Public routes */}
            <Route
              path="/login"
              element={
                <PublicRoute auth={auth}>
                  <LoginPage onLogin={handleLogin} />
                </PublicRoute>
              }
            />

            {/* Protected routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute auth={auth}>
                  <Home user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/p"
              element={
                <ProtectedRoute auth={auth}>
                  <ProductionDashboard user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute auth={auth}>
                  <Dashboard user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/salesorder2"
              element={
                <ProtectedRoute auth={auth}>
                  <SalesOrder2 apiEndpoint={salesOrderss} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/servInvoice"
              element={
                <ProtectedRoute auth={auth}>
                  <ServInvoice apiEndpoint={salesOrderss} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/VendorBill"
              element={
                <ProtectedRoute auth={auth}>
                  <VendorBill />
                </ProtectedRoute>
              }
            />


            <Route
              path="/StkRecpNote"
              element={
                <ProtectedRoute auth={auth}>
                  <StkRecpNote />
                </ProtectedRoute>
              }
            />


            <Route
              path="/StyleJobWork"
              element={
                <ProtectedRoute auth={auth}>
                  <StyleJobWork />
                </ProtectedRoute>
              }
            />


            <Route
              path="/ProcureOrder"
              element={
                <ProtectedRoute auth={auth}>
                  <ProcureOrder />
                </ProtectedRoute>
              }
            />


            <Route
              path="/stkRequestNote"
              element={
                <ProtectedRoute auth={auth}>
                  <StkRequestNote />
                </ProtectedRoute>
              }
            />


            <Route
              path="/approvals"
              element={
                <ProtectedRoute auth={auth}>
                  <Approvals user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/notifications"
              element={
                <ProtectedRoute auth={auth}>
                  <Notifications user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/tasks"
              element={
                <ProtectedRoute auth={auth}>
                  <Tasks user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/billing"
              element={
                <ProtectedRoute auth={auth}>
                  <BillingPage user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/apparel-order"
              element={
                <ProtectedRoute auth={auth}>
                  <ApparelOrder user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/salesorderreport"
              element={
                <ProtectedRoute auth={auth}>
                  <SalesOrderReport apiUrl={salesOrderss} user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/SKPL-Personnel-File"
              element={
                <ProtectedRoute auth={auth}>
                  <EmployeeFilter user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/productionStatus"
              element={
                <ProtectedRoute auth={auth}>
                  <ProductionStatus user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            <Route path="confirmation-order" element={
              <ProtectedRoute auth={auth}>
                <ConfirmationOrder user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            } />

            <Route path="appoinment-order" element={
              <ProtectedRoute auth={auth}>
                <AppointmentOrder user={user} onLogout={handleLogout} />
              </ProtectedRoute>
            } />

            <Route
              path="/orders"
              element={
                <ProtectedRoute auth={auth}>
                  <Ordertable user={user} onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
            {/* <Route path="*" element={<Typography>Page Not Found</Typography>} /> */}
          </Routes>
        </Router>
      </CssVarsProvider>

    </AuthProvider>
  );
};