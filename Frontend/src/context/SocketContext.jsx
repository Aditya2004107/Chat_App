import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
import io from "socket.io-client";

const socketContext = createContext();

export const useSocketContext = () => {
  return useContext(socketContext);
};

export const SocketProvider = ({ children }) => {
  const { authuser: authUser } = useAuth();
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  useEffect(() => {
    if (authUser?.user?._id) {
      const socket = io("http://localhost:5002/", {
        query: {
          userId: authUser.user._id,
        },
      });

      setSocket(socket);

      socket.on("getonline", (users) => {
        setOnlineUser(users);
        console.log("Users online:", users);
      });

      return () => {
        socket.disconnect();
        console.log("Socket disconnected");
      };
    } else {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <socketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </socketContext.Provider>
  );
};
