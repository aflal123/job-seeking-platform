import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemAvatar from '@mui/material/ListItemAvatar'
import ListItemText from '@mui/material/ListItemText'
import Divider from '@mui/material/Divider'
import { TrendingUp as TrendingIcon, Info as InfoIcon } from '@mui/icons-material'

const RightSidebar = () => {
    const suggestions = [
        { name: 'Sarah Chen', role: 'Product Manager at Google', initial: 'S', color: '#e91e63' },
        { name: 'Alex Rivera', role: 'Senior Developer at Meta', initial: 'A', color: '#673ab7' },
        { name: 'Jordan Smith', role: 'HR Manager at Amazon', initial: 'J', color: '#ff9800' },
    ]

    const news = [
        { title: 'The Future of Remote Work', readers: '12,432 readers' },
        { title: 'Top Skills for 2026', readers: '8,102 readers' },
        { title: 'Job Market Trends in Tech', readers: '5,671 readers' },
    ]

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* People Suggestions */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Add to your feed</Typography>
                    <InfoIcon sx={{ fontSize: 16, color: 'text.secondary', cursor: 'pointer' }} />
                </Box>
                
                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {suggestions.map((person, index) => (
                        <React.Fragment key={person.name}>
                            <ListItem alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                                <ListItemAvatar>
                                    <Avatar sx={{ bgcolor: person.color }}>{person.initial}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography variant="subtitle2" fontWeight="bold">{person.name}</Typography>}
                                    secondary={
                                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block' }}>
                                            {person.role}
                                        </Typography>
                                    }
                                />
                                <Button size="small" variant="outlined" sx={{ borderRadius: 5, textTransform: 'none', fontWeight: 'bold', ml: 1 }}>
                                    + Follow
                                </Button>
                            </ListItem>
                            {index < suggestions.length - 1 && <Divider variant="inset" component="li" sx={{ ml: 7 }} />}
                        </React.Fragment>
                    ))}
                </List>
                <Button fullWidth sx={{ textTransform: 'none', fontWeight: 'bold', mt: 1, color: 'text.secondary' }}>
                    View all recommendations →
                </Button>
            </Paper>

            {/* Trending News */}
            <Paper elevation={0} sx={{ p: 2, borderRadius: 3, border: '1px solid #e0e0e0' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold">JobBook News</Typography>
                    <TrendingIcon sx={{ fontSize: 18, color: '#1976d2' }} />
                </Box>

                <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                    {news.map((item, index) => (
                        <ListItem key={item.title} sx={{ px: 0, py: 1, flexDirection: 'column', alignItems: 'flex-start', cursor: 'pointer', '&:hover': { bgcolor: '#f5f5f5' } }}>
                            <Typography variant="body2" fontWeight="bold" sx={{ lineHeight: 1.2 }}>
                                • {item.title}
                            </Typography>
                            <Typography variant="caption" color="textSecondary" sx={{ ml: 1.5, mt: 0.5 }}>
                                {item.readers}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </Paper>

            {/* Sticky Footer */}
            <Box sx={{ px: 2, textAlign: 'center' }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                    About • Accessibility • Help Center
                </Typography>
                <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mb: 1 }}>
                    Privacy & Terms • Ad Choices
                </Typography>
                <Typography variant="caption" fontWeight="bold" color="primary">
                    JobBook Corporation © 2026
                </Typography>
            </Box>
        </Box>
    )
}

export default RightSidebar
