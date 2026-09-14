import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { verifyOtp, resendOtp } from '../services/authService'


const VerifyOtp = () => {
    const [otp,setOtp] = useState('');
    const location = useLocation()
        const navigate = useNavigate()
        const email = location.state?.email
        console.log('email from state:', email)

        const handleVerify = async () => {
    try {
        const response = await verifyOtp(email, otp)
        console.log(response)
        navigate('/login')
    } catch (error) {
        console.log(error.response.data)
    }
    
}

const handleResend = async () => {
    try {
        const response = await resendOtp(email)
        console.log(response)
    } catch (error) {
        console.log(error.response.data)
    }
}
  return (
   
      
      <Box
  sx={{
    minHeight: '100vh',
    backgroundColor: '#f0f2f5',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}
>
  <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
    
    <Typography
      variant="h4"
      sx={{
        color: '#1976d2',
        fontWeight: 'bold',
        marginBottom: 3,
        textAlign: 'center'
      }}
    >
      Verify Your Account
    </Typography>

    <Typography
      variant="h6"
      sx={{
        color: '#1976d2',
        fontWeight: 'bold',
        marginBottom: 3,
        textAlign: 'center'
      }}
    >
      Enter the OTP sent to your email
    </Typography>
    
    <TextField 
                label="OTP" 
                fullWidth 
                sx={{ marginBottom: 2 }}
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                />
     <Button variant="contained" fullWidth onClick={handleVerify}>Verify</Button>
     <Typography sx={{ textAlign: 'center', marginTop: 2 }}>
    Didn't receive OTP? <Link onClick={handleResend} sx={{ cursor: 'pointer' }}>Resend OTP</Link>
</Typography>
  </Paper>
</Box>
   
  )
}

export default VerifyOtp
