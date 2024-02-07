import React from 'react'
import { AppBar, Typography } from '@mui/material'
import Notifications from './components/Notifications'
import Options from './components/Options'
import VideoPlayer from './components/VideoPlayer'
import './App.css'

function App() {
  return (
    <div className="wrapper">
      <AppBar
        style={{
          width: 500,
          border: '2px solid black',
          borderRadius: 15,
          margin: '30px 100px',
        }}
        position="static"
        color="inherit"
      >
        <Typography variant="h3" align="center">
          Video Chat
        </Typography>
      </AppBar>
      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </div>
  )
}

export default App
