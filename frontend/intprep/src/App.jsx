import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import UserProvider from "./context/UserContext";
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import LandinPage from './pages/LandingPage'
import Dashboard from './pages/home/Dashboard'
import InterviewPrep from './pages/interviewPrep/InterviewPrep'

export default function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path='/' element={<LandinPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/interview-prep/:sessionId' element={<InterviewPrep />} />
          </Routes>
        </Router>
        <Toaster
          toastOptions={{
            className: '',
            style: {
              fontSize: '16px'
            },
          }} />
      </UserProvider>
    </>
  );
}