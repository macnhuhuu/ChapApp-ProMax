'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { io as ClientIO, Socket } from 'socket.io-client'

type SocketContextType = {
  socket: Socket | null // Định rõ kiểu `Socket` từ thư viện socket.io-client
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

export const useSocket = () => {
  return useContext(SocketContext)
}

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null) // Xác định kiểu `Socket`
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const socketInstance: Socket = ClientIO(process.env.NEXT_PUBLIC_SITE_URL!, {
      path: '/api/socket/io',
      addTrailingSlash: true,
    })

    socketInstance.on('connect', () => {
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}
