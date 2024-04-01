import { Pencil, Share2Icon } from "lucide-react";
import { useSelector } from "react-redux";
import {
  UnFollowUser,
  followUser,
  getUserConnection,
  rejectFollowRequest,
} from "../services/api/user/apiMethods";
import { useEffect, useState } from "react";
import Followers from "./FollowersList";
import Following from "./FollowingList";
import { toast } from "sonner";

function UserDetails({ user, connections ,isConnected}) {
  const selectUser = (state: any) => state.auth.user;
  const userData = useSelector(selectUser);
  const userId = userData._id || "";
  const [isFollowed, setIsFollowed] = useState(false);
  const [isFollowRequested, setIsFollowRequested] = useState(false);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [isFollowingModal, setIsFollowingModal] = useState(false);
  const [isFollowersgModal, setIsFollowersgModal] = useState(false);

  useEffect(() => {
    const followingUserId: string = user?._id;
    console.log(followingUserId);
    getUserConnection({ userId: followingUserId })
      .then((response: any) => {
        const connectionData = response.data.connection;
        console.log(response.data.connection);
        setFollowing(connectionData.following);
        setFollowers(connectionData.followers);
        setIsFollowed(connections.followers.includes(userId));
        setIsFollowRequested(connections.requested.includes(userId));
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  const handleFollow = () => {
    const followingUser = user._id;
    followUser({ userId, followingUser })
      .then((response: any) => {
   
        response.data.followed
          ? setIsFollowed(true)
          : setIsFollowRequested(true);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleUnFollow = () => {
    const unfollowingUser = user._id;
    UnFollowUser({ userId, unfollowingUser })
      .then((response: any) => {
        setIsFollowed(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleReject = () => {
    const requestedUser = user._id;
    rejectFollowRequest({ userId, requestedUser }).then((response: any) => {
      setIsFollowRequested(false);
      console.log(response.data.connections);
    });
  };
  const handleFollwersModal = () => {
    if(!isConnected){
      toast.warning("This account is private. Follow to view posts.");
      return;
    }
    return setIsFollowersgModal(!isFollowersgModal);
  };

  const handleFollwingModal = () => {
    if(!isConnected){
      toast.warning("This account is private. Follow to view posts.");
      return;
    }
    return setIsFollowingModal(!isFollowingModal);
  };
  return (
    <div>
      <div
        className="ms-96 flex mt-5 flex-col bg-white p-4
       pl-10 w-11/12"
      >
        <div className="flex mt-5 justify-between ">
          <div className="flex flex-col gap-4">
            <img className=" w-28  " src={user?.profileImg} alt="" />
            <p className="font-semibold text-lg">{user?.userName}</p>
          </div>
          <div className="flex flex-col gap-4">
            {user?._id !== userId && (
              <div className="flex justify-around">
                {isFollowed ? (
                  <span
                    onClick={handleUnFollow}
                    className="text-red-500 cursor-pointer"
                  >
                    UnFollow
                  </span>
                ) : isFollowRequested ? (
                  <span
                    onClick={handleReject}
                    className="text-blue-500 cursor-pointer"
                  >
                    Requested
                  </span>
                ) : (
                  <span
                    onClick={handleFollow}
                    className="text-blue-500 cursor-pointer"
                  >
                    Follow
                  </span>
                )}
                <span className="text-blue-500">Message</span>
              </div>
            )}
            <div className="flex gap-6 ">
              <div
                onClick={handleFollwingModal}
                className="flex cursor-pointer flex-col items-center"
              >
                <p>{following.length}</p>
                <p>Following</p>
              </div>
              <div
                onClick={handleFollwersModal}
                className="flex cursor-pointer flex-col items-center"
              >
                <p>{followers.length}</p>
                <p>Followers</p>
              </div>
              <div className="flex flex-col items-center">
                <p>0</p>
                <p>Posts</p>
              </div>
            </div>
          </div>
          <div className="flex gap-5 mr-14">
           
          </div>
        </div>
        <div className="w-11/12">
          <p className="font-semibold">About Me</p>
          <p className="">
            {user?.bio
              ? user?.bio
              : " Lorem Ipsum is simply dummy text of the printing and typesetting industry."}
          </p>
        </div>
      </div>
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
          currentUser={user._id}
        />
      )}
    </div>
  );
}

export default UserDetails;
