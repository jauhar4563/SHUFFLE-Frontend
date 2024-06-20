import { Image, Paperclip, SendHorizonal, Smile, Video } from "lucide-react";
import "../../pages/chat/Chat.css";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import RecievedChat from "./RecievedChat";
import SendedChat from "./SendedChat";
import { useEffect, useRef, useState } from "react";
import {
  addMessage,
  getUserMessages,
  setMessageRead,
} from "../../services/api/user/apiMethods";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import VoiceRecorder from "./VoiceRecorder";
import '../../pages/chat/Chat.css'

function Messages({
  messages,
  setMessages,
  user,
  currentChat,
  socket,
  onlineUsers,
}: any) {
  const [newMessage, setNewMessage] = useState("");
  const [friend, setFriend] = useState<any>(null);
  const [isOnline, setIsOnline] = useState(false);
  const [image, setImage] = useState<any>(null);
  const [video, setVideo] = useState<any>(null);
  const scrollRef = useRef<any>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [recordedAudioBlob, setRecordedAudioBlob]: any = useState(null);
  const [isRecording, setIsRecording] = useState<boolean>(false)

  // const [joinVideoCall,setJoinVidioCall]=useState(false);
  // const [videoCallJoinRoomId,setVideoCallJoinRoomId]=useState('');
  const navigate = useNavigate();

  const togglePinDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const friend = currentChat?.members.find((m: any) => m._id !== user._id);
    setIsOnline(() => {
      if (onlineUsers.find((user: any) => user.userId === friend?._id)) {
        return true;
      } else {
        return false;
      }
    });
    setFriend(friend);
    const currentChatId = currentChat?._id;
    getUserMessages(currentChatId).then((response: any) => {
      setMessages(response.data);
    });
  }, [currentChat]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    setMessageRead({ conversationId: currentChat._id, userId: user._id });
  }, [socket]);

  function randomID(len: number) {
    let result = "";
    if (result) return result;
    const chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length;
    len = len || 5;
    for (let i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }

  const handleVideoCall = () => {
    const roomId = randomID(10);
    const recieverId = friend?._id;
    console.log(recieverId + "recieverId");
    const emitData = {
      senderId: user._id,
      senderName: user.userName,
      senderProfile: user.profileImg,
      recieverId,
      roomId: roomId,
    };

    socket.current.emit("videoCallRequest", emitData);

    navigate(`/video-call/${roomId}/${user._id}`);
  };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      handleSubmit(null);
    }
  };

  const handleSubmit = (file: any) => {
    const formData = new FormData();
    const currentChatId = currentChat?._id;
    const userId = user._id;
    const receiver = currentChat.members.find(
      (member: any) => member._id !== user._id
    );

    let messageType: string = "";

    if (file) {
      if (file.type.startsWith("image/")) {
        messageType = "image";
      } else if (file.type.startsWith("video/")) {
        messageType = "video";
        console.log(file);
      } else if (file.type.startsWith("audio/")) {
        messageType = "audio";
        console.log(file);
      }
      formData.append("file", file);
      setNewMessage(messageType);
    } else {
      messageType = "text";
    }

    // Add other message details to FormData
    formData.append("conversationId", currentChatId);
    formData.append("sender", userId);
    formData.append("text", newMessage);
    formData.append("messageType", messageType);

    console.log(receiver);
    const receiverId = receiver ? receiver._id : null;
    socket.current.emit("sendMessage", {
      senderId: userId,
      receiverId,
      text: newMessage,
      messageType,
      file: file?.name,
    });

    // Send FormData with file and other message details
    addMessage(formData)
      .then((response: any) => {
        toast.info("message has been sent");
        setNewMessage("");
        setMessages([...messages, response.data]);
      })
      .catch((error) => {
        console.error("Error sending message:", error);
      });
  };

  const handleImageClick = () => {
    const fileInput = document.getElementById("image");
    if (fileInput) {
      console.log("Image Click");
      fileInput.click();
    }
  };

  const handleVidoClick = () => {
    const fileInput = document.getElementById("video");
    if (fileInput) {
      fileInput.click();
    }
  };

  const addAudioElement = async (blob: any) => {
    setIsRecording(false)
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);

    const audioFile = new File([blob], `${Date.now()}+audio.mp3`, {
      type: "audio/mpeg",
    });
    handleSubmit(audioFile);
  };

  return (
    <div className={`${currentChat?'block':"hidden"} lg:bock relative flex flex-col flex-1`}>
      <div className="z-20 flex flex-grow-0 flex-shrink-0 w-full pr-3 bg-white border-b">
        <div
          className="w-12 h-12 mx-4 my-2 bg-blue-500 bg-center bg-no-repeat bg-cover rounded-full cursor-pointer"
          style={{
            backgroundImage: `url(${friend?.profileImg})`,
          }}
        ></div>
        <div className="flex flex-col justify-center flex-1 overflow-hidden cursor-pointer">
          <div className="overflow-hidden text-sm font-medium leading-tight text-gray-600 whitespace-no-wrap">
            {friend?.userName}
          </div>
          {isOnline && (
            <div className="overflow-hidden text-xs text-purple-600  leading-tight  whitespace-no-wrap">
              Online
            </div>
          )}
        </div>
        {/* {joinVideoCall ? (
                  <>
                  <button className="w-16 h-7 rounded-md bg-purple-400 text-sm " onClick={handleJoinVidoCallRoom}>Join</button>
                  </>
                ):( */}
        <button
          onClick={handleVideoCall}
          className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300"
        >
          <Video />
        </button>
        {/* )} */}

        {/* <button className="flex self-center p-2 ml-2 text-gray-500 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-300">
          <svg
            className="w-6 h-6 text-gray-600 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="nonzero"
              d="M11,20 L13,20 C13.5522847,20 14,20.4477153 14,21 C14,21.5128358 13.6139598,21.9355072 13.1166211,21.9932723 L13,22 L11,22 C10.4477153,22 10,21.5522847 10,21 C10,20.4871642 10.3860402,20.0644928 10.8833789,20.0067277 L11,20 L13,20 L11,20 Z M3.30352462,2.28241931 C3.6693482,1.92735525 4.23692991,1.908094 4.62462533,2.21893936 L4.71758069,2.30352462 L21.2175807,19.3035246 C21.6022334,19.6998335 21.5927842,20.332928 21.1964754,20.7175807 C20.8306518,21.0726447 20.2630701,21.091906 19.8753747,20.7810606 L19.7824193,20.6964754 L18.127874,18.9919007 L18,18.9999993 L4,18.9999993 C3.23933773,18.9999993 2.77101468,18.1926118 3.11084891,17.5416503 L3.16794971,17.4452998 L5,14.6972244 L5,8.9999993 C5,7.98873702 5.21529462,7.00715088 5.62359521,6.10821117 L3.28241931,3.69647538 C2.89776658,3.3001665 2.90721575,2.66707204 3.30352462,2.28241931 Z M7.00817933,8.71121787 L7,9 L7,14.6972244 C7,15.0356672 6.91413188,15.3676193 6.75167088,15.6624466 L6.66410059,15.8066248 L5.86851709,17 L16.1953186,17 L7.16961011,7.7028948 C7.08210009,8.02986218 7.02771758,8.36725335 7.00817933,8.71121787 Z M12,2 C15.7854517,2 18.8690987,5.00478338 18.995941,8.75935025 L19,9 L19,12 C19,12.5522847 18.5522847,13 18,13 C17.4871642,13 17.0644928,12.6139598 17.0067277,12.1166211 L17,12 L17,9 C17,6.23857625 14.7614237,4 12,4 C11.3902636,4 10.7970241,4.10872043 10.239851,4.31831953 C9.72293204,4.51277572 9.14624852,4.25136798 8.95179232,3.734449 C8.75733613,3.21753002 9.01874387,2.6408465 9.53566285,2.4463903 C10.3171048,2.15242503 11.1488212,2 12,2 Z"
            />
          </svg>
        </button> */}
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
        <div
          onClick={() => setShowEmojiPicker(false)}
          className="chat-scrollbox"
        >
          <div className="chat-scroll" ref={scrollRef}>
            <div className="self-center flex-1 w-full ">
              <div className="relative flex flex-col px-3 py-1 m-auto w-full">
                <div className="self-center px-2 py-1 mx-0 my-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
                  Channel was created
                </div>
                <div className="self-center px-2 py-1 mx-0 my-1 text-xs text-gray-700 bg-white border border-gray-200 rounded-full shadow rounded-tg">
                  {currentChat?.createdAt &&
                    new Date(currentChat.createdAt).toLocaleDateString()}
                </div>
                {messages.length !== 0 &&
                  messages.map((message: any, index: any) => {
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
            <input
              type="file"
              name="file"
              id="image"
              accept="image/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  const file = files[0];
                  setImage(file);
                  console.log(image);
                  handleSubmit(file);
                }
              }}
              hidden
            />
            <input
              type="file"
              name="file"
              id="video"
              accept="video/*"
              onChange={(e) => {
                const files = e.target.files;
                if (files && files.length > 0) {
                  const file = files[0];
                  setVideo(file);
                  console.log(video);
                  handleSubmit(file);
                }
              }}
              hidden
            />

            <span className="absolute inset-y-0 left-0 flex items-center pl-6">
              <button
                type="button"
                className="p-1 focus:outline-none focus:shadow-none"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                <Smile size={18} />
              </button>
            </span>
            {isDropdownOpen && (
              <div className="z-50 transition-opacity duration-300">
                <span className="absolute inset-y-0 right-24 flex items-center pr-6">
                  <button
                    onClick={handleVidoClick}
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-none hover:text-purple-600"
                  >
                    <Video
                      className="size-5 lg:size-6 mr-3 md:mt-1 mt-1 ml-2  "
                      size={18}
                      color="purple"
                    />
                  </button>
                </span>

                <span className="absolute inset-y-0 right-16 flex items-center pr-6">
                  <button
                    onClick={handleImageClick}
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-none hover:text-purple-600"
                  >
                    <Image
                      className="size-5 lg:size-6 mr-3 md:mt-1 mt-1 ml-2  "
                      size={18}
                      color="purple"
                    />
                  </button>
                </span>
              </div>
            )}
            {!newMessage.length && (
              <>
                <span onClick={()=>setIsRecording(true)} className="absolute right-1 flex items-center">
                  <VoiceRecorder
                    onRecordingComplete={addAudioElement}
                    setRecordedAudioBlob={setRecordedAudioBlob}
                    style={{ background: "none " ,  borderRadius: 0 }}
                    
                  />
                </span>

              { !isRecording &&  (<span className="absolute inset-y-0 right-10 flex items-center ">
                  <button
                    onClick={togglePinDropdown}
                    type="submit"
                    className="p-1 focus:outline-none focus:shadow-none hover:text-purple-600"
                  >
                    <Paperclip
                      className="size-5 lg:size-6 mr-3 md:mt-1 mt-4 ml-2  "
                      size={18}
                      color="purple"
                    />
                  </button>
                </span>)}
              </>
            )}
            {newMessage.length > 0 && (
              <span className="absolute inset-y-0 right-0 flex items-center pr-6">
                <button
                  onClick={() => handleSubmit(null)}
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-none hover:text-purple-600"
                >
                  <SendHorizonal size={18} color="purple" />
                </button>
              </span>
            )}

            <input
              type="text"
              value={newMessage}
              className="w-full items-center h-10 pl-10 pr-4  bg-white  text-xs border border-gray-300 rounded-md focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-purple-600 transition-colors duration-300"
              placeholder="Type your message..."
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
        {showEmojiPicker && (
          <Picker
            data={data}
            onEmojiSelect={(emoji: any) => {
              setNewMessage((prevMessage) => prevMessage + emoji.native);
            }}
            style={{
              position: "fixed",
              bottom: "500px",
              right: "10px",
              backgroundColor: "white",
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Messages;
