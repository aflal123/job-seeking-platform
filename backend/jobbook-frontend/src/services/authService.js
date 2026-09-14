import axios from 'axios'


const BASE_URL = 'http://localhost:8080/api/auth'

export const registerUser = async (userData) => {
    const response = await axios.post(`${BASE_URL}/register`, userData)
    return response.data
}
export const verifyOtp = async (email, otp) => {
    const response = await axios.post(`${BASE_URL}/verify-otp`, { email, otp })
    return response.data
}


export const resendOtp = async (email) => {
    const response = await axios.post(`${BASE_URL}/resend-otp`, { email })
    return response.data
}

export const login = async (email,password) => {
    const response = await axios.post(`${BASE_URL}/login`, {email,password})
    return response.data
}