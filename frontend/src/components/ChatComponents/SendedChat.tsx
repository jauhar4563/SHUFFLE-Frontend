import { formatDistanceToNow } from "date-fns";
import 'react-h5-audio-player/lib/styles.css';
import CustomAudioPlayer from "./AudioPlayer";
import { BASE_URL } from "../../constants/baseUrls";


const SendedChat = ({ message }: any) => {
  return (
    <div className="w-full flex justify-end items-start gap-2.5">
      <div className="flex flex-col gap-1 w-full  max-w-[320px]">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-xs font-semibold text-gray-900 dark:text-white">
            {message?.sender?.userName}
          </span>
          <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
            {message?.createdAt &&
              formatDistanceToNow(message?.createdAt, { addSuffix: true })}
          </span>
        </div>
        <div className="flex flex-col leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
          {(!message.attachment || message.attachment.type === "text") && (
            <p className="text-xs font-normal text-gray-900 dark:text-white">
              {" "}
              {message?.text}
            </p>
          )}
          {message.attachment && message.attachment.type === "image" && (
            <img
              src={`${BASE_URL}/api/chat/images/${message.attachment.filename}`}
              alt=""
              className="relative rounded-lg object-cover w-full h-full"
            />
          )}
          {message.attachment && message.attachment.type === "video" && (
            <video
              controls
              className="relative rounded-lg object-cover w-full h-full"
            >
              <source
                src={`${BASE_URL}/api/chat/videos/${message.attachment.filename}`}
              />
            </video>
          )}
          {message.attachment && message.attachment.type === "audio" && (
              <CustomAudioPlayer
              src={`${BASE_URL}/api/chat/audios/${message.attachment.filename}`}
            />
           
          )}
        </div>
        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">
          Delivered
        </span>
      </div>
      {/* <button
        id="dropdownMenuIconButton"
        data-dropdown-toggle="dropdownDots"
        data-dropdown-placement="bottom-start"
        className="inline-flex self-center items-center p-2 text-xs font-medium text-center text-gray-900 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none dark:text-white focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:focus:ring-gray-600"
        type="button"
      >
        <svg
          className="w-4 h-4 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 4 15"
        >
          <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </button> */}
      <div
        id="dropdownDots"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 dark:bg-gray-700 dark:divide-gray-600"
      >
        <ul
          className="py-2 text-xs text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownMenuIconButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Reply
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Forward
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Copy
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Report
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Delete
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SendedChat;
