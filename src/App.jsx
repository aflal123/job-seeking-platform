import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './views/Login'
import Register from './views/Register'
import VerifyOtp from './views/VerifyOtp'
import Home from './views/Home'
import Jobs from './views/Jobs'
import PostJob from './views/PostJob'
import EmployerDashboard from './views/EmployerDashboard'
import Courses from './views/Courses'
import Profile from './views/Profile'
import Community from './views/Community'
import Notifications from './views/Notifications'
import AdminDashboard from './views/AdminDashboard'
import Landing from './views/Landing'

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
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin-portal" element={<AdminDashboard />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/community" element={<Community />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App