import React from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { Work as WorkIcon, School as SchoolIcon, Groups as GroupsIcon, RocketLaunch as RocketIcon } from '@mui/icons-material'

const Landing = () => {
    const navigate = useNavigate()

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#fff' }}>
            {/* Hero Section */}
            <Box sx={{ 
                background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)', 
                color: 'white', 
                pt: 15, 
                pb: 12,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={7}>
                            <Typography variant="h2" fontWeight="800" gutterBottom sx={{ letterSpacing: '-1px' }}>
                                Your Career Journey <br /> Starts with <span style={{ color: '#64b5f6' }}>JobBook</span>
                            </Typography>
                            <Typography variant="h5" sx={{ mb: 4, opacity: 0.9, fontWeight: '400', lineHeight: 1.6 }}>
                                The all-in-one platform for job seekers, employers, and trainers. Connect, learn, and grow your professional network.
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 2 }}>
                                <Button 
                                    variant="contained" 
                                    size="large" 
                                    onClick={() => navigate('/register')}
                                    sx={{ 
                                        backgroundColor: 'white', 
                                        color: '#1976d2', 
                                        fontWeight: 'bold',
                                        px: 4,
                                        py: 1.5,
                                        '&:hover': { backgroundColor: '#f5f5f5' }
                                    }}
                                >
                                    Get Started Now
                                </Button>
                                <Button 
                                    variant="outlined" 
                                    size="large" 
                                    onClick={() => navigate('/login')}
                                    sx={{ 
                                        borderColor: 'white', 
                                        color: 'white', 
                                        fontWeight: 'bold',
                                        px: 4,
                                        py: 1.5,
                                        '&:hover': { borderColor: '#f5f5f5', backgroundColor: 'rgba(255,255,255,0.1)' }
                                    }}
                                >
                                    Sign In
                                </Button>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                            <Box 
                                component="img" 
                                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                                sx={{ 
                                    width: '100%', 
                                    borderRadius: 4, 
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                                    transform: 'rotate(2deg)'
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Container maxWidth="lg" sx={{ py: 12 }}>
                <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom>Why Choose JobBook?</Typography>
                <Typography variant="h6" textAlign="center" color="textSecondary" sx={{ mb: 8 }}>Everything you need to succeed in your professional life.</Typography>
                
                <Grid container spacing={4}>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 4, border: '1px solid #f0f0f0', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' } }}>
                            <WorkIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
                            <Typography variant="h5" fontWeight="bold" gutterBottom>Smart Job Search</Typography>
                            <Typography color="textSecondary">AI-driven job matching that connects you with the perfect opportunities based on your skills.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 4, border: '1px solid #f0f0f0', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' } }}>
                            <SchoolIcon sx={{ fontSize: 60, color: '#2e7d32', mb: 2 }} />
                            <Typography variant="h5" fontWeight="bold" gutterBottom>Learning Hub</Typography>
                            <Typography color="textSecondary">Access premium courses from top trainers and upskill yourself to stay competitive.</Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper elevation={0} sx={{ p: 4, textAlign: 'center', borderRadius: 4, border: '1px solid #f0f0f0', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' } }}>
                            <GroupsIcon sx={{ fontSize: 60, color: '#673ab7', mb: 2 }} />
                            <Typography variant="h5" fontWeight="bold" gutterBottom>Community</Typography>
                            <Typography color="textSecondary">Network with professionals, share insights, and build your personal brand in our community.</Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            {/* CTA Section */}
            <Box sx={{ backgroundColor: '#f8f9fa', py: 10 }}>
                <Container maxWidth="md" sx={{ textAlign: 'center' }}>
                    <RocketIcon sx={{ fontSize: 80, color: '#1976d2', mb: 3 }} />
                    <Typography variant="h3" fontWeight="bold" gutterBottom>Ready to Launch Your Career?</Typography>
                    <Typography variant="h6" color="textSecondary" sx={{ mb: 5 }}>Join thousands of professionals already using JobBook.</Typography>
                    <Button 
                        variant="contained" 
                        size="large" 
                        onClick={() => navigate('/register')}
                        sx={{ px: 6, py: 2, fontSize: '1.2rem', fontWeight: 'bold', borderRadius: 3 }}
                    >
                        Join Now - It's Free
                    </Button>
                </Container>
            </Box>

            {/* Footer */}
            <Box sx={{ py: 4, textAlign: 'center', borderTop: '1px solid #eee' }}>
                <Typography color="textSecondary">© 2026 JobBook. All rights reserved.</Typography>
            </Box>
        </Box>
    )
}

export default Landing
