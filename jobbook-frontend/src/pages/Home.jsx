import React from 'react'
import Navbar from '../components/Navbar'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Sidebar from '../components/Sidebar'
import PostCard from '../components/PostCard'
import RightSidebar from '../components/RightSidebar'



const Home = () => {
  return (
  <><Navbar />
  <Box sx={{ padding: 2 }}>
  <Grid container spacing={2}>
    <Grid item xs={3}>
      {/* Left Sidebar */}
      <Sidebar/>
    </Grid>
    <Grid item xs={6}>
      {/* Center Feed */}
        <PostCard />
        <PostCard />
        <PostCard />
    </Grid>
    <Grid item xs={3}>
      {/* Right Sidebar */}
      <RightSidebar/>
    </Grid>
  </Grid>
</Box></>
  

  )
}

export default Home
