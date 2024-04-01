import { useEffect, useState } from "react";
import UserDetails from "../../components/UserDetails";
import {
  getUserDetails,
  getUserPost,
} from "../../services/api/user/apiMethods";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import PostShimmer from "../../components/shimmerUI/postShimmer";
import Posts from "../../components/Posts";
import { useSelector } from "react-redux";

function UsersProfile() {
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const loggedUserId = userData._id;
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [connections, setConnections] = useState(null);
  const [Post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();

  useEffect(() => {
    getUserDetails(userId)
      .then((response: any) => {
        console.log(response.data);
        console.log(response.data.connections);
        setUser(response.data.user);
        setConnections(response.data.connections);
        const followers = response.data.connections.followers;
        setIsConnected(followers.includes(loggedUserId));
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
    getUserPost({ userId: userId })
      .then((response: any) => {
        const postsData = response.data;
        setPost(postsData);
        console.log(postsData);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="ml-5 w-9/12">
      {!loading && <UserDetails user={user} connections={connections} isConnected={isConnected}/>}

      {isConnected && (
        <div className="flex">
          {loading ? (
            <div className="">
              <PostShimmer />
              <PostShimmer />
              <PostShimmer />
            </div>
          ) : (
            <div className="">
              {Post.map((post: any) => (
                <Posts key={post._id} post={post} />
              ))}
            </div>
          )}
          <div className=" bg-white"></div>
        </div>
      )}
    </div>
  );
}

export default UsersProfile;
