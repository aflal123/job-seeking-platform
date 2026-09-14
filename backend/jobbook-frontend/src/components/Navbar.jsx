import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'


import { Logout as LogoutIcon } from '@mui/icons-material'

const Navbar = () => {
    const navigate = useNavigate()
    const role = localStorage.getItem('role')

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <AppBar position="sticky" elevation={0} sx={{ backgroundColor: 'white', borderBottom: '1px solid #e0e0e0', color: '#333' }}>
            <Toolbar sx={{ maxWidth: 1200, width: '100%', margin: '0 auto' }}>
                {/* Logo */}
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontWeight: '800', 
                        flexGrow: 0, 
                        mr: 4, 
                        color: '#1976d2', 
                        cursor: 'pointer',
                        letterSpacing: '-0.5px'
                    }}
                    onClick={() => navigate('/home')}
                >
                    JobBook
                </Typography>

                {/* Nav Links */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 1 }}>
                    <Button sx={{ color: 'text.primary', fontWeight: 'bold' }} onClick={() => navigate('/home')}>Home</Button>
                    <Button sx={{ color: 'text.primary', fontWeight: 'bold' }} onClick={() => navigate('/jobs')}>Jobs</Button>
                    {role === 'EMPLOYER' && <Button sx={{ color: 'text.primary', fontWeight: 'bold' }} onClick={() => navigate('/employer-dashboard')}>Employer Hub</Button>}
                    <Button sx={{ color: 'text.primary', fontWeight: 'bold' }} onClick={() => navigate('/courses')}>Courses</Button>
                    <Button sx={{ color: 'text.primary', fontWeight: 'bold' }} onClick={() => navigate('/community')}>Community</Button>
                </Box>

                {/* Profile & Logout */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={() => navigate('/profile')}
                        sx={{ borderRadius: 2, fontWeight: 'bold' }}
                    >
                        Profile
                    </Button>
                    <Button 
                        variant="contained" 
                        color="error" 
                        size="small" 
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                        sx={{ borderRadius: 2, fontWeight: 'bold', boxShadow: 'none' }}
                    >
                        Logout
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar
