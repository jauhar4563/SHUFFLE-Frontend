import ChatUsers from "../../components/ChatComponents/ChatUsers";
import Messages from "../../components/ChatComponents/Messages";
import "./Chat.css";
// import ChatingUser from "../../components/ChatComponents/ChatingUser";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  addConversation,
  getLastGroupMessages,
  getLastMessages,
  getUserConversations,
  getUserDetails,
  getUserGroups,
} from "../../services/api/user/apiMethods";
import { io } from "socket.io-client";
import { BASE_URL } from "../../constants/baseUrls";
import GroupMessages from "../../components/ChatComponents/GroupMessages";
import VideoCallModal from "../../components/ChatComponents/VideoCallModal";
import { useLocation, useNavigate } from "react-router-dom";
import GroupVideoCallModal from "../../components/ChatComponents/GroupVideoCallModal";
// import { toast } from "sonner";
import NochatScreen from "../../components/ChatComponents/NoChat";

type EmitData = {
  group_id: string;
  userId: string;
};

function Chat() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id;
  const [conversations, setConversations] = useState<any[]>([]);
  const [currentChat, setCurrentChat] = useState<any>(null);
  const socket = useRef<any>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<any[]>([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [lastGroupMessages, setLastGroupMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState<any>(null);
  const [groupArrivalMessage, setGroupArrivalMessage] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [userGroups, setUserGroups] = useState([]);
  const [isGroup, setIsGroup] = useState(false);
  const [joinVideoCall, setJoinVideoCall] = useState(false);
  const [joinGroupVideoCall, setJoinGroupVideoCall] = useState(false);
  const [videoCallJoinRoomId, setVideoCallJoinRoomId] = useState("");
  const [callRequestedUser, setCallRequestedUser] = useState({
    name: "",
    profile: "",
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const messageUserId = queryParams.get("userId");

  const changeCurrentChat=(val:any)=>{
    setCurrentChat(val)
  }

  useEffect(() => {
     socket.current = io(BASE_URL);
  socket.current.on("connect", () => {
    console.log("Socket connected:", socket.current.id);
  });
  socket.current.on("disconnect", () => {
    console.log("Socket disconnected");
  });

  if (userId) {
    socket.current.emit("addUser", userId);
    console.log("addUser event emitted with userId:", userId);
  }

  socket.current.on("getUsers", (users:any) => {
    console.log("Online users received:", users);
    setOnlineUsers(users);
  });
    if (messageUserId) {
      addConversation({ senderId: userId, receiverId: messageUserId }).then(
        (response: any) => {
          const userData = response.data;
          const existChat = conversations.filter(
            (con) => con._id === userData._id
          );
          if (!existChat.length) {
            setConversations((prev) => [...prev, userData]);
          }
          setCurrentChat(userData);
        }
      );
    }

    getUserConversations(userId).then((response: any) => {
      setConversations(response.data);
    });

    getUserGroups(userId).then((response: any) => {
      setUserGroups(response.data);
    });

    getLastMessages().then((response: any) => {
      console.log(response.data);
      setLastMessages(response.data);
    });

    getLastMessage();

    socket.current.on("getMessage", (data: any) => {
      const senderId = data.senderId;
      console.log(data);
      getLastMessage();
      getUserDetails(senderId).then((response: any) => {
        setArrivalMessage({
          sender: response.data.user,
          text: data.text,
          attachment: {
            type: data.messageType,
            filename: data.file,
          },
          createdAt: Date.now(),
        });
        console.log(arrivalMessage);
      });
    });
    getGroupMessages();
  }, []);


  const getLastMessage = () => {
    getLastGroupMessages().then((response: any) => {
      setLastGroupMessages(response.data);
    });
  };

  useEffect(() => {
    console.log("Video call useEffect");
    socket.current.on("videoCallResponse", (data: any) => {
      setVideoCallJoinRoomId(data.roomId);
      setCallRequestedUser({
        name: data.senderName,
        profile: data.senderProfile,
      });
      setJoinVideoCall(true);
    });

    socket.current.on("GroupVideoCallResponse", (data: any) => {
      setVideoCallJoinRoomId(data.roomId);
      setCallRequestedUser({
        name: data.groupName,
        profile: data.groupProfile,
      });
      setJoinGroupVideoCall(true);
    });
  }, [socket]);

  const handleJoinVidoCallRoom = () => {
    navigate(`/video-call/${videoCallJoinRoomId}/${userId}`);
  };

  const handleJoinGroupVidoCallRoom = () => {
    navigate(`/group-video-call/${videoCallJoinRoomId}/${userId}`);
  };

  const getGroupMessages = () => {
    socket.current.on("responseGroupMessage", (data: any) => {
      const senderId = data.sender_id;
      getUserDetails(senderId).then((response: any) => {
        const newGroupMessage = {
          group: data.group_id,
          sender: response.data.user,
          text: data.content,
          attachment: {
            type: data.messageType,
            filename: data.file,
          },
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
      socket.current.on("joinGroupResponse", (message: any) => {
        console.log(message);
      });
      console.log(emitData);
    }
  }, [socket, currentChat]);

  useEffect(() => {
    (arrivalMessage && currentChat?.members.includes(arrivalMessage?.sender)) ||
      (currentChat?.members.find(
        (member: any) => member._id !== arrivalMessage?.sender
      ) &&
        setMessages((prev) => [...prev, arrivalMessage]));
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    console.log("set Messages");
    groupArrivalMessage &&
      currentChat?._id == groupArrivalMessage.group &&
      setMessages((prev) => [...prev, groupArrivalMessage]);
  }, [groupArrivalMessage, currentChat]);



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
          setConversations={setConversations}
          lastMessages={lastMessages}
          lastGroupMessages={lastGroupMessages}
          currentChat={currentChat}
        />
        {!isGroup && currentChat && (
          <Messages
            messages={messages}
            setMessages={setMessages}
            user={user}
            currentChat={currentChat}
            socket={socket}
            onlineUsers={onlineUsers}
            changeCurrentChat={changeCurrentChat}
          />
        )}
        {!currentChat && (
          <div className="hidden lg:block">
            <NochatScreen />
          </div>
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
        {joinVideoCall && (
          <VideoCallModal
            show={joinVideoCall}
            onHide={() => setJoinVideoCall(false)}
            onAccept={handleJoinVidoCallRoom}
            onReject={() => {
              setVideoCallJoinRoomId("");
              setJoinVideoCall(false);
            }}
            caller={callRequestedUser}
          />
        )}

        {joinGroupVideoCall && (
          <GroupVideoCallModal
            show={joinGroupVideoCall}
            onHide={() => setJoinGroupVideoCall(false)}
            onAccept={handleJoinGroupVidoCallRoom}
            onReject={() => {
              setVideoCallJoinRoomId("");
              setJoinGroupVideoCall(false);
            }}
            caller={callRequestedUser}
          />
        )}
      </div>
    </>
  );
}

export default Chat;
