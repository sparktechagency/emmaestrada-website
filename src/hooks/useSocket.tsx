import { useMemo } from 'react'
import { io } from 'socket.io-client'

export default function useSocket() {
    // const socket = useMemo(()=>io(process.env.NEXT_PUBLIC_SOCKET_URL),[])
    const socket = useMemo(()=>io(process.env.SOCKET_URL),[])

    return socket
}
