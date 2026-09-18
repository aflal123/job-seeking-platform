import api from './api'

export const registerUser = async (userData) => {
    const response = await api.post('/auth/register', userData)
    return response.data
}

export const verifyOtp = async (email, otp) => {
    const response = await api.post('/auth/verify-otp', { email, otp })
    return response.data
}

export const resendOtp = async (email) => {
    const response = await api.post('/auth/resend-otp', { email })
    return response.data
}

export const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password })
    return response.data
}