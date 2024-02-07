
import {
  Button,
  TextField,
  Grid,
  Typography,
  Container,
  Paper,
} from '@mui/material'

import { CopyToClipboard } from 'react-copy-to-clipboard'
import {
  Assignment,
  Phone,
  PhoneDisabled,
  PhoneEnabled,
} from '@mui/icons-material'
import { useContext } from 'react'
import { SocketContext } from '../SocketContext'
import { useState } from 'react'

const Options = ({ children }) => {
  const { me, callAccepted, name, setName, leaveCall, callUser, callEnded } =
    useContext(SocketContext)
  const [idToCall, setIdToCall] = useState('')

  return (
    <Container style={{ width: '600px', margin: '35px 0', padding: 0 }}>
      <Paper
        elevation={10}
        style={{ padding: '10px 20px', border: '2px solid black' }}
      >
        <form
          style={{ display: 'flex', flexDirection: 'column' }}
          noValidate
          autoComplete="off"
        >
          <Grid container style={{ width: '100%' }}>
            <Grid item xs={12} md={6} style={{ padding: 20 }}>
              <Typography gutterBottom variant="h6">
                Account Info
              </Typography>
              <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
              />
              <CopyToClipboard text={me} style={{ marginTop: 20 }}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Assignment fontSize="large" />}
                >
                  Copy Your Id
                </Button>
              </CopyToClipboard>
            </Grid>

            <Grid item xs={12} md={6} style={{ padding: 20 }}>
              <Typography gutterBottom variant="h6">
                Make a Call
              </Typography>
              <TextField
                label="Id to Call"
                value={idToCall}
                onChange={(e) => setIdToCall(e.target.value)}
                fullWidth
              />
              {callAccepted && !callEnded ? (
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<PhoneEnabled fontSize="large" />}
                  fullWidth
                  onClick={leaveCall}
                  style={{ marginTop: 20 }}
                >
                  Hang Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Phone fontSize="large" />}
                  fullWidth
                  onClick={() => callUser(idToCall)}
                  style={{ marginTop: 20 }}
                >
                  Call
                </Button>
              )}
            </Grid>
          </Grid>
        </form>
        {children}
      </Paper>
    </Container>
  )
}
export default Options
