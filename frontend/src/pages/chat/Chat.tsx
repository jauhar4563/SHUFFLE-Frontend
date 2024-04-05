import ChatUsers from "../../components/ChatComponents/ChatUsers";
import Messages from "../../components/ChatComponents/Messages";
import ChatingUser from "../../components/ChatComponents/ChatingUser";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getUserConversations, getUserMessages } from "../../services/api/user/apiMethods";
import {io} from 'socket.io-client';
import { BASE_URL } from "../../constants/baseUrls";


function Chat() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id;
  const [conversations, setConversations] = useState([]);
  const [currentChat,setCurrentChat] = useState('');
  // const [socket, setSocket] = useState(null);

  
  const socket = io.connect(BASE_URL);
  useEffect(()=> {
    socket.emit("newUser", currentChat);
    console.log("connected")
    return () => socket.disconnect()
  })


  useEffect(()=>{
    getUserConversations(userId).then((response)=>{
      setConversations(response.data);
    })
  },[])  



  return (
    <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
      <ChatUsers conversations={conversations} user={user} setCurrentChat={setCurrentChat}/>
      {(

      <Messages user={user} currentChat={currentChat} socket={socket}/>
      )}
      {/* <ChatingUser /> */}
    </div>
  );
}

export default Chat;
