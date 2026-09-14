import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import { Home as HomeIcon, Work as WorkIcon, School as SchoolIcon, Groups as GroupsIcon } from '@mui/icons-material'

import React from 'react'

import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
    const fullName = localStorage.getItem('fullName')
    const role = localStorage.getItem('role')
    const navigate = useNavigate()

    const navItems = [
        { label: 'Home', icon: <HomeIcon />, path: '/home' },
        { label: 'Jobs', icon: <WorkIcon />, path: '/jobs' },
        { label: 'Courses', icon: <SchoolIcon />, path: '/courses' },
        { label: 'Community', icon: <GroupsIcon />, path: '/community' },
    ]

    return (
        <Box sx={{ padding: 2, position: 'sticky', top: 20 }}>
            {/* User Profile Section */}
            <Paper elevation={0} sx={{ textAlign: 'center', p: 3, mb: 2, borderRadius: 3, border: '1px solid #e0e0e0' }}>
                <Avatar sx={{ width: 64, height: 64, margin: 'auto', marginBottom: 1.5, backgroundColor: '#1976d2', fontSize: '1.5rem' }}>
                    {fullName?.charAt(0)}
                </Avatar>
                <Typography variant="h6" fontWeight="bold">{fullName}</Typography>
                <Typography variant="body2" color="textSecondary" sx={{ textTransform: 'capitalize' }}>{role?.toLowerCase()}</Typography>
            </Paper>

            {/* Navigation Links */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {navItems.map((item) => (
                    <Button 
                        key={item.label}
                        fullWidth 
                        startIcon={item.icon} 
                        onClick={() => navigate(item.path)}
                        sx={{ 
                            justifyContent: 'flex-start', 
                            py: 1.2, 
                            px: 2,
                            borderRadius: 2,
                            color: 'text.primary',
                            fontWeight: 'medium',
                            '&:hover': {
                                backgroundColor: '#e3f2fd',
                                color: '#1976d2'
                            }
                        }}
                    >
                        {item.label}
                    </Button>
                ))}
            </Box>
        </Box>
    )
}

export default Sidebar
