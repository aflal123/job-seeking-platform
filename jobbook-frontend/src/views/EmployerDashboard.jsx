import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { getEmployerJobs, getJobApplications, updateApplicationStatus, postJob } from '../services/jobServices'
import { useNavigate } from 'react-router-dom'

const EmployerDashboard = () => {
    const employerId = localStorage.getItem('userId')
    const navigate = useNavigate()
    const [tabValue, setTabValue] = useState(0)
    
    // Management State
    const [jobs, setJobs] = useState([])
    const [selectedJob, setSelectedJob] = useState(null)
    const [applications, setApplications] = useState([])

    // Post Job State
    const [jobData, setJobData] = useState({
        title: '', description: '', location: '', salaryRange: '', jobType: ''
    })

    const fetchJobs = async () => {
        if (employerId) {
            const data = await getEmployerJobs(employerId)
            setJobs(data)
        }
    }

    useEffect(() => {
        fetchJobs()
    }, [employerId])

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    const handleSelectJob = async (job) => {
        setSelectedJob(job)
        const apps = await getJobApplications(job.id)
        setApplications(apps)
    }

    const handleStatusUpdate = async (appId, newStatus) => {
        try {
            await updateApplicationStatus(appId, newStatus)
            const apps = await getJobApplications(selectedJob.id)
            setApplications(apps)
        } catch (error) {
            alert("Failed to update status")
        }
    }

    const handleJobChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value })
    }

    const handlePostJob = async (e) => {
        e.preventDefault()
        try {
            await postJob(jobData, employerId)
            alert("Job posted successfully!")
            setJobData({ title: '', description: '', location: '', salaryRange: '', jobType: '' })
            setTabValue(0) // Switch back to manage tab
            fetchJobs() // Refresh list
        } catch (error) {
            alert("Failed to post job.")
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
            <Navbar />
            <Box sx={{ padding: { xs: 2, md: 5 }, maxWidth: 1200, margin: '0 auto' }}>
                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Box sx={{ backgroundColor: '#1976d2', padding: 3, color: 'white' }}>
                        <Typography variant="h4" fontWeight="bold">Employer Hub</Typography>
                        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>Manage your job listings and find top talent.</Typography>
                    </Box>
                    
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', paddingX: 2 }}>
                        <Tab label="Manage Applications" sx={{ fontWeight: 'bold' }} />
                        <Tab label="Post a New Job" sx={{ fontWeight: 'bold' }} />
                    </Tabs>

                    <Box sx={{ padding: 4 }}>
                        {/* TAB 0: Manage Jobs */}
                        {tabValue === 0 && (
                            <Grid container spacing={4}>
                                <Grid item xs={12} md={5}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>Active Listings</Typography>
                                    {jobs.length === 0 ? <Typography color="textSecondary">No jobs posted yet.</Typography> : null}
                                    {jobs.map(job => (
                                        <Paper 
                                            key={job.id} 
                                            elevation={selectedJob?.id === job.id ? 3 : 1}
                                            sx={{ 
                                                padding: 2.5, 
                                                marginBottom: 2, 
                                                cursor: 'pointer',
                                                borderRadius: 2,
                                                borderLeft: selectedJob?.id === job.id ? '6px solid #1976d2' : '6px solid transparent',
                                                transition: 'all 0.2s ease-in-out',
                                                '&:hover': { transform: 'translateY(-2px)', boxShadow: 3 }
                                            }}
                                            onClick={() => handleSelectJob(job)}
                                        >
                                            <Typography variant="h6" fontWeight="bold" color="#333">{job.title}</Typography>
                                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>{job.location} • {job.jobType}</Typography>
                                            <Chip label={job.status} size="small" color={job.status === 'OPEN' ? 'success' : 'default'} sx={{ fontWeight: 'bold' }} />
                                        </Paper>
                                    ))}
                                </Grid>

                                <Grid item xs={12} md={7}>
                                    <Typography variant="h6" fontWeight="bold" gutterBottom>
                                        {selectedJob ? `Applicants: ${selectedJob.title}` : 'Select a listing'}
                                    </Typography>
                                    
                                    {!selectedJob && (
                                        <Box sx={{ textAlign: 'center', padding: 5, color: 'text.secondary', backgroundColor: '#f9fafb', borderRadius: 2 }}>
                                            Select a job from the left to review applicants.
                                        </Box>
                                    )}

                                    {selectedJob && applications.length === 0 && (
                                        <Typography color="textSecondary">No applicants yet for this position.</Typography>
                                    )}

                                    {applications.map(app => (
                                        <Paper key={app.id} elevation={1} sx={{ padding: 3, marginBottom: 2, borderRadius: 2, border: '1px solid #eee' }}>
                                            <Grid container justifyContent="space-between" alignItems="flex-start">
                                                <Grid item xs={12} sm={8}>
                                                    <Typography variant="h6" fontWeight="bold" color="#1976d2">{app.applicant.fullName}</Typography>
                                                    <Typography variant="body2" color="textSecondary" gutterBottom>{app.applicant.email}</Typography>
                                                    <Box sx={{ mt: 1 }}>
                                                        <Typography component="span" variant="body2" sx={{ mr: 1, fontWeight: 'bold' }}>Status:</Typography>
                                                        <Chip label={app.status} size="small" color={app.status === 'SHORTLISTED' ? 'success' : app.status === 'REJECTED' ? 'error' : 'warning'} sx={{ fontWeight: 'bold' }} />
                                                    </Box>
                                                </Grid>
                                                <Grid item xs={12} sm={4} sx={{ textAlign: { xs: 'left', sm: 'right' }, mt: { xs: 2, sm: 0 } }}>
                                                    <Button 
                                                        variant="contained" 
                                                        color="success" 
                                                        size="small"
                                                        sx={{ mb: 1, width: '100%', fontWeight: 'bold' }}
                                                        onClick={() => handleStatusUpdate(app.id, 'SHORTLISTED')}
                                                        disabled={app.status === 'SHORTLISTED'}
                                                    >
                                                        Shortlist
                                                    </Button>
                                                    <Button 
                                                        variant="outlined" 
                                                        color="error"
                                                        size="small"
                                                        sx={{ width: '100%', fontWeight: 'bold' }}
                                                        onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                                                        disabled={app.status === 'REJECTED'}
                                                    >
                                                        Reject
                                                    </Button>
                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    ))}
                                </Grid>
                            </Grid>
                        )}

                        {/* TAB 1: Post Job */}
                        {tabValue === 1 && (
                            <Box sx={{ maxWidth: 800, margin: '0 auto' }}>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>Create a New Listing</Typography>
                                <Typography variant="body2" color="textSecondary" sx={{ mb: 4 }}>Fill out the details below to publish a new open position to the platform.</Typography>
                                
                                <form onSubmit={handlePostJob}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Job Title" name="title" value={jobData.title} onChange={handleJobChange} required fullWidth variant="filled" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Location" name="location" value={jobData.location} onChange={handleJobChange} required fullWidth variant="filled" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField label="Salary Range" name="salaryRange" value={jobData.salaryRange} onChange={handleJobChange} fullWidth variant="filled" placeholder="e.g. $50k - $70k" />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField select label="Job Type" name="jobType" value={jobData.jobType} onChange={handleJobChange} required fullWidth variant="filled">
                                                <MenuItem value="FULL_TIME">Full Time</MenuItem>
                                                <MenuItem value="PART_TIME">Part Time</MenuItem>
                                                <MenuItem value="REMOTE">Remote</MenuItem>
                                                <MenuItem value="INTERNSHIP">Internship</MenuItem>
                                                <MenuItem value="HYBRID">Hybrid</MenuItem>
                                            </TextField>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField label="Job Description" name="description" value={jobData.description} onChange={handleJobChange} required fullWidth multiline rows={6} variant="filled" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" size="large" sx={{ py: 1.5, px: 4, fontWeight: 'bold', fontSize: '1.1rem' }}>
                                                Publish Job
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}

export default EmployerDashboard
