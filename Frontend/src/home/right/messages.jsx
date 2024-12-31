import Message from "./message.jsx";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import { useEffect, useRef } from "react";
import useGetSocketMessage from "../../context/useGetSocketMessage.jsx";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  useGetSocketMessage();
  const lastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);
  console.log("Rendering Messages component:");
  console.log("Messages state:", messages);

  const messageArray = Array.isArray(messages)
    ? messages
    : messages?.messages || [];

  return (
    <div style={{ minHeight: "calc(91vh - 15vh)" }}>
      {loading && <Loading />}

      {!loading && messageArray.length > 0 && (
        <div>
          {messageArray.map((message) => (
            // <Message key={message._id} message={message} />
            <div key={message._id} ref={lastMessageRef}>
              <Message message={message} />
            </div>
          ))}
        </div>
      )}

      {!loading && messageArray.length === 0 && (
        <div>
          <p className="text-center mt-[20%] font-sans">Say! Hi</p>
        </div>
      )}
    </div>
  );
};

export default Messages;
