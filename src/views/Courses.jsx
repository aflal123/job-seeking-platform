import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TextField from '@mui/material/TextField'
import { PlayCircle as PlayCircleIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material'
import { getAllCourses, getMyEnrollments, enrollCourse, createCourse, getCoursesByTrainer } from '../services/courseServices'

const Courses = () => {
    const userId = localStorage.getItem('userId')
    const role = localStorage.getItem('role')
    const [tabValue, setTabValue] = useState(0)

    const [allCourses, setAllCourses] = useState([])
    const [myEnrollments, setMyEnrollments] = useState([])
    const [trainerCourses, setTrainerCourses] = useState([])

    const [courseData, setCourseData] = useState({
        title: '', description: '', fileUrl: ''
    })

    const fetchExploreCourses = async () => {
        const data = await getAllCourses()
        setAllCourses(data)
    }

    const fetchMyEnrollments = async () => {
        if (userId) {
            const data = await getMyEnrollments(userId)
            setMyEnrollments(data)
        }
    }

    const fetchTrainerCourses = async () => {
        if (userId && role === 'TRAINER') {
            const data = await getCoursesByTrainer(userId)
            setTrainerCourses(data)
        }
    }

    useEffect(() => {
        fetchExploreCourses()
        fetchMyEnrollments()
        fetchTrainerCourses()
    }, [userId, role])

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    const handleEnroll = async (courseId) => {
        if (!userId) {
            alert("Please login to enroll.")
            return
        }
        if (role !== 'SEEKER') {
            alert("Only seekers can enroll in courses.")
            return
        }
        try {
            await enrollCourse(courseId, userId)
            alert("Enrolled successfully!")
            fetchMyEnrollments()
            setTabValue(1) // switch to enrollments tab
        } catch (error) {
            alert(error.response?.data || "Failed to enroll")
        }
    }

    const handleCourseChange = (e) => {
        setCourseData({ ...courseData, [e.target.name]: e.target.value })
    }

    const handleUploadCourse = async (e) => {
        e.preventDefault()
        try {
            await createCourse(courseData, userId)
            alert("Course uploaded successfully!")
            setCourseData({ title: '', description: '', fileUrl: '' })
            fetchTrainerCourses()
            setTabValue(2) // switch to my uploads
        } catch (error) {
            alert("Failed to upload course.")
        }
    }

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f4f6f8' }}>
            <Navbar />
            <Box sx={{ padding: { xs: 2, md: 5 }, maxWidth: 1200, margin: '0 auto' }}>
                <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}>
                    <Box sx={{ backgroundColor: '#2e7d32', padding: 3, color: 'white' }}>
                        <Typography variant="h4" fontWeight="bold">Learning Hub</Typography>
                        <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>Upskill yourself with top-tier courses.</Typography>
                    </Box>
                    
                    <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: 'divider', paddingX: 2 }}>
                        <Tab label="Explore Courses" sx={{ fontWeight: 'bold' }} />
                        {role === 'SEEKER' && <Tab label="My Learning" sx={{ fontWeight: 'bold' }} />}
                        {role === 'TRAINER' && <Tab label="Upload Course" sx={{ fontWeight: 'bold' }} />}
                        {role === 'TRAINER' && <Tab label="My Uploads" sx={{ fontWeight: 'bold' }} />}
                    </Tabs>

                    <Box sx={{ padding: 4 }}>
                        {/* TAB 0: Explore */}
                        {tabValue === 0 && (
                            <Grid container spacing={3}>
                                {allCourses.length === 0 && <Typography sx={{ width: '100%', mt: 2, textAlign: 'center' }}>No courses available.</Typography>}
                                {allCourses.map(course => (
                                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                                        <Paper elevation={1} sx={{ padding: 3, height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2, transition: '0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 } }}>
                                            <PlayCircleIcon sx={{ fontSize: 40, color: '#2e7d32', mb: 1 }} />
                                            <Typography variant="h6" fontWeight="bold">{course.title}</Typography>
                                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2, flexGrow: 1 }}>{course.description}</Typography>
                                            <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>Trainer ID: {course.trainer?.id}</Typography>
                                            <Button variant="contained" color="success" onClick={() => handleEnroll(course.id)} disabled={role !== 'SEEKER'}>
                                                Enroll Now
                                            </Button>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        {/* TAB 1: My Learning (Seeker) */}
                        {tabValue === 1 && role === 'SEEKER' && (
                            <Grid container spacing={3}>
                                {myEnrollments.length === 0 && <Typography sx={{ width: '100%', mt: 2, textAlign: 'center' }}>You haven't enrolled in any courses yet.</Typography>}
                                {myEnrollments.map(enrollment => (
                                    <Grid item xs={12} sm={6} md={4} key={enrollment.id}>
                                        <Paper elevation={1} sx={{ padding: 3, borderRadius: 2, borderLeft: '6px solid #2e7d32' }}>
                                            <Typography variant="h6" fontWeight="bold">{enrollment.course.title}</Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, gap: 1 }}>
                                                <CheckCircleIcon color="success" />
                                                <Typography variant="body2" fontWeight="bold">Progress: {enrollment.progress}%</Typography>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}

                        {/* TAB 1 (if Trainer) / TAB 2: Upload Course */}
                        {((tabValue === 1 && role === 'TRAINER') || (tabValue === 2 && role === 'TRAINER')) && (
                            <Box sx={{ maxWidth: 600, margin: '0 auto' }}>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>Upload New Course</Typography>
                                <form onSubmit={handleUploadCourse}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12}>
                                            <TextField label="Course Title" name="title" value={courseData.title} onChange={handleCourseChange} required fullWidth variant="filled" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField label="Video URL / File Link" name="fileUrl" value={courseData.fileUrl} onChange={handleCourseChange} required fullWidth variant="filled" placeholder="e.g. YouTube or Drive Link" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField label="Course Description" name="description" value={courseData.description} onChange={handleCourseChange} required fullWidth multiline rows={4} variant="filled" />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Button type="submit" variant="contained" color="success" size="large" sx={{ py: 1.5, px: 4, fontWeight: 'bold' }}>
                                                Publish Course
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Box>
                        )}

                        {/* TAB 2 / 3: My Uploads (Trainer) */}
                        {((tabValue === 2 && role === 'TRAINER') || (tabValue === 3 && role === 'TRAINER')) && (
                            <Grid container spacing={3}>
                                {trainerCourses.length === 0 && <Typography sx={{ width: '100%', mt: 2, textAlign: 'center' }}>You haven't uploaded any courses yet.</Typography>}
                                {trainerCourses.map(course => (
                                    <Grid item xs={12} sm={6} md={4} key={course.id}>
                                        <Paper elevation={1} sx={{ padding: 3, borderRadius: 2 }}>
                                            <Typography variant="h6" fontWeight="bold">{course.title}</Typography>
                                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>{course.description}</Typography>
                                            <Chip label="Published" color="success" size="small" />
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        )}
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}

export default Courses
