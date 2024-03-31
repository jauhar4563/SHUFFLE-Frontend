const toggleDropdown = () => {
    setIsOpen(!isOpen);
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
    } catch (error) {
      console.log(error.message);
    }
  };

  const confirmDeletePost = () => {
    if (deletePostId) {
      handleDelete(deletePostId, post.userId._id);
      setDeletePostId(null);
    }
  };
  module.exports = {
    toggleDropdown,
    handleEdit,
    handleCancelEdit,
    handleDelete,
    confirmDeletePost
  };
