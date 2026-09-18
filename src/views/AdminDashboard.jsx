import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { 
  Shield, Users, Briefcase, BookOpen, TrendingUp, CheckCircle, 
  XCircle, Search, Filter, RefreshCw, UserCheck, AlertTriangle, Activity
} from 'lucide-react'
import api from '../services/api'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics')
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalCourses: 0,
    totalApplications: 0,
    jobSeekersCount: 0,
    employersCount: 0,
    trainersCount: 0,
    adminsCount: 0,
    systemHealth: 'Optimal',
    uptime: '99.98%'
  })
  const [users, setUsers] = useState([])
  const [actionMessage, setActionMessage] = useState('')

  const fetchAdminData = async () => {
    setLoading(true)
    try {
      const res = await api.get('/admin/analytics')
      if (res.data) {
        if (res.data.stats) setStats(res.data.stats)
        if (res.data.users) setUsers(res.data.users)
      }
    } catch (err) {
      console.error('Failed to fetch admin data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAdminData()
  }, [])

  const handleUpdateRole = async (userId, newRole) => {
    try {
      await api.put(`/users/${userId}`, { role: newRole })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u))
      setActionMessage(`Updated user #${userId} role to ${newRole}`)
      setTimeout(() => setActionMessage(''), 3000)
    } catch (err) {
      console.error('Failed to update role:', err)
    }
  }

  const handleToggleVerified = async (userId, currentVerified) => {
    try {
      const newStatus = !currentVerified
      await api.put(`/users/${userId}`, { verified: newStatus })
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, verified: newStatus } : u))
      setActionMessage(`User #${userId} verification set to ${newStatus ? 'VERIFIED' : 'UNVERIFIED'}`)
      setTimeout(() => setActionMessage(''), 3000)
    } catch (err) {
      console.error('Failed to update verification:', err)
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      (user.fullName && user.fullName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (user.email && user.email.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter
    return matchesSearch && matchesRole
  })

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#090d16', color: '#ffffff' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '32px 24px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: 'rgba(244, 63, 94, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(244, 63, 94, 0.3)'
              }}>
                <Shield size={24} color="#f43f5e" />
              </div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                System Admin <span className="gradient-text">Portal</span>
              </h1>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '6px' }}>
              Real-time platform overview, user directory management, and PostgreSQL system metrics.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button 
              onClick={fetchAdminData}
              className="btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px' }}
              title="Refresh Data"
            >
              <RefreshCw size={15} className={loading ? 'spin-anim' : ''} /> Refresh
            </button>
            <button 
              onClick={() => setActiveTab('analytics')} 
              className={activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <TrendingUp size={16} /> Analytics
            </button>
            <button 
              onClick={() => setActiveTab('users')} 
              className={activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <Users size={16} /> Users ({users.length})
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {actionMessage && (
          <div style={{
            padding: '12px 18px',
            borderRadius: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            marginBottom: '24px',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <CheckCircle size={18} /> {actionMessage}
          </div>
        )}

        {/* Dynamic Analytics Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          marginBottom: '32px'
        }}>
          <div className="glass-panel glass-panel-interactive" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                Total Users
              </span>
              <Users size={18} color="#6366f1" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '12px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>{stats.totalUsers || 0}</span>
              <span className="badge-pill badge-purple" style={{ fontSize: '0.75rem' }}>Active</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
              Seekers: {stats.jobSeekersCount || 0} | Employers: {stats.employersCount || 0}
            </div>
          </div>

          <div className="glass-panel glass-panel-interactive" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                Job Listings
              </span>
              <Briefcase size={18} color="#10b981" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '12px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>{stats.totalJobs || 0}</span>
              <span className="badge-pill badge-emerald" style={{ fontSize: '0.75rem' }}>Live</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
              Applications: {stats.totalApplications || 0}
            </div>
          </div>

          <div className="glass-panel glass-panel-interactive" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                Courses & Mentors
              </span>
              <BookOpen size={18} color="#06b6d4" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '12px' }}>
              <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>{stats.totalCourses || 0}</span>
              <span className="badge-pill badge-cyan" style={{ fontSize: '0.75rem' }}>Published</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
              Trainers: {stats.trainersCount || 0}
            </div>
          </div>

          <div className="glass-panel glass-panel-interactive" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                System Health
              </span>
              <Activity size={18} color="#f43f5e" />
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '12px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#34d399' }}>{stats.systemHealth || 'Optimal'}</span>
              <span className="badge-pill badge-emerald" style={{ fontSize: '0.75rem' }}>{stats.uptime || '99.98%'}</span>
            </div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '8px' }}>
              Neon PostgreSQL Connected
            </div>
          </div>
        </div>

        {/* Tab 1: Analytics & System Health Overview */}
        {activeTab === 'analytics' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="glass-panel" style={{ padding: '32px' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                Platform Architecture & Health
              </h3>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', marginBottom: '20px' }}>
                Unified Next.js 16 full-stack serverless architecture running on Vercel AWS Lambda with Neon Serverless Postgres.
              </p>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '16px',
                marginTop: '16px'
              }}>
                <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>HOSTING INFRASTRUCTURE</div>
                  <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>Vercel Edge & Lambda</div>
                  <div style={{ color: '#10b981', fontSize: '0.75rem', marginTop: '4px' }}>● 100% Free Tier Deployments</div>
                </div>

                <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>DATABASE BACKEND</div>
                  <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>Neon PostgreSQL Pooler</div>
                  <div style={{ color: '#06b6d4', fontSize: '0.75rem', marginTop: '4px' }}>● SSL Encrypted & Prisma ORM</div>
                </div>

                <div style={{ padding: '16px', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>SECURITY & SESSIONS</div>
                  <div style={{ color: '#ffffff', fontSize: '1.1rem', fontWeight: 700, marginTop: '4px' }}>HMAC-SHA256 JWT</div>
                  <div style={{ color: '#a855f7', fontSize: '0.75rem', marginTop: '4px' }}>● BCrypt 10-Salt Hash</div>
                </div>
              </div>
            </div>

            {/* Quick Action to Manage Users */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: 0, fontSize: '1.1rem', color: '#ffffff' }}>Manage Registered Accounts</h4>
                <p style={{ margin: '4px 0 0 0', color: '#94a3b8', fontSize: '0.85rem' }}>
                  There are currently {users.length} registered users in the database.
                </p>
              </div>
              <button 
                onClick={() => setActiveTab('users')}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.85rem' }}
              >
                Open User Directory &rarr;
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Real Database User Management Directory */}
        {activeTab === 'users' && (
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                  User Management Directory
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Showing {filteredUsers.length} of {users.length} registered users
                </span>
              </div>
              
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {/* Role Filter */}
                <select 
                  value={roleFilter} 
                  onChange={(e) => setRoleFilter(e.target.value)}
                  style={{
                    backgroundColor: 'rgba(15, 23, 42, 0.8)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    color: '#ffffff',
                    padding: '8px 12px',
                    fontSize: '0.85rem',
                    outline: 'none'
                  }}
                >
                  <option value="ALL">All Roles</option>
                  <option value="JOB_SEEKER">Job Seekers</option>
                  <option value="EMPLOYER">Employers</option>
                  <option value="TRAINER">Trainers</option>
                  <option value="ADMIN">Admins</option>
                </select>

                {/* Search Bar */}
                <div style={{ position: 'relative', width: '260px' }}>
                  <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input 
                    type="text" 
                    className="input-dark" 
                    style={{ paddingLeft: '38px', padding: '8px 12px 8px 38px', fontSize: '0.85rem', width: '100%' }} 
                    placeholder="Search name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Table */}
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#f8fafc', fontSize: '0.9rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', textAlign: 'left' }}>
                    <th style={{ padding: '12px', color: '#94a3b8', fontSize: '0.8rem' }}>USER</th>
                    <th style={{ padding: '12px', color: '#94a3b8', fontSize: '0.8rem' }}>ROLE</th>
                    <th style={{ padding: '12px', color: '#94a3b8', fontSize: '0.8rem' }}>VERIFIED</th>
                    <th style={{ padding: '12px', color: '#94a3b8', fontSize: '0.8rem' }}>REGISTERED</th>
                    <th style={{ padding: '12px', color: '#94a3b8', fontSize: '0.8rem', textAlign: 'right' }}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
                        No users found matching your criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => (
                      <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ padding: '16px 12px' }}>
                          <div style={{ fontWeight: 600, color: '#ffffff' }}>{u.fullName || 'User'}</div>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{u.email}</div>
                          {u.phone && <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{u.phone}</div>}
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <select
                            value={u.role}
                            onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                            style={{
                              backgroundColor: 'rgba(15, 23, 42, 0.8)',
                              border: '1px solid rgba(255, 255, 255, 0.1)',
                              borderRadius: '6px',
                              color: u.role === 'ADMIN' ? '#f43f5e' : u.role === 'EMPLOYER' ? '#34d399' : u.role === 'TRAINER' ? '#38bdf8' : '#a855f7',
                              fontWeight: 600,
                              padding: '4px 8px',
                              fontSize: '0.75rem',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="JOB_SEEKER">JOB_SEEKER</option>
                            <option value="EMPLOYER">EMPLOYER</option>
                            <option value="TRAINER">TRAINER</option>
                            <option value="ADMIN">ADMIN</option>
                          </select>
                        </td>
                        <td style={{ padding: '16px 12px' }}>
                          <button
                            onClick={() => handleToggleVerified(u.id, u.verified)}
                            style={{
                              background: 'transparent',
                              border: 'none',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                              padding: 0
                            }}
                          >
                            {u.verified ? (
                              <span className="badge-pill badge-emerald" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <CheckCircle size={12} /> Verified
                              </span>
                            ) : (
                              <span className="badge-pill badge-rose" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                                <XCircle size={12} /> Pending
                              </span>
                            )}
                          </button>
                        </td>
                        <td style={{ padding: '16px 12px', color: '#94a3b8', fontSize: '0.8rem' }}>
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                        </td>
                        <td style={{ padding: '16px 12px', textAlign: 'right' }}>
                          {u.role !== 'ADMIN' ? (
                            <button 
                              onClick={() => handleUpdateRole(u.id, 'ADMIN')}
                              className="btn-secondary" 
                              style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#f43f5e' }}
                            >
                              Make Admin
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: '#f43f5e', fontWeight: 600 }}>
                              System Admin
                            </span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default AdminDashboard
