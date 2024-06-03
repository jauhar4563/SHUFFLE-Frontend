import Posts from "../../components/Posts";
import UserSuggestionBar from "../../components/UserSuggestionBar";
import AddPost from "../../components/AddPost";
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/api/user/apiMethods";
import PostShimmer from "../../components/shimmerUI/postShimmer";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import { Spinner } from "flowbite-react";

function HomePage() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";

  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    try {
      fetchposts();
    } catch (error) {
      console.log(error);
    }
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    )
      setPage((prev) => prev + 1);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  const fetchposts = () => {
    setLoading(true);
    setTimeout(() => {
      getAllPosts({ userId: userId, searchTerm: "", page })
        .then((response: any) => {
          const postsData = response.data;
          if (page > 1) {
            setPosts((prev: any[]) => [...prev, ...postsData]);
          } else {
            setPosts(postsData);
          }
        })
        .catch((error) => {
          toast.error(error.message);
        })
        .finally(() => {
          setLoading(false);
          setIsFetching(false); // Set fetching status to false
        });
    }, 1000);
  };

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="">
          <AddPost setNewPost={setPosts} />
        </div>
        {loading && page === 1 ? (
          // Render shimmer UI when loading
          <div className=" ">
            /*{" "}
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <PostShimmer />
              </div>
            ))}{" "}
            */
          </div>
        ) : (
          // Render posts when not loading
          <div className="">
            {posts.map((post: any) => (
              <Posts key={post._id} post={post} />
            ))}
          </div>
        )}

        {loading && page > 1 && (
          <div className="lg:col-span-2  lg:ms-96 w-12/12 lg:pl-4 s pt-2 lg:pt-4 flex justify-center">
            <Spinner
              color="purple"
              size="md"
              aria-label="Purple spinner example"
            />
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
