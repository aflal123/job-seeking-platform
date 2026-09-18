import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Sidebar from '../components/Sidebar'
import PostCard from '../components/PostCard'
import RightSidebar from '../components/RightSidebar'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { PhotoSizeSelectActual as PhotoIcon, VideoLibrary as VideoIcon, Event as EventIcon, Article as ArticleIcon } from '@mui/icons-material'

const Home = () => {
    const fullName = localStorage.getItem('fullName')
    const [postContent, setPostContent] = useState('')

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Navbar />
            <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
                <Grid container spacing={3}>
                    {/* Left Sidebar */}
                    <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Sidebar />
                    </Grid>

                    {/* Center Feed */}
                    <Grid item xs={12} md={6}>
                        {/* Create Post Section */}
                        <Paper elevation={0} sx={{ p: 2, borderRadius: 3, mb: 3, border: '1px solid #e0e0e0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ backgroundColor: '#1976d2', mr: 2 }}>{fullName?.charAt(0)}</Avatar>
                                <TextField
                                    fullWidth
                                    placeholder={`What's on your mind, ${fullName?.split(' ')[0]}?`}
                                    variant="outlined"
                                    size="small"
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 8,
                                            backgroundColor: '#f8f9fa'
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', pt: 1.5 }}>
                                <Button startIcon={<PhotoIcon color="primary" />} sx={{ color: '#666', textTransform: 'none', fontWeight: 'bold' }}>Photo</Button>
                                <Button startIcon={<VideoIcon color="success" />} sx={{ color: '#666', textTransform: 'none', fontWeight: 'bold' }}>Video</Button>
                                <Button startIcon={<ArticleIcon color="warning" />} sx={{ color: '#666', textTransform: 'none', fontWeight: 'bold' }}>Write Article</Button>
                            </Box>
                        </Paper>

                        {/* Posts List */}
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <PostCard />
                            <PostCard />
                            <PostCard />
                        </Box>
                    </Grid>

                    {/* Right Sidebar */}
                    <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <RightSidebar />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Home
