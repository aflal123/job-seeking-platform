import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import { registerUser } from '../services/authService'
import { Link, useNavigate } from 'react-router-dom'


const Register = () => {
    const [fullName,setFullName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [role,setRole] = useState('')
    const [showPassword,setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const navigate = useNavigate()
    const handleRegister = async () => {
    const userData = {
        fullName: fullName,
        email: email,
        password: password,
        role: role
    }
   try {
    const response = await registerUser(userData)
    console.log(response)
    navigate('/verify-otp', { state: { email: email } })
} catch (error) {
    console.log(error.response.data)
}
}
  return (
   <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
    <Typography variant="h4" sx={{ color: '#1976d2', fontWeight: 'bold', marginBottom: 3 ,marginLeft:8}}>
      Create Account
    </Typography>
        <TextField 
            label="Full Name" 
            fullWidth 
            sx={{ marginBottom: 2 }}
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            />
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
                sx={{ marginBottom: 2 }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

                <TextField 
                    label="confirm Password" 
                    type={showConfirmPassword ? 'text' : 'password'}
                    fullWidth 
                    sx={{ marginBottom: 2 }}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    slotProps={{
    input: {
        endAdornment: (
            
            <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
            </InputAdornment>
            )
    }
        }}
        />

            <FormControl fullWidth sx={{ marginBottom: 2 }}>

            <InputLabel>Role</InputLabel>
            <Select
                value={role}
                label="Role"
                onChange={(e) => setRole(e.target.value)}
            >
                <MenuItem value="SEEKER">Seeker</MenuItem>
                <MenuItem value="EMPLOYER">Employer</MenuItem>
                <MenuItem value="TRAINER">Trainer</MenuItem>
            </Select>
            </FormControl>

        <Button variant="contained" fullWidth onClick={handleRegister}>Register</Button>
    <Typography sx={{marginLeft:8,marginTop:2}}>
        Already have an account ?   <Link to="/login">Login</Link>
        </Typography>
            
              
  </Paper>
</Box>
  )
}

export default Register
