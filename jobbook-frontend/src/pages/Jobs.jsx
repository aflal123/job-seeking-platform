import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Chip from '@mui/material/Chip'
import InputAdornment from '@mui/material/InputAdornment'
import { Search as SearchIcon, LocationOn as LocationIcon, Work as WorkIcon, AttachMoney as MoneyIcon } from '@mui/icons-material'
import { getJobs, applyForJob } from '../services/jobServices'

const Jobs = () => {
    const [jobs, setJobs] = useState([])
    const [location, setLocation] = useState('')
    const [jobType, setJobType] = useState('')
    const userId = localStorage.getItem('userId')
    const role = localStorage.getItem('role')

    const handleApply = async (jobId) => {
        if (role !== 'SEEKER') {
            alert("Only seekers can apply for jobs!")
            return
        }
        try {
            const response = await applyForJob(jobId, userId)
            alert(response)
        } catch (error) {
            const msg = error.response?.data
            alert(typeof msg === 'object' ? msg.message || 'Error occurred' : msg)
        }
    }

    const handleSearch = () => {
        getJobs(location, jobType).then(data => setJobs(data))
    }

    useEffect(() => {
        getJobs().then(data => setJobs(data))
    }, [])

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
            <Navbar />
            
            <Box sx={{ py: 6, px: 3, background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)', color: 'white', textAlign: 'center', mb: 4 }}>
                <Typography variant="h3" fontWeight="800" gutterBottom>Find Your Dream Job</Typography>
                <Typography variant="h6" sx={{ opacity: 0.9, mb: 4 }}>Browse thousands of open positions from top companies.</Typography>
                
                {/* Search Bar */}
                <Paper elevation={3} sx={{ p: 1, maxWidth: 900, mx: 'auto', display: 'flex', gap: 2, alignItems: 'center', borderRadius: 3, flexWrap: { xs: 'wrap', md: 'nowrap' } }}>
                    <TextField 
                        fullWidth
                        placeholder="Search by Location..." 
                        variant="standard" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)}
                        InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationIcon color="action" sx={{ ml: 1 }} />
                                </InputAdornment>
                            ),
                            sx: { px: 2, py: 1 }
                        }}
                    />
                    <Box sx={{ height: { md: '30px' }, width: { xs: '100%', md: '1px' }, backgroundColor: '#e0e0e0' }} />
                    <TextField 
                        select
                        variant="standard"
                        value={jobType} 
                        onChange={(e) => setJobType(e.target.value)}
                        sx={{ minWidth: 200, px: 2 }}
                        InputProps={{ disableUnderline: true }}
                    >
                        <MenuItem value="">All Job Types</MenuItem>
                        <MenuItem value="FULL_TIME">Full Time</MenuItem>
                        <MenuItem value="PART_TIME">Part Time</MenuItem>
                        <MenuItem value="REMOTE">Remote</MenuItem>
                        <MenuItem value="INTERNSHIP">Internship</MenuItem>
                        <MenuItem value="HYBRID">Hybrid</MenuItem>
                    </TextField>
                    <Button 
                        variant="contained" 
                        size="large" 
                        onClick={handleSearch}
                        startIcon={<SearchIcon />}
                        sx={{ borderRadius: 2, px: 4, py: 1.5, fontWeight: 'bold' }}
                    >
                        Search
                    </Button>
                </Paper>
            </Box>

            <Box sx={{ maxWidth: 1200, mx: 'auto', px: 3, pb: 6 }}>
                <Typography variant="h5" fontWeight="bold" sx={{ mb: 3 }}>
                    Latest Openings ({jobs.length})
                </Typography>

                <Grid container spacing={3}>
                    {jobs.length === 0 ? (
                        <Grid item xs={12}>
                            <Typography color="textSecondary" textAlign="center">No jobs found matching your criteria.</Typography>
                        </Grid>
                    ) : (
                        jobs.map((job) => (
                            <Grid item xs={12} md={6} key={job.id}>
                                <Paper 
                                    elevation={0} 
                                    sx={{ 
                                        p: 3, 
                                        borderRadius: 3, 
                                        border: '1px solid #eee',
                                        transition: '0.3s',
                                        '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }
                                    }}
                                >
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                        <Box>
                                            <Typography variant="h6" fontWeight="bold" color="primary">{job.title}</Typography>
                                            <Typography variant="subtitle2" color="textSecondary">{job.companyName || 'Top Employer'}</Typography>
                                        </Box>
                                        <Chip label={job.jobType} size="small" color="primary" variant="outlined" sx={{ fontWeight: 'bold' }} />
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                            <LocationIcon sx={{ fontSize: 18 }} />
                                            <Typography variant="body2">{job.location}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                            <MoneyIcon sx={{ fontSize: 18 }} />
                                            <Typography variant="body2">{job.salaryRange || 'Competitive'}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
                                            <WorkIcon sx={{ fontSize: 18 }} />
                                            <Typography variant="body2">Open</Typography>
                                        </Box>
                                    </Box>

                                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {job.description}
                                    </Typography>

                                    <Button 
                                        variant="contained" 
                                        fullWidth 
                                        sx={{ borderRadius: 2, py: 1, fontWeight: 'bold' }} 
                                        onClick={() => handleApply(job.id)}
                                        disabled={role !== 'SEEKER'}
                                    >
                                        Apply Now
                                    </Button>
                                </Paper>
                            </Grid>
                        ))
                    )}
                </Grid>
            </Box>
        </Box>
    )
}

export default Jobs
