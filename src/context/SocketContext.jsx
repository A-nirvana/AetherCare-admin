'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { io} from 'socket.io-client';

const SocketContext = createContext({
  socket: null,
  isConnected: false,
  health:{},
  data:{},
  setHealth: () => {},
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [health, setHealth] = useState({});
  const [data, setData] = useState({})

  useEffect(() => {
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
    });

    socketInstance.on('connect', () => {
      console.log('Socket.IO: Connected');
      setIsConnected(true);
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket.IO: Disconnected');
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      console.log('Socket.IO: Disconnecting');
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected, health,setHealth, data, setData}}>
      {children}
    </SocketContext.Provider>
  );
};