import { useEffect, useState } from "react";
import PostGallary from "../../components/PostGallary";
import { getAllPosts, userSearch } from "../../services/api/user/apiMethods";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { usePostSearchContext } from "../../utils/context/posts/PostSearchContext";
import { BadgeCheck } from "lucide-react";
import { Link } from "react-router-dom";

function Explore() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";
  const [isPostSelected, setIsPostSelected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const { postSearchData }: any = usePostSearchContext();

  useEffect(() => {
    setLoading(true);
    const searchValue = postSearchData.search || "";

    getAllPosts({ userId: userId, searchTerm: searchValue })
      .then((response: any) => {
        const postsData = response.data;
        setPosts(postsData);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    userSearch({searchTerm:searchValue})
      .then((response: any) => {
        setUsers(response.data);
      })
      .catch((error) => {
        toast.error(error.message);
      });

  }, [postSearchData, userId]);

  return (
    <div className="lg:ml-5 w-full p-2 lg:w-8/12">
      <div className="flex gap-2 lg:ms-96 mt-2 lg:mt-5">
        <div
          onClick={() => setIsPostSelected(true)}
          className={`${
            isPostSelected ? "bg-white" : "bg-gray-200 cursor-pointer"
          } py-2 px-3 rounded-lg`}
        >
          <p className={`${isPostSelected ? "" : "text-gray-500"}`}>Posts</p>
        </div>
        <div
          onClick={() => setIsPostSelected(false)}
          className={`${
            !isPostSelected ? "bg-white" : "bg-gray-200 cursor-pointer"
          } py-2 px-3 rounded-lg`}
        >
          <p className={`${!isPostSelected ? "" : "text-gray-500"}`}>Users</p>
        </div>
      </div>
      {isPostSelected && (
        <div className="lg:ms-96 mt-5 grid grid-cols-2 md:grid-cols-3 w-full lg:w-11/12 gap-4">
          {!loading &&
            posts.map((post: any) => (
              <div key={post._id}>
                <PostGallary post={post} />
              </div>
            ))}
        </div>
      )}
      {!isPostSelected && users.length !== 0 && (
        <div className="lg:ms-96 mt-5 p-2 grid grid-cols-2 md:grid-cols-3 w-full lg:w-11/12 gap-4">
          {users.map((user: any) => (
            <div className="bg-white rounded-lg  h-52">
              <div className="flex  justify-center mt-5">
                <img
                  src={user.profileImg}
                  className="rounded-full h-16"
                  alt=""
                />
               
              </div>
              <div className="flex items-center gap-1 justify-center mt-5">
                <p className="text-sm font-medium">{user.userName}</p>
                {
                  user.isVerified && 
                  <BadgeCheck size={20} color="white" fill="#7E3AF2" />
                }
               
              </div>
              <div className="flex justify-center mt-5">
                <Link
                  className="flex text-white bg-purple-600 rounded-lg p-2 text-sm font-medium"
                  to={`/users-profile/${user._id}`}
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Explore;
