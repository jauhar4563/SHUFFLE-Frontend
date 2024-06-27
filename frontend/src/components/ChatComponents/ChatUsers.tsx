import { useEffect, useRef, useState } from "react";
import Friend from "./Friend";
import { ArrowLeftCircle, MessageSquarePlus, PlusCircle } from "lucide-react";
import AddGroup from "./AddGroup";
import { getChatElibleUsers } from "../../services/api/user/apiMethods";
import Group from "./Group";
import { useNavigate } from "react-router-dom";
import MessageUsersModal from "./MessageUsersModal";
import '../../pages/chat/Chat.css'

function ChatUsers({
  conversations,
  user,
  currentChat,
  setCurrentChat,
  onlineUsers,
  userGroups,
  isGroup,
  setIsGroup,
  setUserGroups,
  setConversations,
  lastMessages,
  lastGroupMessages,
}: any) {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [chatEligibleUsers, setChatEligibleUsers] = useState([]);
  const [messageUsersModal, setMessageUsersModal] = useState(false);

  useEffect(() => {
    const userId = user._id;
    getChatElibleUsers({ userId: userId })
      .then((response: any) => {
        setChatEligibleUsers(response.data.users);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div
      className={`${
        currentChat ? "hidden" : "block"
      } lg:bock relative responsive-width flex flex-col  h-full bg-white border-r border-gray-300 shadow-xl md:block transform transition-all duration-500 ease-in-out`}
    >
      <div className="flex justify-between px-3 pt-1 text-white">
        <div className="flex items-center w-full py-2">
          <button
            onClick={() => navigate(-1)}
            aria-haspopup="true"
            className="p-2 text-gray-700 rounded-full focus:outline-none hover:text-gray-600 hover:bg-gray-200"
          >
            <ArrowLeftCircle />
          </button>
          <div className="relative flex items-center w-full pl-2 overflow-hidden text-gray-600 focus-within:text-gray-400">
            <span className="absolute inset-y-0 left-0 flex items-center pl-4">
              <button
                type="submit"
                className="p-1 focus:outline-none focus:shadow-none"
              >
                <svg
                  className="w-6 h-6 fill-current"
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
            </span>
            <input
              type="search"
              name="q"
              className="w-full py-2 pl-12 text-sm text-white bg-gray-200 border border-transparent appearance-none rounded-tg focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
              style={{ borderRadius: "25px" }}
              placeholder="Search..."
              autoComplete="off"
            />
          </div>
        </div>
      </div>
      <div className="border-b shadow-bot">
        <ul className="flex flex-row items-center inline-block px-2 list-none select-none">
          <li
            onClick={() => setIsGroup(false)}
            className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200"
          >
            <a
              className={`flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 ${
                !isGroup ? "border-purple-500" : "border-transparent"
              }`}
            >
              All
            </a>
          </li>

          <li
            onClick={() => setIsGroup(true)}
            className="flex-auto px-1 mx-1 -mb-px text-center rounded-t-lg cursor-pointer last:mr-0 hover:bg-gray-200"
          >
            <a
              className={`flex items-center justify-center block py-2 text-xs font-semibold leading-normal tracking-wide border-b-2 ${
                isGroup ? "border-purple-500" : "border-transparent"
              }`}
            >
              Groups
            </a>
          </li>
        </ul>
      </div>
      <div className="relative mt-2 mb-4 overflow-x-hidden overflow-y-auto scrolling-touch lg:max-h-sm scrollbar-w-2 scrollbar-track-gray-lighter scrollbar-thumb-rounded scrollbar-thumb-gray">
        <ul className="flex flex-col inline-block w-full h-screen px-2 select-none">
          {/* 
    { conversations && conversations.map((conversation)=>(
    <div onClick={()=>setCurrentChat(conversation)}>

      <Friend CurrentUser={user} conversation={conversation} onlineUsers={onlineUsers}/>
    </div>
   ))} */}

          {!isGroup &&
            conversations &&
            !conversations?.isGroup &&
            conversations.map((conversation: any) => (
              <div onClick={() => setCurrentChat(conversation)}>
                <Friend
                  CurrentUser={user}
                  conversation={conversation}
                  onlineUsers={onlineUsers}
                  lastMessages={lastMessages}
                />
              </div>
            ))}

          {isGroup &&
            userGroups &&
            userGroups.map((group: any) => (
              <div onClick={() => setCurrentChat(group)}>
                <Group
                  CurrentUser={user}
                  group={group}
                  onlineUsers={onlineUsers}
                  lastGroupMessages={lastGroupMessages}
                />
              </div>
            ))}
        </ul>
      </div>
      <div className="fixed absolute bottom-0 right-0 z-40 mb-6 mr-4">
        {isGroup ? (
          <button
            onClick={() => setOpenModal(true)}
            className="flex items-center justify-center w-12 h-12 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full focus:outline-none flex-no-shrink"
          >
            <PlusCircle />
          </button>
        ) : (
          <button
            onClick={() => setMessageUsersModal(true)}
            className="flex items-center justify-center w-12 h-12 mr-3 text-xl font-semibold text-white bg-blue-500 rounded-full focus:outline-none flex-no-shrink"
          >
            <MessageSquarePlus />
          </button>
        )}
      </div>
      {
        <AddGroup
          chatEligibleUsers={chatEligibleUsers}
          openModal={openModal}
          setOpenModal={setOpenModal}
          emailInputRef={emailInputRef}
          setUserGroups={setUserGroups}
        />
      }
      {messageUsersModal && !isGroup && (
        <MessageUsersModal
          setCurrentChat={setCurrentChat}
          setMessageUsersModal={setMessageUsersModal}
          chatEligibleUsers={chatEligibleUsers}
          user={user}
          setConversations={setConversations}
          conversations={conversations}
        />
      )}
    </div>
  );
}

export default ChatUsers;
