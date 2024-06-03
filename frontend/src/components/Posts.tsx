import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import EditPost from "./EditPost";
import {
  deletePost,
  getCommentsCount,
  likePost,
  savePost,
} from "../services/api/user/apiMethods";
import { toast } from "sonner";
import { loginSuccess, setPosts } from "../utils/context/reducers/authSlice";
import { Modal, Button } from "flowbite-react";
import ViewPost from "./ViewPost";
import {
  BadgeCheck,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
  Heart,
  MessageSquareMore,
  X,
} from "lucide-react";
import { PostProps } from "../utils/types/postType";
import { Link } from "react-router-dom";
import { Carousel } from "flowbite-react";
import LikedUsers from "./LikedUsers";
import ReportModal from "./ReportModal";
import { formatDistanceToNow } from "date-fns";
import { useSocket } from "../utils/context/SocketContext/SocketContext";
import "../pages/homePage/Home.css";

const Posts: React.FC<PostProps> = ({ post }) => {
  const dispatch = useDispatch();
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";
  const socket: any = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [editPostData, setEditPostData] = useState<any>(null);
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [showLikedUsersPopup, setShowLikedUsersPopup] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [likedUsers, setLikedUsers] = useState(post.likes);
  const [commentsCount, setCommentsCount] = useState(0);
  const [isLikedByUser, setIsLikedByUser] = useState(
    post.likes.includes(userId) ||
      post.likes.some((user) => user._id === userId)
  );
  const [isSavedByUser, setIsSavedByUser] = useState(
    user.savedPost.includes(post._id)
  );

  const [likeCount, setLikeCount] = useState(post.likes.length);
  const images: string[] = post.imageUrl;

  useEffect(() => {
    const postId = post._id;
    getCommentsCount(postId)
      .then((response: any) => {
        setCommentsCount(response.data);
      })
      .catch((err: any) => {
        console.log(err.message);
      });
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const openReportModal = () => {
    setReportModal(true);
    toggleDropdown();
  };
  const closeReportModal = () => {
    setReportModal(false);
  };

  const toggleLikedUsersPopup = () => {
    setShowLikedUsersPopup(!showLikedUsersPopup);
  };
  const handleEdit = () => {
    console.log(post);
    setEditPostData(post);
  };
  const handleCancelEdit = () => {
    setEditPostData(null);
  };

  const handleDelete = (postId: string, userId: string) => {
    try {
      deletePost({ postId, userId })
        .then((response: any) => {
          const postData = response.data;
          dispatch(setPosts({ posts: postData.posts }));
          toast.info("Post Deleted");
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const confirmDeletePost = () => {
    if (deletePostId) {
      handleDelete(deletePostId, post.userId._id);
      toggleDropdown();
      setDeletePostId(null);
    }
  };

  const handleLike = (postId: string, userId: string) => {
    try {
      likePost({ postId, userId })
        .then((response: any) => {
          const postData = response.data;
          dispatch(setPosts({ posts: postData.posts }));
          setIsLikedByUser(!isLikedByUser);
          if (isLikedByUser) {
            setLikedUsers((prevLikedUsers) =>
              prevLikedUsers.filter((likedUser) => likedUser._id !== userId)
            );
            setLikeCount((prev) => prev - 1);
          } else {
            if (userId !== post.userId._id) {
              const notificationData = {
                postImage: post.imageUrl,
                receiverId: post.userId._id,
                senderName: user.userName,
                message: "Liked Your Post",
              };
              socket.current.emit("sendNotification", notificationData);
            }
            setLikedUsers((prevLikedUsers) => [...prevLikedUsers, user]);
            setLikeCount((prev) => prev + 1);
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

  return (
    <>
      <div
        className="lg:col-span-2  lg:ms-96 w-12/12 lg:pl-4 s pt-2 lg:pt-4"
        id="posted"
      >
        <div className="flex flex-col">
          <div
            onDoubleClick={() => handleLike(post._id, user._id)}
            className="bg-white p-4 lg:p-6 mb-1 rounded-lg max-w-full"
          >
            <div className="flex items-center justify-between mb-2">
              <Link
                to={
                  user._id === post.userId._id
                    ? "/profile"
                    : `/users-profile/${post.userId._id}`
                }
                className="flex items-center space-x-2"
              >
                <img
                  src={post.userId.profileImg}
                  alt="User"
                  className=" h-10 rounded-full"
                />

                <div className="flex items-center">
                  <p className="text-gray-800 font-medium mx-1">
                    {post.userId.userName}
                  </p>
                  {post.userId?.isVerified && (
                    <BadgeCheck size={22} color="white" fill="#7E3AF2" />
                  )}

                  <p className="text-gray-500 text-sm mx-1">-</p>
                  <p className="text-gray-500 text-xs">
                    {formatDistanceToNow(new Date(post.date), {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </Link>
              <div className="text-gray-500 cursor-pointer">
                <button
                  className="hover:bg-gray-50 rounded-full p-1"
                  onClick={toggleDropdown}
                >
                  <EllipsisVertical />
                </button>

                {isOpen && (
                  <div className="absolute z-40 right-0 lg:right-96 mt-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
                    {post.userId._id === user._id && (
                      <>
                        <button
                          className="block px-4 py-2 hover:bg-gray-100 w-40"
                          onClick={handleEdit}
                        >
                          Edit
                        </button>
                        <button
                          className="block px-4 py-2 hover:bg-gray-100 w-40"
                          onClick={() => setDeletePostId(post._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {user._id !== post.userId._id && (
                      <button
                        className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-40"
                        onClick={() => openReportModal()}
                      >
                        Report
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
            {/* Message */}
            <div className="mb-1 mt-2">
              <p className="text-gray-700 text-sm font-medium">
                {post.title}{" "}
                {/* <a href="" className="text-blue-600">
                  #Negan
                </a>{" "}
                <a href="" className="text-blue-600">
                  #TWD
                </a> */}
              </p>
            </div>

            <div className="mb-3">
              <p className="text-gray-500 text-sm">
                {post.description}{" "}
                <a href="" className="text-blue-600">
                  {post.hashtags}
                </a>{" "}
              </p>
            </div>
            {/* Image */}
            <div className="mb-4 posts-section sm-w sm:w-full lg:w-full">
              <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel
                  pauseOnHover
                  slideInterval={5000}
                  leftControl={<ChevronLeft color="white" />}
                  rightControl={<ChevronRight color="white" />}
                >
                  {images &&
                    images.map((image, index) => (
                      <img
                        className=" "
                        key={index}
                        src={image}
                        alt="Description"
                      />
                    ))}
                </Carousel>
              </div>
            </div>

            {/* Like and Comment Section */}
            <div className="flex items-center justify-between text-gray-500">
              <div className="flex items-start space-x-4">
                <div className="flex flex-col items-center">
                  <button
                    onClick={() => handleLike(post._id, user._id)}
                    className="flex justify-center items-center gap-2 px-2 mt-1 hover:bg-gray-50 rounded-full p-1 transform transition-all duration-300 hover:scale-105"
                  >
                    <Heart
                      color={isLikedByUser ? " #7E3AF2" : "gray"}
                      fill={isLikedByUser ? " #7E3AF2" : "none"}
                      size={22}
                    />
                  </button>
                  {!post.hideLikes && (
                    <span
                      onClick={toggleLikedUsersPopup}
                      className=" cursor-pointer text-sm"
                    >
                      {likeCount} Likes
                    </span>
                  )}
                </div>
                <div className="flex flex-col items-center justify-center">
                  <button
                    onClick={() => setShowCommentModal(true)}
                    className="flex justify-center items-center gap-2  mt-1 hover:bg-gray-50 rounded-full p-1 transform transition-all duration-300 hover:scale-105"
                  >
                    <MessageSquareMore size={22} />

                    <span className="text-sm"></span>
                  </button>
                  {!post.hideComment && (
                    <span
                      onClick={toggleLikedUsersPopup}
                      className=" cursor-pointer text-sm"
                    >
                      {commentsCount}
                    </span>
                  )}
                </div>
                <button
                  onClick={() => handleSave(post._id, user._id)}
                  className="flex justify-center items-center mt-1 gap-1 px-1 hover:bg-gray-50 rounded-full p-1 transform transition-all duration-300 hover:scale-105"
                >
                  <Bookmark
                    color="gray"
                    fill={isSavedByUser ? "grey" : "none"}
                    size={22}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          show={deletePostId !== null}
          size="sm"
          onClose={() => setDeletePostId(null)}
          popup
        >
          <Modal.Body>
            <div className="text-center p-3">
              <p className="text-gray-600 mb-4">
                Are you sure you want to delete this post?
              </p>
              <div className="flex justify-center gap-4">
                <Button color="failure" onClick={confirmDeletePost}>
                  Delete
                </Button>
                <Button onClick={() => setDeletePostId(null)}>Cancel</Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
      {editPostData && (
        <EditPost post={editPostData} onCancelEdit={handleCancelEdit} />
      )}

      {showCommentModal && (
        <div className="addpost-popup z-50">
          <div className="addpost-popup">
            <ViewPost post={post} />
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
      {showLikedUsersPopup && (
        <LikedUsers likedUsers={likedUsers} onClose={toggleLikedUsersPopup} />
      )}
      {reportModal && (
        <ReportModal
          userId={userId}
          postId={post._id}
          openReportModal={openReportModal}
          closeReportModal={closeReportModal}
        />
      )}
    </>
  );
};

export default Posts;
