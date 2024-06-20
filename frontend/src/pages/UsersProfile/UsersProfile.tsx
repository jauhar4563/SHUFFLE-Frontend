import { useEffect, useState } from "react";
import UserDetails from "../../components/UserDetails";
import {
  getUserDetails,
  getUserPost,
} from "../../services/api/user/apiMethods";
import { toast } from "sonner";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import PostGallary from "../../components/PostGallary";

function UsersProfile() {
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const loggedUserId = userData._id;
  const [isConnected, setIsConnected] = useState(false);
  const [user, setUser] = useState(null);
  const [connections, setConnections] = useState(null);
  const [Post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams<string>();

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
    getUserPost(userId)
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
    <div className="lg:ml-5 w-full lg:w-9/12">
      {!loading && <UserDetails user={user} connections={connections} isConnected={isConnected}/>}

      {(isConnected || !user?.isPrivate) && (
         <div className="lg:ms-96 mt-5 grid grid-cols-2 md:grid-cols-3 w-full lg:w-11/12 gap-4">
         {Post.map((post: any) => (
           <div key={post._id}>
             <PostGallary post={post} />
           </div>
         ))}
 
       
       </div>
      )}
    </div>
  );
}

export default UsersProfile;
