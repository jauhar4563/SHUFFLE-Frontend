import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LikedUsers from "./LikedUsers";
import { Carousel } from "flowbite-react";
import { addComment, deleteComment, getPostComments, replyComment } from "../services/api/user/apiMethods";
import { toast } from "sonner";
import { Trash2, Undo2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import {  Modal } from "flowbite-react";


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
  const [hideLikes, setHideLikes] = useState(post.hideLikes);
  const [hideComment, setHideComment] = useState(post.hideComment);
  const [isComment, setIsComment] = useState(true);
  const [comments, setComments] = useState([]);
  const [replyComments, setReplyComments] = useState(false);
  const [parentCommentId, setParentCommentId] = useState("");
  const [openModal, setOpenModal] = useState(false);


  useEffect(() => {
    getPostComments({ postId: post._id })
      .then((response: any) => {
        const commentData = response.data.comments;
        setComments(commentData);
        console.log(commentData)
      })
      .catch((error) => {
        toast.error(error.message);
        console.log(error);
      });
  }, [post._id]);

  const toggleLikedUsersPopup = () => {
    setShowLikedUsersPopup(!showLikedUsersPopup);
  };

  const handleReplyComments = (commentId: any) => {
    setReplyComments(true);
    setParentCommentId(commentId);
  };

  const handleDeleteComments = (commentId: any) => {
    deleteComment(commentId)
      .then((response: any) => {
        const data = response.data;

        if (response.status === 200) {
          const commentData = data.comments;
          setComments(commentData);
          toast.error(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((error) => {
        console.log(error?.message);
        toast.error("An error occurred. Please try again.");
      });
  };

  const handleCancelReplyComments = () => {
    setReplyComments(false);
    setParentCommentId("");
  };

  const handleIsComment = () => {
    setIsComment(true);
  };

  const commentInitialValues = {
    comment: "",
  };

  const commentValidationSchema = Yup.object({
    comment: Yup.string().required("Comment is required"),
  });

  const commentHandleSubmit = (values: any, { resetForm }: any) => {
    try {
      const commentData = {
        postId: post._id,
        userId: userId,
        comment: values.comment,
      };

      addComment(commentData)
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            const commentData = data.comments;
            setComments(commentData);
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error?.message);
          toast.error("An error occurred. Please try again.");
        });

      resetForm();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const ReplyCommentHandleSubmit = (values: any, { resetForm }: any) => {
    try {
      const commentData = {
        commentId: parentCommentId,
        userId: userId,
        replyComment: values.comment,
      };

      replyComment(commentData)
        .then((response: any) => {
          const data = response.data;
          if (response.status === 200) {
            const commentData = data.comments;
            setComments(commentData);
            toast.success(data.message);
          } else {
            toast.error(data.message);
          }
        })
        .catch((error) => {
          console.log(error?.message);
          toast.error("An error occurred. Please try again.");
        });
      setReplyComments(false);

      resetForm();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div
      className="bg-white overflow-hidden z-50 w-full shadow-none"
      style={{ width: "1000px" }}
    >
      <div className="grid grid-cols-3 min-w-full ">
        <div className=" col-span-2 w-full h-full">
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
            <Carousel pauseOnHover slideInterval={5000}>
              {post.imageUrl &&
                post.imageUrl.map((image) => (
                  <img className=" " src={image} alt="Description" />
                ))}
            </Carousel>
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
              <p className="block ml-2 font-bold">{post.userId.userName}</p>
            </a>
          </header>
                  {
                    isComment && post.hideComment&& (
                      <div className="home-scroll-post">
                      <div className="home-scrollbox-post flex items-center justify-center">
                        <div >
                            <h1 className="text-md font-semibold">Comments are hidden.</h1>
                        </div>
                      </div>
      
                   
                    </div>
                    )
                  }
           {isComment  && !post.hideComment && (
            <>
            

              <div className="home-scroll-post">
                <div className="home-scrollbox-post ">
                  {comments.map((comment: any) => (
                    <div key={comment._id}>
                      <div className="mb-6">
                        <div className="flex justify-between items-center me-4">
                          <div className="flex items-center ">
                            <img
                              className="h-9 w-9 rounded-full border-2 p-.5 mb-3"
                              src={comment.userId.profileImg}
                              alt="Profile"
                            />
                            <div className="w-full flex me-2">
                              <p className=" text-xs mx-3 font-semibold text-black">
                                {comment.userId.userName}
                              </p>
                              <p
                                className="text-xs text-gray-400"
                                style={{ fontSize: "9px" }}
                              >
                                {formatDistanceToNow(
                                  new Date(comment.createdAt),
                                  { addSuffix: true }
                                )}
                              </p>
                            </div>
                          </div>
                          <div className="flex">
                            <button
                              onClick={() => handleReplyComments(comment._id)}
                              style={{ fontSize: "10px" }}
                              className="text-xs text-purple-600 flex"
                            >
                              Reply{" "}
                            </button>
                            {user.userName == comment.userId.userName && (
                              <button
                                onClick={() => {setOpenModal(true);setParentCommentId(comment._id)}}
                                className="ms-2"
                              >
                                <Trash2 color="gray" size={10} />
                              </button>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-800 mx-3">
                            {comment.comment}
                          </p>
                        </div>
                      </div>

                      {comment.replyComments.map((reply: any) => (
                        <div key={reply._id} className="ms-10 reply-commment">
                          <div className="flex justify-between items-center me-4">
                            <div className="flex items-center ">
                              <img
                                className="h-9 w-9 rounded-full border-2 p-.5 mb-3"
                                src={reply.userId.profileImg}
                                alt="Profile"
                              />
                              <div className="w-full flex me-2">
                                <p className=" text-xs mx-3 font-semibold text-black">
                                  {reply.userId.userName}
                                </p>
                                <p
                                  className="text-xs text-gray-400"
                                  style={{ fontSize: "9px" }}
                                >
                                  {formatDistanceToNow(
                                    new Date(reply.timestamp),
                                    { addSuffix: true }
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-gray-800 mx-3">
                              {reply.replyComment}
                            </p>
                          </div>
                        </div>
                      ))}
                      
                    </div>
                    
                  
                  ))}
                </div>

             
              </div>
              {replyComments && (
                <Formik
                  initialValues={commentInitialValues}
                  validationSchema={commentValidationSchema}
                  onSubmit={ReplyCommentHandleSubmit}
                >
                  <Form>
                    <div className="w-full items-center absolute bottom-0 pe-6 bg-white h-20">
                      <div>
                        <p className="text-xs font-bold mb-1">@{user.userName}</p>
                      </div>
                      <div className="flex">
                        <Field
                          className="w-full ps-3 border-gray-200 border  focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-purple-600   rounded-md text-xs resize-none outline-none appearance-none"
                          aria-label="post your comments..."
                          placeholder="post your comments..."
                          autoComplete="off"
                          autoCorrect="off"
                          style={{ height: "36px" }}
                          name="comment"
                        />
                        <button
                          type="submit"
                          className="mx-4 text-xs  focus:outline-none border-none bg-transparent text-purple-600"
                        >
                          Reply
                        </button>
                        <button
                          onClick={handleCancelReplyComments}
                          className="text-xs text-red-700 me-3"
                        >
                          cancel
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              )}

              {!replyComments && (
                <Formik
                  initialValues={commentInitialValues}
                  validationSchema={commentValidationSchema}
                  onSubmit={commentHandleSubmit}
                >
                  <Form>
                    <div className="w-full flex items-center absolute bottom-0 pe-6 bg-white h-14">
                      <Field
                        className="w-full ps-3 border-gray-200 border  focus:border-gray-200 focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-purple-600   rounded-md text-xs resize-none outline-none appearance-none"
                        aria-label="post your comments..."
                        placeholder="post your comments..."
                        autoComplete="off"
                        autoCorrect="off"
                        style={{ height: "36px" }}
                        name="comment"
                      />
                      <button
                        type="submit"
                        className="mx-2 text-xs  focus:outline-none border-none bg-transparent text-purple-600"
                      >
                        Comment
                      </button>
                    </div>
                  </Form>
                </Formik>
              )}
            </>
          )}

   
        </div>
      </div>
      {showLikedUsersPopup && (
        <LikedUsers likedUsers={post.likes} onClose={toggleLikedUsersPopup} />
      )}
      <Modal
                  show={openModal}
                  size="md"
                  onClose={() => setOpenModal(false)}
                  popup
                >
                  <Modal.Header />
                  <Modal.Body>
                    <div className="text-center">
                      {/* <HiOutlineExclamationCircle className="mx-auto text-xs  mb-4 h-10 w-10 text-gray-400 dark:text-gray-200" /> */}
                      <h3 className="mb-5 text-xs font-normal text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete this this comment?
                      </h3>
                      <div className="flex justify-center gap-4 ">
                        <button
                          className="text-xs flex gap-1 text-purple-600 font-semibold border px-2 py-1 rounded-md border-purple-600"
                          onClick={() => {
                            setOpenModal(false);
                            handleDeleteComments(parentCommentId);
                            setParentCommentId("")
                          }}
                        >
                          Yes, I'm sure
                        </button>{" "}
                        <button
                          className="text-xs border px-4 py-1 rounded-md border-gray-600"
                          onClick={() => setOpenModal(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
    </div>
  );
};

export default ViewPost;
