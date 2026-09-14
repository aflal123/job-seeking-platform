import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import VerifyOtp from './pages/VerifyOtp'
import Home from './pages/Home'
import Jobs from './pages/Jobs'
import PostJob from './pages/PostJob'
import EmployerDashboard from './pages/EmployerDashboard'
import Courses from './pages/Courses'
import Profile from './pages/Profile'
import Community from './pages/Community'

import Landing from './pages/Landing'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/employer-dashboard" element={<EmployerDashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App