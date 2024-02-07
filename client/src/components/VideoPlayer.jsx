import { useContext } from 'react'
import { SocketContext } from '../SocketContext'
import { Grid, Typography, Paper } from '@mui/material'

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext)

  return (
    <Grid
      container
      style={{
        justifyContent: 'center',
      }}
    >
      {/* {Our Video} */}
      {stream && (
        <Paper
          style={{ padding: '10px', border: '2px solid black', margin: '10px' }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || 'Name'}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              style={{ width: '550px' }}
            ></video>
          </Grid>
        </Paper>
      )}

      {/* {Users Video} */}
      {callAccepted && !callEnded && (
        <Paper
          style={{ padding: '10px', border: '2px solid black', margin: '10px' }}
        >
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Name
            </Typography>
            <video
              playsInline
              muted
              ref={userVideo}
              autoPlay
              style={{ width: '550px' }}
            ></video>
          </Grid>
        </Paper>
      )}
    </Grid>
  )
}
export default VideoPlayer
