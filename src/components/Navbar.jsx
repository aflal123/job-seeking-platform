import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Briefcase, BookOpen, Users, Bell, User as UserIcon, LogOut, Shield, PlusCircle } from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
  const role = typeof window !== 'undefined' ? (localStorage.getItem('role') || 'JOB_SEEKER') : 'JOB_SEEKER'
  const fullName = typeof window !== 'undefined' ? (localStorage.getItem('fullName') || 'User') : 'User'

  const handleLogout = () => {
    localStorage.clear()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(9, 13, 22, 0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '12px 24px'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        
        {/* Brand Logo */}
        <Link to="/home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Briefcase size={22} color="#ffffff" />
          </div>
          <div>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em' }}>
              Job<span className="gradient-text">Book</span>
            </span>
            <span style={{ fontSize: '0.65rem', display: 'block', color: '#94a3b8', marginTop: '-4px', fontWeight: 600 }}>
              CAREER & MENTORSHIP PLATFORM
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link 
            to="/jobs" 
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              color: isActive('/jobs') ? '#ffffff' : '#94a3b8',
              backgroundColor: isActive('/jobs') ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
              border: isActive('/jobs') ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid transparent',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Briefcase size={16} /> Jobs
          </Link>

          <Link 
            to="/courses" 
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              color: isActive('/courses') ? '#ffffff' : '#94a3b8',
              backgroundColor: isActive('/courses') ? 'rgba(6, 182, 212, 0.15)' : 'transparent',
              border: isActive('/courses') ? '1px solid rgba(6, 182, 212, 0.3)' : '1px solid transparent',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <BookOpen size={16} /> Mentorship & Courses
          </Link>

          <Link 
            to="/community" 
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              color: isActive('/community') ? '#ffffff' : '#94a3b8',
              backgroundColor: isActive('/community') ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
              border: isActive('/community') ? '1px solid rgba(168, 85, 247, 0.3)' : '1px solid transparent',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Users size={16} /> Community
          </Link>

          {role === 'EMPLOYER' && (
            <Link 
              to="/employer-dashboard" 
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                color: '#34d399',
                backgroundColor: 'rgba(16, 185, 129, 0.12)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <PlusCircle size={16} /> Employer Portal
            </Link>
          )}

          {role === 'ADMIN' ? (
            <Link 
              to="/admin" 
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                color: '#f43f5e',
                backgroundColor: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <Shield size={16} /> Admin Portal
            </Link>
          ) : (
            <Link 
              to="/admin" 
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                color: '#94a3b8',
                backgroundColor: 'transparent',
                border: '1px solid transparent',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
              title="Admin Portal"
            >
              <Shield size={15} /> Admin
            </Link>
          )}
        </div>

        {/* User Status / Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {token ? (
            <>
              <Link to="/notifications" style={{ textDecoration: 'none', color: '#94a3b8', position: 'relative', display: 'flex' }}>
                <Bell size={20} />
                <span style={{
                  position: 'absolute',
                  top: '-2px',
                  right: '-2px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  backgroundColor: '#06b6d4'
                }} />
              </Link>

              <Link to="/profile" style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <UserIcon size={18} color="#6366f1" />
                <span style={{ color: '#f8fafc', fontWeight: 600, fontSize: '0.85rem' }}>{fullName}</span>
                <span className="badge-pill badge-purple" style={{ fontSize: '0.65rem' }}>{role}</span>
              </Link>

              <button 
                onClick={handleLogout} 
                className="btn-secondary" 
                style={{ padding: '7px 12px', fontSize: '0.85rem' }}
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-secondary">Log In</Link>
              <Link to="/register" className="btn-primary">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
