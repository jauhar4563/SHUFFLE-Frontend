import Posts from "../../components/Posts";
import UserSuggestionBar from "../../components/UserSuggestionBar";
import AddPost from "../../components/AddPost";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/api/user/apiMethods";
import PostShimmer from "../../components/shimmerUI/postShimmer";
import { toast } from "sonner";
import { useSelector } from "react-redux";

function HomePage() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      
     fetchposts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const fetchposts=()=>{
    setLoading(true);
      getAllPosts({userId:userId})
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
  }

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="">
          <AddPost setNewPost={setPosts}/>
        </div>
        {loading ? (
          // Render shimmer UI when loading
          <div className=" ">
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
      <div className="hidden lg:block">

      <UserSuggestionBar />
      </div>
    </>
  );
}

export default HomePage;
