import { useState } from "react";
import { useSelector } from "react-redux";
import LikedUsers from "./LikedUsers";

const ViewPost = ({
  post,
  isLikedByUser,
  likeCount,
  isSavedByUser,
  handleLike,
  handleSave,
}) => {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";
  const [showLikedUsersPopup, setShowLikedUsersPopup] = useState(false);

  
  const toggleLikedUsersPopup = () => {
    setShowLikedUsersPopup(!showLikedUsersPopup);
  };

  return (
    <div
      className="bg-white overflow-hidden z-50 w-full shadow-none"
      style={{ width: "1000px" }}
    >
      <div className="grid grid-cols-3 min-w-full">
        <div className=" col-span-2 w-full">
          <div className="flex w-2/4">

          {post.imageUrl && post.imageUrl.map((image)=>(

          <img
            className=" w-full max-w-full min-w-full"
            src={image}
            alt="Description"
          />
          ))}
          </div>
        </div>

        <div className="col-span-1 relative pl-4">
          <header className="border-b border-grey-400">
            <a
              href="#"
              className="block cursor-pointer py-4 flex items-center text-sm outline-none focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
            >
              <img
                src={post.userId.profileImg}
                className="h-9 w-9 rounded-full object-cover"
                alt="user"
              />
              <p className="block ml-2 font-bold">Paul</p>
            </a>
          </header>

          <div>
            <div className="pt-1">
              <div className="text-sm mb-2 flex flex-start items-center">
                <div>
                  <a
                    href="#"
                    className="cursor-pointer flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                  >
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src="https://images.pexels.com/photos/1450082/pexels-photo-1450082.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                      alt="user"
                    />
                  </a>
                </div>
                <p className="font-bold ml-2">
                  <a className="cursor-pointer">Joshua:</a>
                  <span className="text-gray-700 font-medium ml-1">
                    Good post
                  </span>
                </p>
              </div>
            </div>
            <div className="text-sm mb-2 flex flex-start items-center">
              <div>
                <a
                  href="#"
                  className="cursor-pointer flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
                >
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src="https://images.pexels.com/photos/3861456/pexels-photo-3861456.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                    alt="user"
                  />
                </a>
              </div>
              <p className="font-bold ml-2">
                <a className="cursor-pointer">Kesha:</a>
                <span className="text-gray-700 font-medium ml-1">
                  This is amazing
                </span>
              </p>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 right-0 pl-4">
            <div className="pt-4">
              <div className="mb-2">
                <div className="flex items-center">
                  <span
                    onClick={() => handleLike(post._id, user._id)}
                    className="mr-3 inline-flex items-center cursor-pointer transform transition-all duration-300 hover:scale-110"
                  >
                    <svg
                      className={`fill-heart  ${
                        isLikedByUser ? "text-red-500" : "text-gray-700"
                      } inline-block h-7 w-7 heart`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill={isLikedByUser ? "red" : "none"}
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                  </span>
                  <span className="mr-3 inline-flex items-center cursor-pointer transform transition-all duration-300 hover:scale-105">
                    <svg
                      className="text-gray-700 inline-block h-7 w-7 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                  </span>
                  <span
                    onClick={() => handleSave(post._id, user._id)}
                    className="mr-3 inline-flex items-center cursor-pointer transform transition-all duration-300 hover:scale-105"
                  >
                    <svg
                      className="w-7 h-7 text-gray-700  "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill={isSavedByUser ? "grey" : "none"}
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                      />
                    </svg>
                  </span>
                </div>
                <span   onClick={toggleLikedUsersPopup} className="text-gray-600 text-sm font-bold cursor-pointer">
                  {likeCount} Likes
                </span>
              </div>
              <span className="block ml-2 text-xs text-gray-600">
                5 minutes
              </span>
            </div>

            <div className="pt-4 pb-1 pr-3">
              <div className="flex items-start">
                <textarea
                  className="w-full resize-none outline-none appearance-none"
                  aria-label="Comment your thoughts..."
                  placeholder="Comment your thoughts..."
                  autoComplete="off"
                  autoCorrect="off"
                  style={{ height: "36px" }}
                ></textarea>
                <button className="mb-2 focus:outline-none border-none bg-transparent text-blue-600">
                  Comment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showLikedUsersPopup && (
        <LikedUsers
          likedUsers={post.likes}

          onClose={toggleLikedUsersPopup}
        />
      )}
    </div>

  );
};

export default ViewPost;
