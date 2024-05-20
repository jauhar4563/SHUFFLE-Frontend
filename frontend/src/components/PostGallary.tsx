import React, { useState, useEffect } from "react";
import "../pages/profile/Profile.css"; // Import CSS file for styling
import ViewPost from "./ViewPost";
import {
  getCommentsCount,
  likePost,
  savePost,
} from "../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { loginSuccess, setPosts } from "../utils/context/reducers/authSlice";
import { BadgeCheck, Heart, MessageSquareMore, X } from "lucide-react";
import LikedUsers from "./LikedUsers";
import { Link } from "react-router-dom";
// import { formatDistanceToNow } from "date-fns";

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
            setLikedUsers((prevLikedUsers: any) =>
              prevLikedUsers.filter(
                (likedUser: any) => likedUser._id !== userId
              )
            );
            setLikeCount((prev: any) => prev - 1);
          } else {
            setLikedUsers((prevLikedUsers: any) => [...prevLikedUsers, user]);
            setLikeCount((prev: any) => prev + 1);
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
        className={`lg:h-64 h-40 cursor-pointer w-full  ${
          isTransitioning ? "fadeOut" : "fadeIn"
        } ${isHovered ? "darken" : ""}`}
        src={images[currentImageIndex]}
        alt=""
      />

      {isHovered && (
        <>
          <div className="absolute top-5 left-4 ">
          <Link
                to={
                  user._id === post.userId._id
                    ? "/profile"
                    : `/users-profile/${post.userId._id}`
                }
                className="flex items-center space-x-1"
              >
                <img
                  src={post.userId.profileImg}
                  alt="User"
                  className=" h-6 rounded-full"
                />

                <div className="flex items-center">
                  <p className="text-gray-100 text-xs font-medium mx-1">
                    {post.userId.userName}
                  </p>
                  {post.userId?.isVerified && (
                       <BadgeCheck size={15} color="white" fill="#7E3AF2"/>
                  )}

                  {/* <p className="text-gray-500 text-xs mx-1"> </p>
                  <p className="text-gray-500 text-xs">
                    {formatDistanceToNow(new Date(post.date), {
                      addSuffix: true,
                    })}
                  </p> */}
                </div>
              </Link>
          </div>
          <div className="absolute bottom-4 left-4 ">
            <div className="flex flex-col top-10">
              <p className="text-sm font-light text-gray-200">{post.title}</p>
              <p className="text-xs font-extralight text-gray-200">{post.description}</p>
            </div>
            <div className="flex items-center">
              <div>
                <button
                  onClick={() => handleLike(post._id, user._id)}
                  className="flex justify-center items-center gap-2 px-2  rounded-full p-1 transform transition-all duration-300 hover:scale-105"
                >
                  <Heart
                    color={isLikedByUser ? "#7E3AF2" : "gray"}
                    fill={isLikedByUser ? "#7E3AF2" : "none"}
                    size={22}
                  />
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
                  <MessageSquareMore color="gray" size={22} />

                  <span className="text-xs"></span>
                </button>
                {!post.hideComment && (
                  <span
                    onClick={toggleLikedUsersPopup}
                    className=" cursor-pointer text-white text-center text-xs"
                  >
                    {commentsCount}
                  </span>
                )}
              </div>
            </div>
          </div>
        </>
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
