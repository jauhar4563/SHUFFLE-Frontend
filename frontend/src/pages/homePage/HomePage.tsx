
import Posts from "../../components/Posts"
import UserSuggestionBar from "../../components/UserSuggestionBar"
import AddPost from "../../components/AddPost"
import { useEffect, useState } from "react";
import { getAllPosts } from "../../services/api/user/apiMethods";
import PostShimmer from "../../components/shimmerUI/postShimmer";
import { toast } from "sonner";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]); 

  useEffect(() => {
    try {
      setLoading(true);
      setTimeout(()=>{
        getAllPosts()
        .then((response:any) => {
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
      },2000)
        
    
    } catch (error) {
    console.log(error);
    
    }
  }, [setPosts]);
  return (
    <>

            <div className="flex flex-col  h-full">
              <div className="z-40">

              <AddPost />
              </div>
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
            {posts.map((post:any) => (
              <Posts key={post._id} post={post} />
            ))}
          </div>
        )}
    
            </div>
            <UserSuggestionBar />

    </>
  )
}

export default HomePage