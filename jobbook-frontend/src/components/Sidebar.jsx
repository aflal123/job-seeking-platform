import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import HomeIcon from '@mui/icons-material/Home'
import WorkIcon from '@mui/icons-material/Work'
import SchoolIcon from '@mui/icons-material/School'
import GroupsIcon from '@mui/icons-material/Groups'

import React from 'react'

const Sidebar = () => {
        const fullName = localStorage.getItem('fullName')
        const role = localStorage.getItem('role')
  return (
    <Box sx={{ padding: 2 }}>
  
  {/* User Profile Section */}
  <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
   <Avatar sx={{ width: 60, height: 60, margin: 'auto', marginBottom: 1, backgroundColor: '#1976d2' }}>{fullName?.charAt(0)}</Avatar>
    <Typography variant="h6">{fullName}</Typography>
    <Typography variant="body2" color="gray">{role}</Typography>
  </Box>

  {/* Navigation Links */}
  <Button fullWidth startIcon={<HomeIcon />} sx={{ justifyContent: 'flex-start', marginBottom: 1 }}>
  Home
</Button>
  <Button fullWidth startIcon={<WorkIcon />} sx={{ justifyContent: 'flex-start', marginBottom: 1 }}>
  Jobs
</Button>
  <Button fullWidth startIcon={<SchoolIcon />} sx={{ justifyContent: 'flex-start', marginBottom: 1 }}>
  Courses
</Button>
  <Button fullWidth startIcon={<GroupsIcon />} sx={{ justifyContent: 'flex-start', marginBottom: 1 }}>
  Community
</Button>
</Box>
  )
}

export default Sidebar
