import axios from "axios";
import { useState } from "react";
import useConversation from "../statemanage/useConversation.js";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages = [], setMessage, selectedConversation } = useConversation();

  const sendMessages = async (message) => {
    if (!selectedConversation || !selectedConversation._id) {
      console.error("No conversation selected.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );

      if (!Array.isArray(messages)) {
        console.error("Messages should be an array.");
        setMessage([res.data]);
      } else {
        setMessage([...messages, res.data]);
      }
    } catch (error) {
      console.error("Error in sending messages:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessages };
};

export default useSendMessage;
