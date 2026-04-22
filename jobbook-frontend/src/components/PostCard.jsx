import React from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import CommentIcon from '@mui/icons-material/Comment'
import ShareIcon from '@mui/icons-material/Share'

const PostCard = () => {
  return (
    <Paper elevation={2} sx={{ padding: 2, marginBottom: 2 }}>
  
  {/* User Info */}
  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
    <Avatar sx={{ backgroundColor: '#1976d2', marginRight: 2 }}>A</Avatar>
    <Box>
      <Typography variant="subtitle1" fontWeight="bold">Aflal</Typography>
      <Typography variant="caption" color="gray">2 hours ago</Typography>
    </Box>
  </Box>

  {/* Post Content */}
  <Typography variant="body1" sx={{ marginBottom: 2 }}>
    This is a sample post content! 🎉
  </Typography>

  {/* Action Buttons */}
  <Box sx={{ display: 'flex', gap: 1 }}>
    <Button startIcon={<ThumbUpIcon />}>Like</Button>
    <Button startIcon={<CommentIcon />}>Comment</Button>
    <Button startIcon={<ShareIcon />}>Share</Button>
  </Box>

</Paper>
  )
}

export default PostCard
