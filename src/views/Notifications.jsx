import React from 'react'
import Navbar from '../components/Navbar'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { MoreHoriz as MoreIcon, Work as WorkIcon, People as PeopleIcon, Notifications as NotificationsIcon } from '@mui/icons-material'
import Sidebar from '../components/Sidebar'

const Notifications = () => {
    const notifications = [
        { id: 1, type: 'JOB', text: 'New Job Match: Senior React Developer at Google matches your profile.', time: '2h', icon: <WorkIcon sx={{ color: '#1976d2' }} />, unread: true },
        { id: 2, type: 'NETWORK', text: 'Sarah Chen accepted your connection request.', time: '5h', icon: <PeopleIcon sx={{ color: '#2e7d32' }} />, unread: true },
        { id: 3, type: 'SYSTEM', text: 'Welcome to JobBook! Complete your profile to get 2x more visibility.', time: '1d', icon: <NotificationsIcon sx={{ color: '#1976d2' }} />, unread: false },
        { id: 4, type: 'JOB', text: 'Amazon is hiring Software Engineers in your area.', time: '2d', icon: <WorkIcon sx={{ color: '#1976d2' }} />, unread: false },
    ]

    return (
        <Box sx={{ minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <Navbar />
            <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
                <Grid container spacing={3}>
                    {/* Left Sidebar */}
                    <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Sidebar />
                    </Grid>

                    {/* Center Content */}
                    <Grid item xs={12} md={6}>
                        <Paper elevation={0} sx={{ borderRadius: 3, overflow: 'hidden', border: '1px solid #e0e0e0' }}>
                            <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f0f0f0' }}>
                                <Typography variant="h6" fontWeight="bold">Notifications</Typography>
                                <Button size="small" sx={{ textTransform: 'none', fontWeight: 'bold' }}>Settings</Button>
                            </Box>

                            <List sx={{ p: 0 }}>
                                {notifications.map((note, index) => (
                                    <React.Fragment key={note.id}>
                                        <ListItem 
                                            alignItems="flex-start" 
                                            sx={{ 
                                                p: 3, 
                                                backgroundColor: note.unread ? '#e3f2fd' : 'transparent',
                                                cursor: 'pointer',
                                                '&:hover': { backgroundColor: note.unread ? '#bbdefb' : '#f5f5f5' }
                                            }}
                                        >
                                            <ListItemAvatar>
                                                <Avatar sx={{ bgcolor: 'white', border: '1px solid #eee' }}>
                                                    {note.icon}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="body1" sx={{ fontWeight: note.unread ? 'bold' : 'normal' }}>
                                                        {note.text}
                                                    </Typography>
                                                }
                                                secondary={
                                                    <Typography variant="caption" color="textSecondary">
                                                        {note.time} ago
                                                    </Typography>
                                                }
                                            />
                                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                                                <MoreIcon sx={{ color: 'text.secondary' }} />
                                                {note.unread && <Box sx={{ width: 8, height: 8, bgcolor: '#1976d2', borderRadius: '50%', alignSelf: 'center' }} />}
                                            </Box>
                                        </ListItem>
                                        {index < notifications.length - 1 && <Divider component="li" />}
                                    </React.Fragment>
                                ))}
                            </List>
                        </Paper>
                    </Grid>

                    {/* Right Info Section */}
                    <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid #e0e0e0', textAlign: 'center' }}>
                            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>Keep up with your network</Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>Don't miss out on new opportunities and connections.</Typography>
                            <Button variant="outlined" fullWidth sx={{ borderRadius: 10, fontWeight: 'bold' }}>Improve Profile</Button>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default Notifications
