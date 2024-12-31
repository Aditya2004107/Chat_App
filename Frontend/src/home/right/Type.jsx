import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Type() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (!message.trim()) {
      console.error("Message is empty. Cannot send.");
      return;
    }

    try {
      await sendMessages(message);
      setMessage(""); 
    } catch (error) {
      console.error("Error while sending the message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex space-x-1 h-[8vh] bg-gray-800">
        <div className="w-[70%] mx-4">
          <input
            type="text"
            placeholder="Type here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border-[1px] border-gray-700 flex items-center w-full py-3 px-3 rounded-xl grow outline-none bg-slate-900 mt-1"
            disabled={loading} 
          />
        </div>
        <button type="submit" disabled={loading}>
          {" "}
         
          <IoSend className={`text-3xl ${loading ? "text-gray-500" : ""}`} />
        </button>
      </div>
    </form>
  );
}

export default Type;
