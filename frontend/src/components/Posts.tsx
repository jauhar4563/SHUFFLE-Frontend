import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditPost from "./EditPost";
interface PostProps {
  post: {
    _id: string;
    userId: {
      _id: string;
      userName: string;
      profileImg: string;
    };
    title:string;
    imageUrl: string;
    description: string;
    likes: any[]; 
    isHidden: boolean;
    isBlocked: boolean;
    hideComment: boolean;
    hideLikes: boolean;
    date: string;
   
  };
}


const Posts:React.FC<PostProps> = ({ post })=> {
  const selectUser = (state:any)=>state.auth.user;
  const user = useSelector(selectUser);
  const [isOpen, setIsOpen] = useState(false);
  const [editPostData, setEditPostData] = useState<any>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleEdit = () => {
    console.log(post)
    setEditPostData(post);

  };
  const handleCancelEdit = () => {
    setEditPostData(null);
  };

  const handleDelete = () => {
  };

  return (
    <>
      <div className="lg:col-span-2 ms-96 w-12/12 p-4  " id="posted">
        <div className="flex flex-col">
          <div className="bg-white p-6 mb-4 rounded-lg shadow-md max-w-full">
            {/* User Info with Three-Dot Menu */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src={post.userId.profileImg}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex items-center">
                  <p className="text-gray-800 font-semibold mx-1">
                    {post.userId.userName}
                  </p>
                  <svg
                    viewBox="0 0 22 22"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                  >
                    <path
                      d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                      fill="#1d9bf0"
                    ></path>
                  </svg>

                  <p className="text-gray-500 text-sm ml-2">@johndoe200</p>
                  <p className="text-gray-500 text-sm mx-1">-</p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </div>
              <div className="text-gray-500 cursor-pointer">
                {post.userId._id===user._id && (
                  <button
                  className="hover:bg-gray-50 rounded-full p-1"
                  onClick={toggleDropdown}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="7" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="17" r="1" />
                  </svg>
                </button>
                ) 
                
                }
                {isOpen && (
        <div className="absolute  right-96 mt-2 w-40 bg-white divide-y divide-gray-100 rounded-lg shadow-lg">
          <button
            className="block px-4 py-2 hover:bg-gray-100 w-40"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="block px-4 py-2 hover:bg-gray-100 w-40"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
              </div>
            </div>
            {/* Message */}
            <div className="mb-4">
              <p className="text-gray-500 text-base">
                {post.title}{" "}
                <a href="" className="text-blue-600">
                  #Negan
                </a>{" "}
                <a href="" className="text-blue-600">
                  #TWD
                </a>
              </p>
            </div>
            {/* Image */}
            <div className="mb-4">
              <img
                src={post.imageUrl}
                alt="Post Image"
                className="w-full h-80 object-cover rounded-md"
              />
            </div>
            {/* Like and Comment Section */}
            <div className="flex items-center justify-between text-gray-500">
              <div className="flex items-center space-x-2">
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
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
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>

                  <span className="text-sm">42</span>
                </button>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
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
                      d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                    />
                  </svg>

                  <span className="text-sm">42</span>
                </button>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
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

                  <span className="text-sm">3</span>
                </button>
              </div>
            </div>
          </div>
         
        </div>
      </div>
      {editPostData && (
        <EditPost post={editPostData} onCancelEdit={handleCancelEdit} />
      )}
    </>
  );
}

export default Posts;
