import { useEffect } from "react";
import useConversation from "../statemanage/useConversation.js";
import { useSocketContext } from "./SocketContext.jsx";
import sound from "../assets/noti.mp3";

const useGetSocketMessage = () => {
  const { socket } = useSocketContext();
  const { setMessages } = useConversation(); // Remove messages dependency

  useEffect(() => {
    if (!socket) return; // Ensure socket is defined

    const handleNewMessage = (newMessage) => {
      const notification = new Audio(sound);
      notification.play();
      setMessages((prevMessages) => [...prevMessages, newMessage]); // Update messages safely
    };

    socket.on("newMessage", handleNewMessage);

    // Cleanup
    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, setMessages]); // Only socket and setMessages as dependencies
};

export default useGetSocketMessage;
