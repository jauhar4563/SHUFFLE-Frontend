import ChatUsers from "../../components/ChatComponents/ChatUsers";
import Messages from "../../components/ChatComponents/Messages";
import ChatingUser from "../../components/ChatComponents/ChatingUser";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getUserConversations,
  getUserDetails,
  getUserMessages,
} from "../../services/api/user/apiMethods";
import { io } from "socket.io-client";
import { BASE_URL } from "../../constants/baseUrls";

function Chat() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    socket.current = io(BASE_URL);
    socket.current.on("getMessage", (data) => {
      console.log("Received message:", data);
      const senderId = data.senderId;
      getUserDetails(senderId).then((response) => {
        console.log(response.data);
        setArrivalMessage({
          sender: response.data.user,
          text: data.text,
          createdAt: Date.now(),
        });
        console.log(arrivalMessage);
      });
    });
  }, []);
  useEffect(() => {
    (arrivalMessage && currentChat?.members.includes(arrivalMessage?.sender)) ||
      (currentChat?.members.find(
        (member) => member._id !== arrivalMessage?.sender
      ) &&
        setMessages((prev) => [...prev, arrivalMessage]));
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current?.emit("addUser", user._id);
    console.log("hello");
    socket?.current?.on("getUsers", (users) => {
      console.log(users);
    });
  }, [user]);

  useEffect(() => {
    getUserConversations(userId).then((response) => {
      setConversations(response.data);
    });
  }, []);

  return (
    <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
      <ChatUsers
        conversations={conversations}
        user={user}
        setCurrentChat={setCurrentChat}
      />
      {
        <Messages
          messages={messages}
          setMessages={setMessages}
          user={user}
          currentChat={currentChat}
          socket={socket}
        />
      }
      {/* <ChatingUser /> */}
    </div>
  );
}

export default Chat;
