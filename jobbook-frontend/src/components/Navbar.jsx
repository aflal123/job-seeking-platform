import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'



const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#1976d2' }}>
  <Toolbar>
    
    {/* Logo - Left */}
    <Typography variant="h6" sx={{ fontWeight: 'bold', flexGrow: 0, mr: 4 }}>
      JobBook
    </Typography>

    {/* Nav Links - Center */}
    <Box sx={{ flexGrow: 1 }}>
      <Button sx={{ color: 'white' }}>Home</Button>
      <Button sx={{ color: 'white' }}>Jobs</Button>
      <Button sx={{ color: 'white' }}>Courses</Button>
      <Button sx={{ color: 'white' }}>Community</Button>
    </Box>

    {/* Profile - Right */}
    <Typography sx={{ color: 'white' }}>Profile</Typography>

  </Toolbar>
</AppBar>
  )
}

export default Navbar
