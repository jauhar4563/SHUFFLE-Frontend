import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { toast } from "sonner";
import * as Yup from "yup";
import { editPost, getAllHashtag } from "../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../utils/context/reducers/authSlice";
import Select from "react-select";
interface EditPostProps {
  post: {
    _id: string;
    userId: {
      _id: string;
      username: string;
      profileImg: string;
    };
    title: string;
    description: string;
    imageUrl: string;
    hideLikes: boolean;
    hideComment: boolean;
    hashtags:string[];
  };
  onCancelEdit: () => void;
}

const EditPost: React.FC<EditPostProps> = ({ post, onCancelEdit }) => {
  const dispatch = useDispatch();
  const selectUser = (state: any) => state.auth.user || "";
  const user = useSelector(selectUser) || "";
  const userId = user._id || "";
  const [hideLikes, setHideLikes] = useState(post.hideLikes);
  const [hideComment, setHideComment] = useState(post.hideComment);
  const [hashtags, setHashtags] = useState([]);
  const [selectedHashtags, setSelectedHashtags] = useState<any[]>([]);


  useEffect(() => {
    try {
      getAllHashtag().then((response: any) => {
        setHashtags(response.data.hashtags);
      });
    } catch (error) {
      console.log(error.message);
    }
  }, []);


  useEffect(() => {
    const seletedTags = post.hashtags.map((tag: any) => ({
      value: tag,
      label: tag,
    }));
  
    setSelectedHashtags(seletedTags);
  }, [post.hashtags]);

  const selectOptions = hashtags.map((tag: any) => ({
    value: tag.hashtag,
    label: tag.hashtag,
  }));


  const formik = useFormik({
    initialValues: {
      title: post.title,
      description: post.description,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: async (values) => {
      const postId = post._id;
      const { title, description } = values;
      try {
        await editPost({
          userId,
          postId,
          title,
          description,
          hashtags:selectedHashtags,
          hideComment,
          hideLikes,
        }).then((response: any) => {
          const postData = response.data;
          console.log(postData)
          dispatch(setPosts({ posts: postData.posts }));
          toast.info("Post updated successfully");
          onCancelEdit();
        });
      } catch (error) {
        console.error("Error updating post:", error);
        toast.error("Failed to update post");
      }
    },
  });
  const handleHideLikesToggle = () => {
    setHideLikes(!hideLikes);
  };

  const handleHideCommentToggle = () => {
    setHideComment(!hideComment);
  };

  return (
    <div className="addpost-popup z-50">
      <div className="addpost-popup">
        <div className="addpost-modal rounded-xl flex bg-gray-100 mx-auto w-10/12 flex-col text-gray-800 border z-50 border-gray-300 p-5 shadow-lg max-w-2xl">
          <p className="font-semibold text-5xl m-3">Edit Post</p>
          <hr />
          <form onSubmit={formik.handleSubmit}>
            <div className="flex ">
              <div className=" flex items-center bg-white shadow-lg justify-center h-64 cursor-pointer">
                {/* Image Preview */}
                <img
                  style={{ height: "250px", borderRadius: "10px" }}
                  src={post.imageUrl[0]}
                  alt=""
                />
              </div>
              <div className="flex flex-col ml-3 w-6/12">
                <p className="font-semibold">Title</p>
                <input
                  type="text"
                  placeholder="Title"
                  className="rounded-lg shadow-lg p-2 py-3 mb-3 outline-none text-xs font-normal"
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="title"
                />
                {formik.touched.title && formik.errors.title && (
                  <p className="text-red-600 text-xs">{formik.errors.title}</p>
                )}
                <p className="font-semibold mb-2">Description</p>
                <textarea
                  className="rounded-lg description sec p-3 h-40 shadow-lg border-gray-300 outline-none text-xs font-normal"
                  spellCheck="false"
                  placeholder="Describe everything about this post here"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="description"
                ></textarea>
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-600 text-xs">
                    {formik.errors.description}
                  </p>
                )}
                 <p className="font-semibold">Hashtags</p>
                <Select
                  options={selectOptions}
                  isMulti
                  value={selectedHashtags}
                  onChange={(selectedOption) =>{
                    console.log(selectedOption)
                    
                    setSelectedHashtags(selectedOption) 
                  }
                  }
                />
              </div>
            </div>
            {/* Buttons */}
            <div className="icons flex text-gray-500 m-2">
              <label className="inline-flex items-center me-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={hideComment}
                  onChange={handleHideCommentToggle}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                <span className="ms-3 text-sm font-semibold text-gray-900 dark:text-gray-900">
                  Hide Comments
                </span>
              </label>
              <label className="inline-flex items-center me-5 cursor-pointer">
                <input
                  type="checkbox"
                  value=""
                  className="sr-only peer"
                  checked={hideLikes}
                  onChange={handleHideLikesToggle}
                />
                <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700   peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-purple-600"></div>
                <span className="ms-3 text-sm font-semibold text-gray-900 dark:text-gray-900">
                  Hide Likes
                </span>
              </label>
            </div>
            <div className="buttons flex">
              <div
                onClick={onCancelEdit}
                className="text-xs btn border border-gray-300 px-6 py-3 rounded-lg cursor-pointer text-gray-500 ml-auto hover:bg-red-600 hover:text-white"
              >
                Cancel
              </div>
              <button
                type="submit"
                className="text-xs rounded-lg btn border px-6 py-3 cursor-pointer text-white ml-2 bg-gradient-to-b from-purple-600 to-blue-400 hover:bg-green-600"
              >
                Update Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
