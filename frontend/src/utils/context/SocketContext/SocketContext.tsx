import { createContext, useContext, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { BASE_URL } from "../../../constants/baseUrls";

const SocketContext: any = createContext(undefined);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: any) => {
  const socket = useRef<any>(null);
  const selectUser: any = (state: any) => state.auth.user;
  const user: any = useSelector(selectUser);
  const userId: string = user?._id || "";
  useEffect(() => {
    socket.current = io(BASE_URL);
    if (user) {
      socket.current.emit("addUser", userId);
    }

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
