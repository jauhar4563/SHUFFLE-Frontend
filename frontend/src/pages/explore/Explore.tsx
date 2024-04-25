import { useEffect, useState } from "react";
import PostGallary from "../../components/PostGallary";
import { getAllPosts } from "../../services/api/user/apiMethods";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { usePostSearchContext } from "../../utils/context/posts/PostSearchContext";

function Explore() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const { postSearchData } = usePostSearchContext();

  useEffect(() => {
    setLoading(true);
    const searchValue = postSearchData.search || "";
    getAllPosts({ userId:userId ,searchTerm:searchValue})
      .then((response: any) => {
        const postsData = response.data;
        setPosts(postsData);

        console.log(postsData);
      })
      .catch((error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [postSearchData,userId]);
  return (
    <div className="ml-5 w-8/12">
      <div className="ms-96 mt-5 grid grid-cols-2 md:grid-cols-3 w-11/12 gap-4">
        {!loading &&
          posts.map((post: any) => (
            <div key={post._id}>
              <PostGallary post={post} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Explore;
