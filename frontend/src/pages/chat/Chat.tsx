import ChatUsers from "../../components/ChatComponents/ChatUsers";
import Messages from "../../components/ChatComponents/Messages";
import ChatingUser from "../../components/ChatComponents/ChatingUser";

function Chat() {
    
  return <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">

    <ChatUsers />
    <Messages />
    <ChatingUser />







</div>;
}

export default Chat;
