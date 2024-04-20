import React, { useState, useEffect } from "react";
import "../pages/profile/Profile.css"; // Import CSS file for styling
import ViewPost from "./ViewPost";
import { getCommentsCount, likePost, savePost } from "../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginSuccess, setPosts } from "../utils/context/reducers/authSlice";
import { X } from "lucide-react";
import LikedUsers from "./LikedUsers";

function PostGallary({ post }: { post: any }) {
  const images = post.imageUrl || [];
  const dispatch = useDispatch();
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";
  const [likedUsers, setLikedUsers] = useState(post.likes);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [isLikedByUser, setIsLikedByUser] = useState(
    post.likes.includes(userId) ||
      post.likes.some((user: any) => user._id === userId)
  );
  const [isSavedByUser, setIsSavedByUser] = useState(
    user.savedPost.includes(post._id)
  );
  const [showLikedUsersPopup, setShowLikedUsersPopup] = useState(false);

  const [isHovered, setIsHovered] = useState(false);

  const [likeCount, setLikeCount] = useState(post.likes.length);

  useEffect(() => {
    const postId = post._id;
    getCommentsCount(postId)
      .then((response: any) => {
        console.log(response.data);
        setCommentsCount(response.data);
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  }, []);

  const handleLike = (postId: string, userId: string) => {
    try {
      likePost({ postId, userId })
        .then((response: any) => {
          const postData = response.data;
          console.log(postData);
          dispatch(setPosts({ posts: postData.posts }));
          setIsLikedByUser(!isLikedByUser);
          if (isLikedByUser) {
            setLikedUsers((prevLikedUsers:any) =>
              prevLikedUsers.filter(
                (likedUser: any) => likedUser._id !== userId
              )
            );
            setLikeCount((prev:any) => prev - 1);
          } else {
            setLikedUsers((prevLikedUsers: any) => [...prevLikedUsers, user]);
            setLikeCount((prev:any) => prev + 1);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };
  const handleSave = (postId: string, userId: string) => {
    try {
      savePost({ postId, userId })
        .then((response: any) => {
          const userData = response.data;
          console.log(userData);
          dispatch(loginSuccess({ user: userData }));
          setIsSavedByUser(!isSavedByUser);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Duration of fade-out effect
    }, 5000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);
  const toggleLikedUsersPopup = () => {
    setShowLikedUsersPopup(!showLikedUsersPopup);
  };

  return (
    <div
      className="relative "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        onClick={() => setShowCommentModal(true)}
        className={`h-64 cursor-pointer w-full  ${
          isTransitioning ? "fadeOut" : "fadeIn"
        } ${isHovered ? "darken" : ""}`}
        src={images[currentImageIndex]}
        alt=""
      />

      {isHovered && (
        <div className="absolute bottom-0 left-16 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center">

          <div>
            <button
              onClick={() => handleLike(post._id, user._id)}
              className="flex justify-center items-center gap-2 px-2  rounded-full p-1 transform transition-all duration-300 hover:scale-105"
            >
              <svg
                className={`w-8 h-8 ${
                  isLikedByUser ? "text-red-500" : "text-gray-300"
                }  `}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill={isLikedByUser ? "red" : "none"}
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                />
              </svg>
            </button>
            <p
              onClick={toggleLikedUsersPopup}
              className="text-center cursor-context-menu text-white text-xs"
            >
              {" "}
              {likedUsers.length} Likes
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => setShowCommentModal(true)}
              className="flex justify-center items-center gap-2 px-2  rounded-full p-1 transform transition-all duration-300 hover:scale-105"
            >
              <svg
                className="w-8 h-8 text-gray-300 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                />
              </svg>

              <span className="text-sm"></span>
            </button>
            {!post.hideComment && (
              <span
                onClick={toggleLikedUsersPopup}
                className=" cursor-pointer text-white text-center text-sm"
              >
                {commentsCount}
              </span>
            )}
          </div>
            </div>
        </div>
      )}

      {showLikedUsersPopup && (
        <LikedUsers likedUsers={likedUsers} onClose={toggleLikedUsersPopup} />
      )}

      {showCommentModal && (
        <div className="addpost-popup z-50">
          <div className="addpost-popup">
            <ViewPost
              post={post}
              isLikedByUser={isLikedByUser}
              likeCount={likeCount}
              isSavedByUser={isSavedByUser}
              handleLike={handleLike}
              handleSave={handleSave}
            />
            <div className="fixed right-10 top-10">
              <button
                className="close-button me-5"
                onClick={() => setShowCommentModal(false)}
              >
                <X size={25} color="white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostGallary;
