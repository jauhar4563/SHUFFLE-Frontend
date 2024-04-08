import ChatUsers from "../../components/ChatComponents/ChatUsers";
import Messages from "../../components/ChatComponents/Messages";
import ChatingUser from "../../components/ChatComponents/ChatingUser";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getUserConversations,
  getUserDetails,
  getUserGroups,
} from "../../services/api/user/apiMethods";
import { io } from "socket.io-client";
import { BASE_URL } from "../../constants/baseUrls";
import GroupMessages from "../../components/ChatComponents/GroupMessages";

type EmitData = {
  group_id: string;
  userId: string;
};

function Chat() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id;
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const socket = useRef();
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [groupArrivalMessage, setGroupArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [isGroup, setIsGroup] = useState(false);

  useEffect(() => {
    socket.current = io(BASE_URL);

    getUserConversations(userId).then((response: any) => {
      setConversations(response.data);
    });
    getUserGroups(userId).then((response) => {
      setUserGroups(response.data);
    });

    socket.current.on("getMessage", (data: any) => {
      const senderId = data.senderId;
      getUserDetails(senderId).then((response: any) => {
        setArrivalMessage({
          sender: response.data.user,
          text: data.text,
          createdAt: Date.now(),
        });
        console.log(arrivalMessage);
      });
    });
    getGroupMessages();
  }, []);

  const getGroupMessages = () => {
    socket.current.on("responseGroupMessage", (data: any) => {
      const senderId = data.sender_id;
      getUserDetails(senderId).then((response: any) => {
        const newGroupMessage = {
          group: data.group_id,
          sender: response.data.user,
          text: data.content,
          createdAt: Date.now(),
        };
        console.log(newGroupMessage); // Log the new message directly
        setGroupArrivalMessage(newGroupMessage);
      });
    });
  };

  useEffect(() => {
    if (isGroup) {
      const emitData: EmitData = {
        group_id: currentChat._id,
        userId: userId,
      };
      socket.current.emit("joinGroup", emitData);
      socket.current.on("joinGroupResponse", (message) => {
        console.log("joined");
      });
      console.log(emitData);
    }
  }, [socket, currentChat]);

  useEffect(() => {
    (arrivalMessage && currentChat?.members.includes(arrivalMessage?.sender)) ||
      (currentChat?.members.find(
        (member) => member._id !== arrivalMessage?.sender
      ) &&
        setMessages((prev) => [...prev, arrivalMessage]));
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    console.log("set Messages");
    groupArrivalMessage &&
      currentChat?._id == groupArrivalMessage.group &&
      setMessages((prev) => [...prev, groupArrivalMessage]);
  }, [groupArrivalMessage, currentChat]);

  useEffect(() => {
    socket?.current?.emit("addUser", user._id);
    socket?.current?.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  return (
    <>
  
    <div className="relative flex w-full h-screen overflow-hidden antialiased bg-gray-200">
      <ChatUsers
        conversations={conversations}
        user={user}
        setCurrentChat={setCurrentChat}
        onlineUsers={onlineUsers}
        userGroups={userGroups}
        isGroup={isGroup}
        setIsGroup={setIsGroup}
        setUserGroups={setUserGroups}
      />
      {!isGroup && currentChat && (
        <Messages
          messages={messages}
          setMessages={setMessages}
          user={user}
          currentChat={currentChat}
          socket={socket}
          onlineUsers={onlineUsers}
        />
      )}
      {isGroup && currentChat && (
        <GroupMessages
          messages={messages}
          setMessages={setMessages}
          user={user}
          currentChat={currentChat}
          socket={socket}
          userGroups={userGroups}
        />
      )}
      {/* <ChatingUser /> */}
    </div>
    </>
  );
}

export default Chat;
