import React, { useState } from 'react'
import { X, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react'
import axios from 'axios'

const ForgotResetPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1) // 1: Send OTP, 2: Reset Password, 3: Success
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  if (!isOpen) return null

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const res = await axios.post('http://localhost:8080/api/auth/forgot-password', { email })
      setMessage(res.data.message || 'OTP sent to your email!')
      setStep(2)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP. Please verify your email.')
    } finally {
      setLoading(false)
    }
  }

  const handleResetPassword = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')
    try {
      const res = await axios.post('http://localhost:8080/api/auth/reset-password', {
        email,
        otp,
        newPassword
      })
      setMessage(res.data.message || 'Password reset successfully!')
      setStep(3)
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid or expired OTP.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-panel" style={{
        width: '100%',
        maxWidth: '440px',
        padding: '32px',
        position: 'relative',
        animation: 'fadeIn 0.3s ease'
      }}>
        <button 
          onClick={onClose} 
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'none',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer'
          }}
        >
          <X size={20} />
        </button>

        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            borderRadius: '16px',
            background: 'rgba(99, 102, 241, 0.15)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto'
          }}>
            <ShieldCheck size={26} color="#6366f1" />
          </div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#ffffff' }}>
            {step === 1 && 'Forgot Password'}
            {step === 2 && 'Enter Reset Code'}
            {step === 3 && 'Password Reset Complete'}
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginTop: '6px' }}>
            {step === 1 && 'Enter your registered email to receive a 6-digit OTP.'}
            {step === 2 && `Enter the OTP sent to ${email} and set your new password.`}
            {step === 3 && 'Your account security has been updated.'}
          </p>
        </div>

        {error && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'rgba(244, 63, 94, 0.15)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fb7185',
            fontSize: '0.85rem',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        {message && (
          <div style={{
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#34d399',
            fontSize: '0.85rem',
            marginBottom: '16px'
          }}>
            {message}
          </div>
        )}

        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>EMAIL ADDRESS</label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                <input 
                  type="email" 
                  required 
                  className="input-dark" 
                  style={{ paddingLeft: '42px' }}
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Sending OTP...' : 'Send Verification OTP'} <ArrowRight size={16} />
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleResetPassword}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>6-DIGIT OTP CODE</label>
              <input 
                type="text" 
                required 
                maxLength={6}
                className="input-dark" 
                style={{ textAlign: 'center', letterSpacing: '6px', fontSize: '1.2rem', fontWeight: 700 }}
                placeholder="123456" 
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '6px', fontWeight: 600 }}>NEW PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} color="#64748b" style={{ position: 'absolute', left: '14px', top: '13px' }} />
                <input 
                  type="password" 
                  required 
                  minLength={6}
                  className="input-dark" 
                  style={{ paddingLeft: '42px' }}
                  placeholder="Minimum 6 characters" 
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
            </div>
            <button type="submit" disabled={loading} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Resetting...' : 'Update Password'} <ShieldCheck size={16} />
            </button>
          </form>
        )}

        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 16px auto' }} />
            <button onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ForgotResetPasswordModal
