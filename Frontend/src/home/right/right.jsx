import { useAuth } from "../../context/AuthProvider.jsx";
import useConversation from "../../statemanage/useConversation.js";
import Chatuser from "./chatuser";
import Messages from "./messages.jsx";
import Type from "./type";

const Right = () => {
  const { selectedConversation } = useConversation();

  return (
    <div className="w-full bg-slate-800 text-white">
      <div>
        {!selectedConversation ? (
          <Nochat />
        ) : (
          <>
            <Chatuser />
            <div
              className="py-2 flex-adi overflow-y-auto"
              style={{ maxHeight: "calc(91vh - 15vh)" }}
            >
              <Messages />
            </div>
            <Type />
          </>
        )}
      </div>
    </div>
  );
};

const Nochat = () => {
  const { authUser } = useAuth(); 
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="font-semibold text-xl text-center">
        Welcome{useConversation._id}
        <br />
        <br />
        Select a Conversation to Start a Chat
      </h1>
    </div>
  );
};

export default Right;
