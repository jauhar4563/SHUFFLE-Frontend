import { useEffect, useState } from "react";
import Posts from "../../components/Posts";
import { getUserConnection, getUserPost } from "../../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../utils/context/reducers/authSlice";
import PostShimmer from "../../components/shimmerUI/postShimmer";
import { Pencil, Share2Icon } from "lucide-react";
import ProfileEdit from "../../components/ProfileEdit";
import Followers from "../../components/FollowersList";
import Following from "../../components/FollowingList";

function Profile() {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const selectPosts = (state: any) => state.auth.posts;
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id;
  const posts = useSelector(selectPosts) || [];
  const[isProfileEdit,setIsProfileEdit] = useState(false);
  const [followers,setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowingModal,setIsFollowingModal] = useState(false);
  const [isFollowersgModal,setIsFollowersgModal] = useState(false);



  useEffect(() => {
    try {
      setLoading(true);

      getUserPost({ userId })
        .then((response: any) => {
          const postsData = response.data;
          dispatch(setPosts({ posts: response.data }));
          console.log(postsData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });

        getUserConnection({ userId })
      .then((response: any) => {
        const connectionData = response.data.connection;
        setFollowing(connectionData.following);
        setFollowers(connectionData.followers);
        console.log(response.data.connection);
      })
      .catch((error) => {
        console.log(error.message);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFollwersModal =()=>{
    return setIsFollowersgModal(!isFollowersgModal)
  }

  const handleFollwingModal =()=>{
    return setIsFollowingModal(!isFollowingModal)
  }

  const handleEditClose=()=>{
    return setIsProfileEdit(!isProfileEdit)
  }

  return (
    <div className="ml-5 w-9/12">
      <div className='ms-96 flex mt-5 flex-col bg-white p-4 pl-10 w-11/12'>
        <div className='flex mt-24 justify-between '>
          <div className='flex flex-col gap-4'>
            <img className=' h-28 ' src={user.profileImg} alt="" />
            <p className='font-semibold text-lg'>{user.userName}</p>
          </div>
          <div className='flex gap-6 '>
            <div onClick={handleFollwingModal} className='flex flex-col cursor-pointer items-center'>
              <p>{following.length}</p>
              <p>Following</p>
            </div>
            <div onClick={handleFollwersModal} className='flex flex-col cursor-pointer items-center'>
              <p>{followers.length}</p>
              <p>Followers</p>
            </div>
            <div className='flex flex-col items-center'>
              <p>{posts.length}</p>
              <p>Posts</p>
            </div>
          </div>
          <div className='flex gap-5 mr-14'>
            <Pencil onClick={()=>setIsProfileEdit(true)}/>
            <Share2Icon />
            
          </div>
          
        </div>
        <div className='w-11/12'>
          <p className='font-semibold'>About Me</p>
          <p className=''>
            {user.bio?user.bio:' Lorem Ipsum is simply dummy text of the printing and typesetting industry.'}
          </p>
        </div>
      </div>
      <div className="flex">
        {loading ? (
          <div className="">
            <PostShimmer />
            <PostShimmer />
            <PostShimmer />
          </div>
        ) : (
          <div className="">
            {posts.map((post: any) => (
              <Posts key={post._id} post={post} />
            ))}
          </div>
        )}
        <div className=" bg-white"></div>
      </div>
      {isProfileEdit && (<ProfileEdit user={user} onClose={handleEditClose}/>)}
      {isFollowersgModal && (<Followers followers={followers} followingUsers={following} setFollowingUsers={setFollowing} onClose={handleFollwersModal} />)}
      {isFollowingModal && (<Following followingUsers={following} setFollowingUsers={setFollowing} onClose={handleFollwingModal} currentUser={ userId }/>)}
    </div>
  );
}

export default Profile;
