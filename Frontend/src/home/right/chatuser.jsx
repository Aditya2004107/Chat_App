import { useSocketContext } from "../../context/SocketContext.jsx";
import useConversation from "../../statemanage/useConversation.js";

const chatuser = () => {
  const { selectedConversation } = useConversation();
  const { onlineUser } = useSocketContext();
  const getOnlineUserStatus = (userId) => {
    return onlineUser.includes(userId) ? "Online" : "Offline";
  };
  return (
    <>
      <div className=" pl-5 pt-5 pb-3 h-[15vh] flex space-x-4 bg-gray-900 hover:bg-gray-600 duration-300">
        <div>
          <div className={`avatar online  `}>
            <div className="w-14 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl">{selectedConversation.name}</h1>
          <span className="text-sm">
            {getOnlineUserStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </>
  );
};

export default chatuser;
