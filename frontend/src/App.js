// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Footer from './components/Footer'; // <-- Import Footer component
import './App.css';

// --- Auth Protector Components ---
const AuthLayout = () => {
  const token = localStorage.getItem('token');
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

const ProtectedLayout = () => {
  const token = localStorage.getItem('token');
  return token ? <Outlet /> : <Navigate to="/login" />;
};


// --- Main App Component ---
function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main className="container" style={{ flex: 1 }}>
          <Routes>
            {/* Routes for users who are NOT logged in */}
            <Route element={<AuthLayout />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>

            {/* Routes for users who ARE logged in */}
            <Route element={<ProtectedLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            
            {/* Default Route */}
            <Route path="/" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
        <Footer /> {/* <-- Add Footer component here */}
      </div>
    </Router>
  );
}

export default App;