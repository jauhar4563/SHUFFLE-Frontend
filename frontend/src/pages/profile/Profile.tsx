import { useEffect, useState } from "react";
import Posts from "../../components/Posts";
import { getUserConnection, getUserPost } from "../../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../utils/context/reducers/authSlice";
import PostShimmer from "../../components/shimmerUI/postShimmer";
import { BadgeDollarSign, Pencil, Share2Icon } from "lucide-react";
import ProfileEdit from "../../components/ProfileEdit";
import Followers from "../../components/FollowersList";
import Following from "../../components/FollowingList";
import { Tooltip } from "flowbite-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();



  useEffect(() => {
    try {
      setLoading(true);

      getUserPost( userId )
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
      <div className='ms-96 flex mt-5 flex-col bg-white p-4 pl-10 w-11/12 rounded-lg'>
        <div className='flex mt-14 justify-between '>
          <div className='flex flex-col gap-4'>
            <img className=' h-28 ' src={user.profileImg} alt="" />
            <div className="flex items-center">
            <p  className='font-semibold text-lg'>{user.userName}</p>
            {user.isVerified && (<svg
                        viewBox="0 0 22 22"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                      >
                        <path
                          d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                          fill="#1d9bf0"
                        ></path>
                      </svg>)}
            </div>
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
          <Tooltip content="Edit Profile" style="light">

            <Pencil className=" cursor-pointer" onClick={()=>setIsProfileEdit(true)}/>
          </Tooltip>

            <Tooltip content="Get Verified" style="light">
              
            <BadgeDollarSign onClick={()=>navigate('/premium/plans')} className=" cursor-pointer"/>
            </Tooltip>

            
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
          <div className="-ml-4">
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
