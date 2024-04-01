import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    adminPostBlock,
    adminPostList,
  adminUserBlock,
  adminUserList,
} from "../../services/api/admin/apiMethods";
import { CheckCheck } from "lucide-react";
import { Button, Modal,Pagination  } from "flowbite-react";
import { BookLockIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const PostList: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [filteredPosts,setFilteredPosts] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [blockAction, setBlockAction] = useState<"block" | "unblock">("block");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount , setTotalCount] =useState(0);

  const onPageChange = (page: number) => setCurrentPage(page);

  useEffect(() => {
    fetchUsers();
  }, [currentPage]); 

  const fetchUsers=()=>{
    adminPostList(currentPage)
    .then((response: any) => {
      const postsData = response.data;
      setPosts(postsData.posts);
      setFilteredPosts(postsData.posts);
      const totalpostCount = Math.ceil(postsData.totalPosts/6)
      setTotalCount(totalpostCount)
      console.log(postsData.posts);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handlePostBlock = (postId: string, status: string) => {
    try {
      setSelectedUserId(postId);
      setBlockAction(status === "block" ? "unblock" : "block");
      setOpenModal(true);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const confirmBlockPost = (postId: string, status: string) => {
    setOpenModal(false);
    const requestData = { postId };
    console.log(requestData);
    adminPostBlock(requestData)
      .then((response: any) => {
        const data = response.data;
        if (status == "block") {
          toast.error(data.message);
        } else {
          toast.info(data.message);
        }
        setPosts((prevposts) =>
          prevposts.map((post) => {
            if (post._id === postId) {
              return { ...post, isBlocked: !post.isBlocked };
            }
            return post;
          })
        );
        setFilteredPosts((prevposts) =>
        prevposts.map((post) => {
          if (post._id === postId) {
            return { ...post, isBlocked: !post.isBlocked };
          }
          return post;
        })
      );
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleSearch = (searchText: string) => {
    const filtered = posts.filter((post) =>
      post.userId.userName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredPosts(filtered);
  };
  return (
    <div className="w-full overflow-hidden rounded-lg border border-gray-200 shadow-md m-5">
       <div className="w-12/12">
          <label
            htmlFor="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="search"
              onChange={(e) => handleSearch(e.target.value)}
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search"
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </div>
        </div>
      <table className=" w-full border-collapse bg-white text-left text-sm text-gray-500">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Name
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              User
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Likes
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Date
            </th>
            <th scope="col" className="px-6 py-4 font-medium text-gray-900">
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-4 font-medium flex justify-center text-gray-900"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 border-t border-gray-100">
          {filteredPosts.length > 0 &&
            filteredPosts.map((post: any) => (
              <tr key={post._id} className="hover:bg-gray-50">
                <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                  <div className="relative h-10 w-10">
                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={post.imageUrl}
                      alt=""
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {post.title}
                    </div>
                    <div className="text-gray-400">{post.description}</div>
                  </div>
                </th>
                <td className="px-6 py-4">
                <div className="relative  h-10 w-10">
                    <div>

                    <img
                      className="h-full w-full rounded-full object-cover object-center"
                      src={post.userId.profileImg}
                      alt=""
                    />
                    <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                    </div>
                  </div>
                  <div className="text-sm">
                    <div className="font-medium text-gray-700">
                      {post.userId.userName}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                {post.likes.length}

                </td>
                <td className="px-6 py-4">
                    {post.date}
                {/* {formatDistanceToNow(
                                    new Date(user.timestamp),
                                    { addSuffix: true }
                                  )} */}
                </td>

                <td className="px-6 py-4">
                  {post.isBlocked ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-red-600">
                      Blocked
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">
                      UnBlocked
                    </span>
                  )}
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-end gap-4">
                    {post.isBlocked ? (
                      <button
                        type="button"
                        onClick={() => handlePostBlock(post._id, "unblock")}
                        className=" bg-white text-blue-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                      >
                        <CheckCheck />
                        UnBlock
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handlePostBlock(post._id, "block")}
                        className=" bg-white text-red-600 hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="h-6 w-6"
                          x-tooltip="tooltip"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                        Block
                      </button>
                    )}

                    {/* <a x-data="{ tooltip: 'Edite' }" href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                    x-tooltip="tooltip"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                    />
                  </svg>
                </a> */}
                  </div>
                </td>
              </tr>
            ))}
          {/* Additional rows can be added here */}
        </tbody>
        <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          layout="table"
          currentPage={currentPage}
          totalPages={totalCount} // Change this to the total number of pages
          onPageChange={onPageChange}
          showIcons
        />    </div>
      </table>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Body>
          <div className="text-center">
            <BookLockIcon className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to{" "}
              {blockAction === "unblock" ? "block" : "unblock"} this user?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color={blockAction === "block" ? "blue" : "failure"}
                onClick={() => confirmBlockPost(selectedUserId, "block")}
              >
                Yes, {blockAction === "unblock" ? "block" : "unblock"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default PostList;
