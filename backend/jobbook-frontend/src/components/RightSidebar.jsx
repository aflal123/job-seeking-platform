import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'


import React from 'react'

const RightSidebar = () => {
  return (
   <Paper elevation={2} sx={{ padding: 2 }}>
  <Typography variant="h6" sx={{ marginBottom: 2 }}>
    People you may know
  </Typography>

  {/* Person 1 */}
  <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
    <Avatar sx={{ marginRight: 2, backgroundColor: '#1976d2' }}>J</Avatar>
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="subtitle2" fontWeight="bold">John</Typography>
      <Typography variant="caption" color="gray">Employer</Typography>
    </Box>
    <Button size="small" variant="outlined">Connect</Button>
  </Box>

</Paper>
  )
}

export default RightSidebar
