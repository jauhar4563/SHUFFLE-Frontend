// SocketContext.tsx
import React, { createContext, useContext, useEffect,  useState } from "react";
import { io, Socket } from "socket.io-client";
import { BASE_URL } from "../../../constants/baseUrls";

type SocketContextType = {
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({ socket: null });

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider: React.FC = ({ children }:any) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(BASE_URL);
    setSocket(newSocket);
    console.log("Socket Context");
    console.log(socket);
    

  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
