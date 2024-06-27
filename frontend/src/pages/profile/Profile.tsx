import { useEffect, useState } from "react";
import {
  getUserConnection,
  getUserPost,
} from "../../services/api/user/apiMethods";
import { useDispatch, useSelector } from "react-redux";
import { logout, setPosts } from "../../utils/context/reducers/authSlice";
import { BadgeCheck, BadgeDollarSign, LogOut, Pencil } from "lucide-react";
import ProfileEdit from "../../components/ProfileEdit";
import Followers from "../../components/FollowersList";
import Following from "../../components/FollowingList";
import { Tooltip } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import PostGallary from "../../components/PostGallary";
import { toast } from "sonner";

function Profile() {
  const dispatch = useDispatch();

  // const [loading, setLoading] = useState(false);
  const selectPosts = (state: any) => state.auth.posts;
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id;
  const posts = useSelector(selectPosts) || [];
  const [isProfileEdit, setIsProfileEdit] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowingModal, setIsFollowingModal] = useState(false);
  const [isFollowersgModal, setIsFollowersgModal] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("email");
    toast.info("Logout Successful");
    navigate("/login");
  };


  useEffect(() => {
    try {
      // setLoading(true);

      getUserPost(userId)
        .then((response: any) => {
          const postsData = response.data;
          dispatch(setPosts({ posts: response.data }));
          console.log(postsData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // setLoading(false);
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

  const handleFollwersModal = () => {
    return setIsFollowersgModal(!isFollowersgModal);
  };

  const handleFollwingModal = () => {
    return setIsFollowingModal(!isFollowingModal);
  };

  const handleEditClose = () => {
    return setIsProfileEdit(!isProfileEdit);
  };

  return (
    <div className="lg:ml-5 w-full lg:w-8/12">
      <div className="lg:ms-96 lg:mt-5  bg-white p-4 lg:pl-10 w-full lg:w-11/12 rounded-lg">
        <div className="flex mt-3 lg:mt-5 lg:ml-12  gap-7 lg:gap-20">
          <div className="flex gap-4">
            <img
              className=" h-16 w-16 lg:h-36 lg:w-36 rounded-full"
              src={user.profileImg}
              alt=""
            />
          </div>
          <div className="flex flex-col  lg:mt-5">
            <div className="flex items-top justify-start gap-2">
              <p className="font-medium text-lg">{user.userName}</p>
              {user?.isVerified && (
                <BadgeCheck size={25} color="white" fill="#9333ea" />
              )}
            </div>

            <div className="flex gap-6 mt-2 lg:mt-5">
              <div
                onClick={handleFollwingModal}
                className="flex flex-col cursor-pointer items-center"
              >
                <p className="font-medium text-lg">{following.length}</p>
                <p className="text-sm">Following</p>
              </div>
              <div
                onClick={handleFollwersModal}
                className="flex flex-col cursor-pointer items-center"
              >
                <p className="font-medium text-lg">{followers.length}</p>
                <p className="text-sm">Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <p className=" font-medium text-lg">{posts.length}</p>
                <p className="text-sm">Posts</p>
              </div>
            </div>
            <div className="flex items-top justify-start mt-2 gap-4">
              <p className="text-sm text-gray-600">{user?.bio}</p>
            </div>
          </div>
          <div className="flex flex-col gap-5 lg:gap-7 ml-6 lg:ml-12 mt-2 lg:mt-7">
          <div
              className="flex gap-3 lg:hidden cursor-pointer"
              onClick={handleLogout}
            >
              <Tooltip content="Edit Profile" style="light">
                <LogOut className="" size={20} color="red" />
              </Tooltip>
              <p className="text-sm hidden lg:block text-gray-500">Logout</p>
            </div>
            <div
              className="flex gap-3  cursor-pointer"
              onClick={() => setIsProfileEdit(true)}
            >
              <Tooltip content="Edit Profile" style="light">
                <Pencil className="" size={20} color="gray" />
              </Tooltip>
              <p className="text-sm hidden lg:block text-gray-500">Edit Profile</p>
            </div>
            <div
              className="flex gap-3 cursor-pointer"
              onClick={() => navigate("/premium/plans")}
            >
              <Tooltip content="Get Verified" style="light">
                <BadgeDollarSign color="gray" />
              </Tooltip>

              <p className="text-sm hidden lg:block text-gray-500">
                {user.isVerified ? "Premium" : "Get Premium"}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:ms-96 mt-5  grid grid-cols-2 md:grid-cols-3 w-full lg:w-11/12 gap-4">
        {posts.map((post: any) => (
          <div key={post._id}>
            <PostGallary post={post} />
          </div>
        ))}
      </div>
      {isProfileEdit && <ProfileEdit user={user} onClose={handleEditClose} />}
      {isFollowersgModal && (
        <Followers
          followers={followers}
          followingUsers={following}
          setFollowingUsers={setFollowing}
          onClose={handleFollwersModal}
        />
      )}
      {isFollowingModal && (
        <Following
          followingUsers={following}
          setFollowingUsers={setFollowing}
          onClose={handleFollwingModal}
          currentUser={userId}
        />
      )}
    </div>
  );
}

export default Profile;
