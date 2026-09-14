import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { postJob } from '../services/jobServices'
import { useNavigate } from 'react-router-dom'

const PostJob = () => {
    const navigate = useNavigate()
    const employerId = localStorage.getItem('userId')

    const [jobData, setJobData] = useState({
        title: '',
        description: '',
        location: '',
        salaryRange: '',
        jobType: ''
    })

    const handleChange = (e) => {
        setJobData({ ...jobData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!employerId) {
            alert("You must be logged in to post a job!")
            return
        }

        try {
            const response = await postJob(jobData, employerId)
            alert(response) // "Job posted successfully!"
            navigate('/jobs') // redirect to jobs page to see it
        } catch (error) {
            alert("Failed to post job. Please try again.")
        }
    }

    return (
        <>
            <Navbar />
            <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}>
                <Paper sx={{ padding: 4, width: '100%', maxWidth: 600 }}>
                    <Typography variant="h4" sx={{ marginBottom: 3, fontWeight: 'bold', color: '#1976d2' }}>
                        Post a New Job
                    </Typography>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <TextField 
                            label="Job Title" 
                            name="title"
                            value={jobData.title}
                            onChange={handleChange}
                            required 
                            fullWidth 
                        />
                        <TextField 
                            label="Location" 
                            name="location"
                            value={jobData.location}
                            onChange={handleChange}
                            required 
                            fullWidth 
                        />
                        <TextField 
                            label="Salary Range (e.g. $50k - $70k)" 
                            name="salaryRange"
                            value={jobData.salaryRange}
                            onChange={handleChange}
                            fullWidth 
                        />
                        <TextField 
                            select
                            label="Job Type" 
                            name="jobType"
                            value={jobData.jobType}
                            onChange={handleChange}
                            required 
                            fullWidth 
                        >
                            <MenuItem value="FULL_TIME">Full Time</MenuItem>
                            <MenuItem value="PART_TIME">Part Time</MenuItem>
                            <MenuItem value="REMOTE">Remote</MenuItem>
                            <MenuItem value="INTERNSHIP">Internship</MenuItem>
                            <MenuItem value="HYBRID">Hybrid</MenuItem>
                        </TextField>
                        <TextField 
                            label="Job Description" 
                            name="description"
                            value={jobData.description}
                            onChange={handleChange}
                            required 
                            fullWidth 
                            multiline
                            rows={4}
                        />
                        <Button type="submit" variant="contained" size="large" sx={{ marginTop: 2 }}>
                            Post Job
                        </Button>
                    </form>
                </Paper>
            </Box>
        </>
    )
}

export default PostJob
