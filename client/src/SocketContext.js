import React, { createContext, useState, useRef, useEffect } from 'react'
import { io } from 'socket.io-client'
import Peer from 'simple-peer'

const SocketContext = createContext()

const socket = io('https:localhost:5000')

const ContextProvider = ({ children }) => {
  const [stream, setStream] = useState(null)
  const [me, setMe] = useState('')
  const [call, setCall] = useState({})
  const [callAccepted, setCallAccepted] = useState(false)
  const [callEnded, setCallEnded] = useState(false)
  const [name, setName] = useState('')

  const myVideo = useRef()
  const userVideo = useRef()
  const connectionRef = useRef()

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentStream) => {
        setStream(currentStream)
        setTimeout(() => {
          if (myVideo.current) {
            myVideo.current.srcObject = currentStream
          }
        }, 100)
      })
  }, [])

  useEffect(() => {
    // navigator.mediaDevices
    //   .getUserMedia({ video: true, audio: true })
    //   .then((currentStream) => {
    //     setStream(currentStream)
    //     if (myVideo.current) {
    //       myVideo.current.srcObject = currentStream
    //     }
    //   })

    socket.on('me', (id) => {
      setMe(id)
    })

    socket.on('callUser', ({ from, name: callerName, signal }) => {
      setCall({ isRecieveingCall: true, from, name: callerName, signal })
    })
  }, [])

  const answerCall = () => {
    setCallAccepted(true)
    const peer = new Peer({ initiator: false, trickle: false, stream })
    peer.on('signal', (data) => {
      console.log('----------------' + data.to)
      console.log('----------------SS' + data.signal)
      socket.emit('answerCall', { signal: data, to: call.from })
    })
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    peer.signal(call.signal)
    connectionRef.current = peer
  }

  const callUser = (id) => {
    console.log(id)
    const peer = new Peer({ initiator: true, trickle: false, stream })
    peer.on('signal', (data) => {
      console.log('----------------' + data)
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      })
    })
    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream
    })

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true)
      peer.signal(signal)
    })
    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()

    window.location.reload()
  }

  return (
    <SocketContext.Provider
      value={{
        stream,
        me,
        call,
        callAccepted,
        callEnded,
        name,
        setName,
        myVideo,
        userVideo,
        connectionRef,
        answerCall,
        callUser,
        leaveCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export { ContextProvider, SocketContext }
