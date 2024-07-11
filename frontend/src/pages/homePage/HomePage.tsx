import React, { useEffect, useState } from "react";
import Posts from "../../components/Posts";
import UserSuggestionBar from "../../components/UserSuggestionBar";
import AddPost from "../../components/AddPost";
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
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response: any = await getAllPosts({
          userId,
          searchTerm: "",
          page,
        });
        const postsData = response.data;
        if (postsData.length === 0) {
          setHasMore(false);
        }
        setPosts((prev) => [...prev, ...postsData]);
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [page]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      hasMore &&
      !loading
    ) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div>
          <AddPost setNewPost={setPosts} />
        </div>
        {loading && page === 1 ? (
          <div>
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index}>
                <PostShimmer />
              </div>
            ))}
          </div>
        ) : (
          <div>
            {posts.map((post: any) => (
              <Posts key={post._id} post={post} />
            ))}
          </div>
        )}

        {loading && page > 1 && (
          <div className="lg:col-span-2 lg:ms-96 w-12/12 lg:pl-4 s pt-2 lg:pt-4 flex justify-center">
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
