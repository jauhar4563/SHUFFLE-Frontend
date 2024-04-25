export const userUrls = {
  register: "/register",
  registerOtp: "/register-otp",
  resendOtp: "/resend-otp",
  login: "/login",
  googleAuth: "/google-auth",
  forgotPassword: "/forgot-password",
  forgotOtp: "/forgot-otp",
  resetPassword: "/reset-password",
  getHashtags: "/get-hashtags",
  getUserDetails: "/user-details",
  editProfile: "/edit-profile",
  userSuggestions: "/user-suggestions",
  checkout: "/checkout-user",
  validate: "/validate-payment",
  allTransactions: "/get-transactions",
  getNotifications: "/get-notifications",
};

export const postUrls = {
  addPost: "/post/add-post",
  getAllPosts: "/post/get-post",
  getUserPosts: "/post/get-user-post",
  editPost: "/post/edit-post",
  deletePost: "/post/delete-post",
  likePost: "/post/like-post",
  savePost: "post/save-post",
  getSavedPosts: "post/user-saved-post",
  getAllPostComments: "/post/get-post-comments",
  addComment: "/post/add-comment",
  replyComment: "/post/reply-comment",
  deleteComment: "/post/delete-post-comment",
  commentsCount: "/post/get-comments-count",
  reportPost: "/post/report-post",
};

export const connectionUrls = {
  follow: "/connection/follow",
  unFollow: "/connection/unFollow",
  acceptRequest: "/connection/accept-request",
  rejectRequest: "/connection/reject-request",
  requestedUsers: "/connection//get-requested-users",
  getConnection: "/connection/get-connection",
};

export const chatUrl = {
  addConversation: "/chat/add-conversation",
  getUserConversation: "/chat/get-conversations",
  findConversation: "/chat/find-conversation",
  addMessage: "/chat/add-message",
  getMessages: "/chat/get-messages",
  getEligibleUsers: "/chat/chat-eligible-users",
  addChatGroup: "/chat/add-chat-group",
  getUserGroups: "/chat/get-groups",
  addGroupMessage: "/chat/add-group-message",
  getGroupMessages: "/chat/get-group-messages",
  lastMessages: "/chat/get-last-messages",
  lastGroupMessages: "/chat/last-group-messages",
  setMessageRead: "/chat/set-message-read",
  getUnreadMessages:'/chat/get-unread-messages'
};

export const storyUrl = {
  addStory: "/story/add-story",
  getStories: "/story/get-stories",
  readStory:'/story/read-story'
};

export const adminUrl = {
  login: "/admin/login",
  userList: "/admin/get-users",
  userBlock: "/admin/user-block",
  hashtagList: "/admin/hashtags",
  addHashtag: "/admin/add-hashtag",
  blockHashtag: "/admin/block-hashtag",
  editHashtag: "/admin/edit-hashtag",
  postList: "/admin/get-posts",
  postBlock: "/admin/post-block",
  getReports: "/admin/get-reports",
  chartData:'/admin/chart-data',
  dashboardStats:'/admin/dashboard-stats',
  getTransactions:'/admin/transactions'
};
