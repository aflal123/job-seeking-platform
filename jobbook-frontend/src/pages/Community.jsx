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

const Community = () => {
    const fullName = localStorage.getItem('fullName')
    const [postContent, setPostContent] = useState('')

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f3f4f6' }}>
            <Navbar />
            <Box sx={{ padding: { xs: 2, md: 3 }, maxWidth: 1200, margin: '0 auto' }}>
                <Grid container spacing={3}>
                    {/* Left Sidebar */}
                    <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Sidebar />
                    </Grid>

                    {/* Center Feed */}
                    <Grid item xs={12} md={6}>
                        {/* Start a Post */}
                        <Paper elevation={0} sx={{ padding: 2, borderRadius: 2, mb: 3, border: '1px solid #e0e0e0' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ backgroundColor: '#1976d2', mr: 2 }}>{fullName?.charAt(0)}</Avatar>
                                <TextField
                                    fullWidth
                                    placeholder="Start a post"
                                    variant="outlined"
                                    size="small"
                                    value={postContent}
                                    onChange={(e) => setPostContent(e.target.value)}
                                    sx={{ 
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: 10,
                                            backgroundColor: '#f9fafb'
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 1 }}>
                                <Button startIcon={<PhotoIcon color="primary" />} sx={{ color: 'text.secondary', textTransform: 'none' }}>Media</Button>
                                <Button startIcon={<VideoIcon color="success" />} sx={{ color: 'text.secondary', textTransform: 'none' }}>Video</Button>
                                <Button startIcon={<EventIcon color="warning" />} sx={{ color: 'text.secondary', textTransform: 'none' }}>Event</Button>
                                <Button startIcon={<ArticleIcon color="error" />} sx={{ color: 'text.secondary', textTransform: 'none' }}>Article</Button>
                            </Box>
                        </Paper>

                        {/* Feed */}
                        <Box>
                            <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 2, textAlign: 'center' }}>
                                — Trending Posts —
                            </Typography>
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

export default Community
