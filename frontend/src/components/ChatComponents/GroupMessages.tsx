import { SendHorizonal, Smile, Video } from "lucide-react";
import RecievedChat from "./RecievedChat";
import SendedChat from "./SendedChat";
import { useEffect, useRef, useState } from "react";
import {
  addGroupMessage,
  getGroupMessages,
} from "../../services/api/user/apiMethods";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function GroupMessages({
  messages,
  setMessages,
  user,
  currentChat,
  socket,
  userGroups,
}) {
  const [newMessage, setNewMessage] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    const currentChatId = currentChat?._id;
    getGroupMessages(currentChatId).then((response) => {
      console.log(response.data);
      setMessages(response.data);
    });
  }, [currentChat]);

  const scrollRef = useRef();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function randomID(len:number) {
    let result = '';
    if (result) return result;
    const chars = '12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP',
      maxPos = chars.length;
    len = len || 5;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const handleGroupVideoCall =()=>{
    const  roomId=randomID(10)
    const groupId = currentChat?._id;
    console.log(groupId+"recieverId")
    const emitData={
      groupId,
      groupName:currentChat.name,
      groupProfile:currentChat.profile,
      roomId:roomId,
      
    }
    console.log(emitData)

    socket.current.emit('GroupVideoCallRequest',emitData)
   
    navigate(`/group-video-call/${roomId}`)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const group_id = currentChat?._id;
    const userId = user._id;
    const data = {
      group_id,
      sender_id: userId,
      content: newMessage,
      lastUpdate: Date.now(),
    };
    socket.current.emit("GroupMessage", data);
    addGroupMessage({
      groupId: group_id,
      sender: userId,
      text: newMessage,
    }).then((response) => {
      toast.info("message has been send");
      setNewMessage("");
    });
  };

  return (
    <div className="relative flex flex-col flex-1">
      <div className="z-20 flex flex-grow-0 flex-shrink-0 w-full pr-3 bg-white border-b">
        <div
          className="w-12 h-12 mx-4 my-2 bg-blue-500 bg-center bg-no-repeat bg-cover rounded-full cursor-pointer"
          style={{
            backgroundImage: `url(${currentChat?.profile})`,
          }}
        ></div>
        <div className="flex flex-col justify-center flex-1 overflow-hidden cursor-pointer">
          <div className="overflow-hidden text-sm font-medium leading-tight text-gray-600 whitespace-no-wrap">
            {currentChat?.name}
          </div>
        </div>

        <button onClick={handleGroupVideoCall} className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300">
         <Video />
        </button>
        <button className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300">
          <svg
            className="w-6 h-6 text-gray-600 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="nonzero"
              d="M9.5,3 C13.0898509,3 16,5.91014913 16,9.5 C16,10.9337106 15.5358211,12.2590065 14.7495478,13.3338028 L19.7071068,18.2928932 C20.0976311,18.6834175 20.0976311,19.3165825 19.7071068,19.7071068 C19.3466228,20.0675907 18.7793918,20.0953203 18.3871006,19.7902954 L18.2928932,19.7071068 L13.3338028,14.7495478 C12.2590065,15.5358211 10.9337106,16 9.5,16 C5.91014913,16 3,13.0898509 3,9.5 C3,5.91014913 5.91014913,3 9.5,3 Z M9.5,5 C7.01471863,5 5,7.01471863 5,9.5 C5,11.9852814 7.01471863,14 9.5,14 C11.9852814,14 14,11.9852814 14,9.5 C14,7.01471863 11.9852814,5 9.5,5 Z"
            />
          </svg>
        </button>
        <button
          type="button"
          className="flex self-center hidden p-2 ml-2 text-gray-500 rounded-full md:block focus:outline-none hover:text-gray-600 hover:bg-gray-300"
        >
          <svg
            className="w-6 h-6 text-gray-600 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="nonzero"
              d="M12,16 C13.1045695,16 14,16.8954305 14,18 C14,19.1045695 13.1045695,20 12,20 C10.8954305,20 10,19.1045695 10,18 C10,16.8954305 10.8954305,16 12,16 Z M12,10 C13.1045695,10 14,10.8954305 14,12 C14,13.1045695 13.1045695,14 12,14 C10.8954305,14 10,13.1045695 10,12 C10,10.8954305 10.8954305,10 12,10 Z M12,4 C13.1045695,4 14,4.8954305 14,6 C14,7.1045695 13.1045695,8 12,8 C10.8954305,8 10,7.1045695 10,6 C10,4.8954305 10.8954305,4 12,4 Z"
            />
          </svg>
        </button>
        <button className="p-2 text-gray-700 flex self-center rounded-full md:hidden focus:outline-none hover:text-gray-600 hover:bg-gray-200">
          <svg
            className="w-6 h-6 text-gray-600 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="nonzero"
              d="M4,16 L20,16 C20.5522847,16 21,16.4477153 21,17 C21,17.5128358 20.6139598,17.9355072 20.1166211,17.9932723 L20,18 L4,18 C3.44771525,18 3,17.5522847 3,17 C3,16.4871642 3.38604019,16.0644928 3.88337887,16.0067277 L4,16 L20,16 L4,16 Z M4,11 L20,11 C20.5522847,11 21,11.4477153 21,12 C21,12.5128358 20.6139598,12.9355072 20.1166211,12.9932723 L20,13 L4,13 C3.44771525,13 3,12.5522847 3,12 C3,11.4871642 3.38604019,11.0644928 3.88337887,11.0067277 L4,11 Z M4,6 L20,6 C20.5522847,6 21,6.44771525 21,7 C21,7.51283584 20.6139598,7.93550716 20.1166211,7.99327227 L20,8 L4,8 C3.44771525,8 3,7.55228475 3,7 C3,6.48716416 3.38604019,6.06449284 3.88337887,6.00672773 L4,6 Z"
            />
          </svg>
        </button>
      </div>
      <div className="top-0 bottom-0 left-0 right-0 flex flex-col flex-1 overflow-auto bg-transparent bg-bottom bg-cover ">
        <div className="chat-scrollbox">
          <div className="chat-scroll" ref={scrollRef}>
            <div className="self-center flex-1 w-full ">
              <div className="relative flex flex-col px-3 py-1 m-auto w-full">
                <div className="self-center px-2 py-1 mx-0 my-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
                  Channel was created
                </div>
                <div className="self-center px-2 py-1 mx-0 my-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
                  {currentChat?.created_at}
                </div>
                {messages.length!==0 &&
                  messages.map((message, index) => {
                    return message?.sender._id === user._id ||
                      message?.sender === user._id ? (
                      <div key={index} className="self-end w-3/4 my-2">
                        <SendedChat message={message} />
                      </div>
                    ) : (
                      <div key={index} className="self-start w-3/4 my-2">
                        <RecievedChat message={message} />
                      </div>
                    );
                  })}

                {/* <div className=" self-end w-3/4 my-2">
          <SendedChat message={null}/>
          </div>
              <div className="self-start w-3/4 my-2">
              <RecievedChat message={null}/>
             </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
          <div className="w-full">
            <span className="absolute inset-y-0 left-0 flex items-center pl-6">
              <button
                type="button"
                className="p-1 focus:outline-none focus:shadow-none"
              >
                <Smile size={18} />
              </button>
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-6">
              <button
                onClick={handleSubmit}
                type="submit"
                className="p-1 focus:outline-none focus:shadow-none hover:text-green-600"
              >
                <SendHorizonal size={18} color="green" />
              </button>
            </span>
            <input
              type="text"
              value={newMessage}
              className="w-full items-center h-10 pl-10 pr-4  bg-white  text-xs border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-green-600 transition-colors duration-300"
              placeholder="Type your message..."
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupMessages;
