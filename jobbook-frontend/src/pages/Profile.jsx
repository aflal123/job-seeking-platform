import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Chip from '@mui/material/Chip'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Avatar from '@mui/material/Avatar'
import { AutoAwesome as AutoAwesomeIcon, CloudUpload as CloudUploadIcon, Person as PersonIcon, Work as WorkIcon, Article as ArticleIcon } from '@mui/icons-material'
import axios from 'axios'
import { getSeekerApplications } from '../services/jobServices'

const Profile = () => {
    const userId = localStorage.getItem('userId')
    const role = localStorage.getItem('role')
    
    const [user, setUser] = useState({ fullName: '', email: '' })
    const [tabValue, setTabValue] = useState(0)
    const [isParsing, setIsParsing] = useState(false)
    const [aiSkills, setAiSkills] = useState([])
    const [applications, setApplications] = useState([])

    useEffect(() => {
        if (userId) {
            // Fetch User Details
            axios.get(`http://localhost:8080/api/users/${userId}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err))
            
            // Fetch Applications if Seeker
            if (role === 'SEEKER') {
                getSeekerApplications(userId)
                    .then(data => setApplications(data))
                    .catch(err => console.log(err))
            }
        }
    }, [userId, role])

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    const handleUploadClick = () => {
        setIsParsing(true)
        setTimeout(() => {
            setIsParsing(false)
            setAiSkills(['React', 'Spring Boot', 'Java', 'Tailwind CSS', 'AWS'])
            alert("IBM Watson AI successfully parsed your resume!")
        }, 2500)
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Navbar />
            
            <Box sx={{ maxWidth: 1000, margin: '0 auto', mt: 4, px: 2 }}>
                {/* Profile Header */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 3, background: 'linear-gradient(135deg, #673ab7 0%, #512da8 100%)', color: 'white' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                        <Avatar sx={{ width: 100, height: 100, fontSize: '2.5rem', backgroundColor: 'rgba(255,255,255,0.2)', border: '4px solid rgba(255,255,255,0.3)' }}>
                            {user.fullName?.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">{user.fullName}</Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9 }}>{role} Account</Typography>
                            <Chip label="Verified Profile" size="small" sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} />
                        </Box>
                    </Box>
                </Paper>

                {/* Tabs Section */}
                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', px: 2, py: 1 }}>
                        <Tab icon={<PersonIcon />} iconPosition="start" label="Account Info" sx={{ fontWeight: 'bold' }} />
                        {role === 'SEEKER' && <Tab icon={<WorkIcon />} iconPosition="start" label="Applications" sx={{ fontWeight: 'bold' }} />}
                        <Tab icon={<ArticleIcon />} iconPosition="start" label="Resume & AI" sx={{ fontWeight: 'bold' }} />
                    </Tabs>

                    <Box sx={{ p: 4 }}>
                        {/* Tab 0: Account Details */}
                        {tabValue === 0 && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>Personal Details</Typography>
                                    <TextField label="Full Name" value={user.fullName} fullWidth sx={{ mb: 3 }} InputProps={{ readOnly: true }} />
                                    <TextField label="Email Address" value={user.email} fullWidth sx={{ mb: 3 }} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>Account Security</Typography>
                                    <Button variant="outlined" color="primary" fullWidth sx={{ mb: 2 }}>Change Password</Button>
                                    <Button variant="outlined" color="error" fullWidth>Deactivate Account</Button>
                                </Grid>
                            </Grid>
                        )}

                        {/* Tab 1: Applications (Seeker only) */}
                        {tabValue === 1 && role === 'SEEKER' && (
                            <Box>
                                <Typography variant="h6" fontWeight="bold" gutterBottom>My Job Applications</Typography>
                                {applications.length === 0 ? (
                                    <Typography color="textSecondary">You haven't applied to any jobs yet.</Typography>
                                ) : (
                                    <Grid container spacing={2}>
                                        {applications.map(app => (
                                            <Grid item xs={12} key={app.id}>
                                                <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                                                    <Grid container justifyContent="space-between" alignItems="center">
                                                        <Grid item>
                                                            <Typography variant="h6" fontWeight="bold">{app.job.title}</Typography>
                                                            <Typography variant="body2" color="textSecondary">{app.job.location} • {app.job.jobType}</Typography>
                                                        </Grid>
                                                        <Grid item>
                                                            <Chip 
                                                                label={app.status} 
                                                                color={app.status === 'SHORTLISTED' ? 'success' : app.status === 'REJECTED' ? 'error' : 'warning'} 
                                                                variant="outlined" 
                                                                sx={{ fontWeight: 'bold' }} 
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Paper>
                                            </Grid>
                                        ))}
                                    </Grid>
                                )}
                            </Box>
                        )}

                        {/* Tab 2 (or 1 if not seeker): Resume & AI */}
                        {((tabValue === 2 && role === 'SEEKER') || (tabValue === 1 && role !== 'SEEKER')) && (
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={7}>
                                    <Paper variant="outlined" sx={{ padding: 4, textAlign: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: '#ccc', borderRadius: 2, backgroundColor: '#fafafa' }}>
                                        <CloudUploadIcon sx={{ fontSize: 50, color: '#aaa', mb: 1 }} />
                                        <Typography variant="body1" fontWeight="bold">Update your Resume</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Let our AI scan your profile for better job matches.</Typography>
                                        
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            component="label" 
                                            startIcon={isParsing ? undefined : <AutoAwesomeIcon />}
                                            disabled={isParsing}
                                            sx={{ borderRadius: 10, px: 4 }}
                                        >
                                            {isParsing ? 'AI Parsing...' : 'Parse Resume'}
                                            <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleUploadClick} />
                                        </Button>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={5}>
                                    {aiSkills.length > 0 ? (
                                        <Box sx={{ p: 3, backgroundColor: '#f3e5f5', borderRadius: 2, height: '100%' }}>
                                            <Typography variant="subtitle1" fontWeight="bold" color="secondary" gutterBottom>
                                                <AutoAwesomeIcon sx={{ fontSize: 18, verticalAlign: 'middle', mr: 1 }} /> 
                                                AI Extracted Skills
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                                                {aiSkills.map((skill, index) => (
                                                    <Chip key={index} label={skill} color="secondary" size="small" sx={{ fontWeight: 'bold' }} />
                                                ))}
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                            <Typography variant="body2" color="textSecondary">Upload a resume to see AI-extracted skills.</Typography>
                                        </Box>
                                    )}
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}

export default Profile
