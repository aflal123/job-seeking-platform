import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Shield, Users, Briefcase, BookOpen, TrendingUp, CheckCircle, XCircle, Search, Filter } from 'lucide-react'

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('analytics')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock analytics stats
  const stats = [
    { label: 'Total Job Seekers', value: '4,280', change: '+14%', color: '#6366f1' },
    { label: 'Verified Employers', value: '312', change: '+8%', color: '#10b981' },
    { label: 'Active Mentors', value: '85', change: '+22%', color: '#a855f7' },
    { label: 'Monthly Applications', value: '18,940', change: '+31%', color: '#06b6d4' }
  ]

  // Mock user list
  const users = [
    { id: 1, name: 'Alex Johnson', email: 'alex@example.com', role: 'JOB_SEEKER', status: 'ACTIVE', joined: '2026-09-01' },
    { id: 2, name: 'Tech Corp Inc.', email: 'hr@techcorp.com', role: 'EMPLOYER', status: 'VERIFIED', joined: '2026-08-20' },
    { id: 3, name: 'Dr. Sarah Connor', email: 'sarah@mentors.io', role: 'TRAINER', status: 'VERIFIED', joined: '2026-08-15' },
    { id: 4, name: 'Michael Brown', email: 'michael@gmail.com', role: 'JOB_SEEKER', status: 'PENDING_OTP', joined: '2026-09-12' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: '1280px', width: '100%', margin: '0 auto', padding: '32px 24px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Shield size={28} color="#f43f5e" />
              <h1 style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>
                System Admin <span className="gradient-text">Analytics</span>
              </h1>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginTop: '4px' }}>
              Monitor system health, manage user permissions, and track platform metrics.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              onClick={() => setActiveTab('analytics')} 
              className={activeTab === 'analytics' ? 'btn-primary' : 'btn-secondary'}
            >
              <TrendingUp size={16} /> Analytics
            </button>
            <button 
              onClick={() => setActiveTab('users')} 
              className={activeTab === 'users' ? 'btn-primary' : 'btn-secondary'}
            >
              <Users size={16} /> Users Management
            </button>
          </div>
        </div>

        {/* Analytics Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="glass-panel glass-panel-interactive" style={{ padding: '24px' }}>
              <span style={{ fontSize: '0.8rem', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase' }}>
                {stat.label}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginTop: '8px' }}>
                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>{stat.value}</span>
                <span className="badge-pill badge-emerald" style={{ fontSize: '0.75rem' }}>{stat.change}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Content Section */}
        {activeTab === 'analytics' ? (
          <div className="glass-panel" style={{ padding: '32px' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
              Platform Overview & Health
            </h3>
            <div style={{
              height: '240px',
              borderRadius: '12px',
              backgroundColor: 'rgba(15, 23, 42, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b'
            }}>
              [ Real-time System Metrics & Traffic Visualization Graph ]
            </div>
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#ffffff' }}>
                User Management Directory
              </h3>
              
              <div style={{ display: 'flex', gap: '12px', width: '320px' }}>
                <div style={{ position: 'relative', width: '100%' }}>
                  <Search size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '12px' }} />
                  <input 
                    type="text" 
                    className="input-dark" 
                    style={{ paddingLeft: '38px', padding: '8px 12px 8px 38px', fontSize: '0.85rem' }} 
                    placeholder="Search users..."
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
                    <th style={{ padding: '12px', color: '#94a3b8' }}>User</th>
                    <th style={{ padding: '12px', color: '#94a3b8' }}>Role</th>
                    <th style={{ padding: '12px', color: '#94a3b8' }}>Status</th>
                    <th style={{ padding: '12px', color: '#94a3b8' }}>Joined Date</th>
                    <th style={{ padding: '12px', color: '#94a3b8' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                      <td style={{ padding: '16px 12px' }}>
                        <div style={{ fontWeight: 600 }}>{u.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{u.email}</div>
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span className="badge-pill badge-purple">{u.role}</span>
                      </td>
                      <td style={{ padding: '16px 12px' }}>
                        <span className="badge-pill badge-emerald">{u.status}</span>
                      </td>
                      <td style={{ padding: '16px 12px', color: '#94a3b8' }}>{u.joined}</td>
                      <td style={{ padding: '16px 12px' }}>
                        <button className="btn-secondary" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
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
