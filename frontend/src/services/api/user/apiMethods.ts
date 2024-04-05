import { apiCall } from "./apiCalls";
import { chatUrl, connectionUrls, postUrls, userUrls } from "../endPoints";
import { FormValues } from "../../../utils/validations/registerValidation";

//@dec      Register user
//method    POST

export const postRegister = (userData: FormValues) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.register, userData)
        .then((response) => {
          resolve(response);
          console.log(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      OTP Verification
//method    POST

export const postOTP = (otp: { otp: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(otp);
      apiCall("post", userUrls.registerOtp, otp)
        .then((response) => {
          resolve(response);
          console.log("apiMethods" + response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Resend OTP
//method    POST

export const postResendOTP = (email: { email: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(email);
      apiCall("post", userUrls.resendOtp, email)
        .then((response) => {
          resolve(response);
          console.log("apiMethods" + response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      User Login
//method    POST

export const postLogin = (userData: { email: string; password: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.login, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Google signup  user
//method    POST

export const googleAuthenticate = (userData: {
  username: string;
  email: string;
  imageUrl: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.googleAuth, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Forgot Password
//method    POST

export const forgotPassword = (email: { email: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(email);
      apiCall("post", userUrls.forgotPassword, email)
        .then((response) => {
          resolve(response);
          console.log("apiMethods" + response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Forgot Password OTP sent
//method    POST

export const forgotOTP = (otp: { otp: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(otp);
      apiCall("post", userUrls.forgotOtp, otp)
        .then((response) => {
          resolve(response);
          console.log("apiMethods" + response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Renew Password
//method    POST

export const renewPassword = (userData: {
  password: string;
  confirmPassword: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.resetPassword, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get All Hashtags
//method    get

export const getAllHashtag = () => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.getHashtags, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Add new Post
//method    POST

export const addPost = (postData: {
  userId: string;
  imageUrls: string[];
  title: string;
  description: string;
  hideLikes: boolean;
  hideComment: boolean;
  hashtag: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.addPost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get All Posts
//method    get

export const getAllPosts = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.getAllPosts, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get User Post
//method    POST

export const getUserPost = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.getUserPosts, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Edit User post
//method    POST

export const editPost = (postData: {
  userId: string;
  postId: string;
  title: string;
  description: string;
  hashtags: any[];
  hideLikes: boolean;
  hideComment: boolean;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.editPost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Delete a post
//method    POST

export const deletePost = (postData: { postId: string; userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.deletePost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Like a post
//method    POST

export const likePost = (postData: { postId: string; userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.likePost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Like a post
//method    POST

export const savePost = (postData: { postId: string; userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.savePost, postData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get Saved Post
//method    POST

export const getSavedPost = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.getSavedPosts, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get User Details
//method    POST

export const getUserDetails = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("get", userUrls.getUserDetails + `/${userId}`, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      followUser
//method    POST

export const followUser = (data: { userId: string; followingUser: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.follow, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      UnFollowUser
//method    POST

export const UnFollowUser = (data: {
  userId: string;
  unfollowingUser: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.unFollow, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get all follow requested Users
//method    POST

export const getRequestedUsers = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(userId);

      apiCall("post", connectionUrls.requestedUsers, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      accept follow Request
//method    POST

export const acceptFollowRequest = (data: {
  userId: string;
  requestedUser: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.acceptRequest, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      accept follow Request
//method    POST

export const rejectFollowRequest = (data: {
  userId: string;
  requestedUser: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", connectionUrls.rejectRequest, data)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      get connections of a user
//method    POST

export const getUserConnection = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      console.log(userId);

      apiCall("post", connectionUrls.getConnection, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Edit User post
//method    POST

export const editProfile = (userData: {
  userId: string;
  image: string;
  name: string;
  phone: string;
  bio: string;
  gender: string;
  isPrivate: boolean;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.editProfile, userData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      get connections of a user
//method    POST

export const getUserSuggestions = (userId: { userId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", userUrls.userSuggestions, userId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      get all comment
//method    POST
export const getPostComments = (postId: { postId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.getAllPostComments, postId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Add a comment
//method    POST

export const addComment = (commentData: {
  postId: string;
  userId: string;
  comment: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.addComment, commentData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Add a reply comment
//method    POST
export const replyComment = (commentData: {
  commentId: string;
  userId: string;
  replyComment: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", postUrls.replyComment, commentData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Delete a comment
//method    post
export const deleteComment = (commentId: { commentId: string }) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${postUrls.deleteComment}?commentId=${commentId}`;
      apiCall("get", url, commentId)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Add New Conversation
//method    post
export const addConversation = (conversationData: {
  senderId: string;
  receiverId: string;
}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.addConversation, conversationData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get User Conversations
//method    get
export const getUserConversations = (userId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrl.getUserConversation}/${userId}`;

      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};

//@dec      Get Conversation Between two users
//method    get
export const findConversation = (conversationData :{ firstUser: string,secondUser:string }) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrl.findConversation}/${conversationData.firstUser}/${conversationData.secondUser}`;

      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};



//@dec      Add New Message
//method    post
export const addMessage = (messageData: {conversationId:string,sender:string,text:string}) => {
  return new Promise((resolve, reject) => {
    try {
      apiCall("post", chatUrl.addMessage, messageData)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};


//@dec      Get User Conversations
//method    get
export const getUserMessages = (conversationId) => {
  return new Promise((resolve, reject) => {
    try {
      const url = `${chatUrl.getMessages}/${conversationId}`;

      apiCall("get", url, null)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (error) {
      resolve({ status: 500, message: "Somethings wrong." });
    }
  });
};
