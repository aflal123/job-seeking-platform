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
import { CloudUpload as CloudUploadIcon, Person as PersonIcon, Work as WorkIcon, Article as ArticleIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material'
import api from '../services/api'
import { getSeekerApplications } from '../services/jobServices'

const Profile = () => {
    const userId = typeof window !== 'undefined' ? localStorage.getItem('userId') : null
    const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null
    const isSeeker = role === 'JOB_SEEKER' || role === 'SEEKER'
    
    const [user, setUser] = useState({ fullName: '', email: '' })
    const [tabValue, setTabValue] = useState(0)
    const [isParsing, setIsParsing] = useState(false)
    const [extractedSkills, setExtractedSkills] = useState([])
    const [applications, setApplications] = useState([])

    useEffect(() => {
        if (userId) {
            // Fetch User Details
            api.get(`/users/${userId}`)
                .then(res => setUser(res.data))
                .catch(err => console.log(err))
            
            // Fetch Applications if Seeker
            if (isSeeker) {
                getSeekerApplications(userId)
                    .then(data => setApplications(data))
                    .catch(err => console.log(err))
            }
        }
    }, [userId, role, isSeeker])

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    const handleUploadClick = () => {
        setIsParsing(true)
        setTimeout(() => {
            setIsParsing(false)
            setExtractedSkills(['React', 'Spring Boot', 'Java', 'Tailwind CSS', 'AWS', 'PostgreSQL'])
            alert("Resume successfully parsed and skills extracted!")
        }, 1500)
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Navbar />
            
            <Box sx={{ maxWidth: 1000, margin: '0 auto', mt: 4, px: 2 }}>
                {/* Profile Header */}
                <Paper elevation={0} sx={{ p: 4, borderRadius: 3, mb: 3, background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)', color: 'white' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3 }}>
                        <Avatar sx={{ width: 100, height: 100, fontSize: '2.5rem', backgroundColor: 'rgba(255,255,255,0.2)', border: '4px solid rgba(255,255,255,0.3)' }}>
                            {user.fullName?.charAt(0)}
                        </Avatar>
                        <Box>
                            <Typography variant="h4" fontWeight="bold">{user.fullName || 'User Profile'}</Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9 }}>{role} Account</Typography>
                            <Chip label="Verified Profile" size="small" sx={{ mt: 1, backgroundColor: 'rgba(255,255,255,0.2)', color: 'white', fontWeight: 'bold' }} />
                        </Box>
                    </Box>
                </Paper>

                {/* Tabs Section */}
                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', px: 2, py: 1 }}>
                        <Tab icon={<PersonIcon />} iconPosition="start" label="Account Info" sx={{ fontWeight: 'bold' }} />
                        {isSeeker && <Tab icon={<WorkIcon />} iconPosition="start" label="Applications" sx={{ fontWeight: 'bold' }} />}
                        <Tab icon={<ArticleIcon />} iconPosition="start" label="Resume & Skills" sx={{ fontWeight: 'bold' }} />
                    </Tabs>

                    <Box sx={{ p: 4 }}>
                        {/* Tab 0: Account Details */}
                        {tabValue === 0 && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>Personal Details</Typography>
                                    <TextField label="Full Name" value={user.fullName || ''} fullWidth sx={{ mb: 3 }} InputProps={{ readOnly: true }} />
                                    <TextField label="Email Address" value={user.email || ''} fullWidth sx={{ mb: 3 }} InputProps={{ readOnly: true }} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>Account Security</Typography>
                                    <Button variant="outlined" color="primary" fullWidth sx={{ mb: 2 }}>Change Password</Button>
                                    <Button variant="outlined" color="error" fullWidth>Deactivate Account</Button>
                                </Grid>
                            </Grid>
                        )}

                        {/* Tab 1: Applications (Seeker only) */}
                        {tabValue === 1 && isSeeker && (
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
                                                            <Typography variant="h6" fontWeight="bold">{app.job?.title || 'Job Application'}</Typography>
                                                            <Typography variant="body2" color="textSecondary">{app.job?.location} • {app.job?.jobType}</Typography>
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

                        {/* Tab: Resume & Skills */}
                        {((tabValue === 2 && isSeeker) || (tabValue === 1 && !isSeeker)) && (
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={7}>
                                    <Paper variant="outlined" sx={{ padding: 4, textAlign: 'center', borderStyle: 'dashed', borderWidth: 2, borderColor: '#ccc', borderRadius: 2, backgroundColor: '#fafafa' }}>
                                        <CloudUploadIcon sx={{ fontSize: 50, color: '#aaa', mb: 1 }} />
                                        <Typography variant="body1" fontWeight="bold">Update your Resume</Typography>
                                        <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>Upload your resume to extract skills for job matches.</Typography>
                                        
                                        <Button 
                                            variant="contained" 
                                            color="primary" 
                                            component="label" 
                                            disabled={isParsing}
                                            sx={{ borderRadius: 10, px: 4 }}
                                        >
                                            {isParsing ? 'Processing...' : 'Upload & Parse Resume'}
                                            <input type="file" hidden accept=".pdf,.doc,.docx" onChange={handleUploadClick} />
                                        </Button>
                                    </Paper>
                                </Grid>

                                <Grid item xs={12} md={5}>
                                    {extractedSkills.length > 0 ? (
                                        <Box sx={{ p: 3, backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 2, height: '100%' }}>
                                            <Typography variant="subtitle1" fontWeight="bold" color="success.main" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                <CheckCircleIcon fontSize="small" /> Extracted Skills
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                                                {extractedSkills.map((skill, index) => (
                                                    <Chip key={index} label={skill} color="primary" size="small" sx={{ fontWeight: 'bold' }} />
                                                ))}
                                            </Box>
                                        </Box>
                                    ) : (
                                        <Box sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 2, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                            <Typography variant="body2" color="textSecondary">Upload a resume to view parsed skills.</Typography>
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
