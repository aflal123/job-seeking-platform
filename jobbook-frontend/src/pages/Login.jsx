import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/authService'

const Login = () => {
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

const handleLogin = async () => {
    try {
        const response = await login(email, password)
        console.log(response)
        localStorage.setItem('token', response.token)
        localStorage.setItem('role', response.role)
        localStorage.setItem('fullName', response.fullName)
        navigate('/home')
    } catch (error) {
        console.log(error.response.data)
    }
}
    
  return (
   <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Paper elevation={3} sx={{ padding: 4, width: 400  }}>
    {/* your title, fields and button go here */}
    <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', marginBottom: 3 ,marginLeft:3}}>
        Welcome to JobBook
        </Typography>
    <TextField 
            label="Email" 
            fullWidth 
            sx={{ marginBottom: 2 }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />
    <TextField 
        label="Password" 
        type={showPassword ? 'text' : 'password'} 
        fullWidth 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ marginBottom: 2 }}
        slotProps={{
    input: {
        endAdornment: (
            
            <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
            </InputAdornment>
            )
    }
        }}
        />
    <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
    <Typography sx={{marginLeft:10,marginTop:2}}>
        Don't have an account? <Link to="/register">Register</Link>
        </Typography>
  </Paper>
</Box>
  )
}

export default Login
