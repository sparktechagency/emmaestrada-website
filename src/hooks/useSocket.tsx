// hooks/useSocket.ts
"use client";

import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";
import { socketInstance } from "./context/socket";

export default function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    setSocket(socketInstance());
  }, []);

  return socket;
}
