import { useEffect, useState } from "react";
import PostShimmer from "../../components/shimmerUI/postShimmer";
import Posts from "../../components/Posts";
import { getSavedPost } from "../../services/api/user/apiMethods";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function SavedPost() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(() => {
        getSavedPost({ userId: user._id })
          .then((response: any) => {
            const postsData = response.data;
            console.log(response.data);
            setPosts(postsData);

          })
          .catch((error) => {
            toast.error(error.message);
          })
          .finally(() => {
            setLoading(false);
          });
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <div className="flex flex-col  h-full">
        {loading ? (
          // Render shimmer UI when loading
          <div className="">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <PostShimmer />
              </div>
            ))}
          </div>
        ) : (
          // Render posts when not loading
          <div className="">
            {posts.map((post: any) => (
              <Posts key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SavedPost;
