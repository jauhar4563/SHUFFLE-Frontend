import { X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  UnFollowUser,
  followUser,
  getUserConnection,
  rejectFollowRequest,
} from "../services/api/user/apiMethods";
import { useSelector } from "react-redux";

function Followers({ followers,followingUsers,setFollowingUsers, onClose }) {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";
  const [following, setFollowing] = useState([]);
  const [requested, setRequested] = useState([]);

  useEffect(() => {
    getUserConnection({ userId })
      .then((response: any) => {
        const connectionData = response.data.connection;
        setFollowing(connectionData.following);
        setRequested(connectionData.requestSent);
        console.log(response.data.connection);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const isFollowing = (likedUserId) => {
    return following.some((user) => user._id === likedUserId);
  };
  
  const isRequested = (likedUserId) => {
    return requested.includes(likedUserId);
  };
  
  const handleFollow = (likedUserId) => {
    followUser({ userId, followingUser: likedUserId })
      .then((response: any) => {
        if(response.data.followed){
            
            const followedUser = followers.find(user => user._id === likedUserId);
            setFollowing([...following, followedUser])
        setFollowingUsers([...followingUsers, followedUser]);
        }
          else{
            
              setRequested([...requested, likedUserId]);
          }

        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const handleUnFollow = (likedUserId) => {
    UnFollowUser({ userId, unfollowingUser: likedUserId })
      .then((response: any) => {
        setFollowing(following.filter((user) => user._id !== likedUserId));
        setFollowingUsers(followingUsers.filter((user) => user._id !== likedUserId));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  const handleReject = (likedUserId) => {
    rejectFollowRequest({ userId, requestedUser: likedUserId }).then(
      (response: any) => {
        setRequested(requested.filter((id) => id !== likedUserId));
      }
    );
  };

  return (
    <div className="absolute top-0 left-0 z-40 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg" style={{ height: "350px" }}>
        <div className="flex justify-between">
          <h2 className="text-lg font-semibold mb-4">Liked Users</h2>
          <X onClick={onClose} className=" cursor-pointer" />
        </div>
        <hr className="border-gray-300 w-full mb-2" />
        <div className="overflow-auto" style={{ height: "270px" }}>
          <ul>
            {followers.map((user) => (
              <>
                <div className="lg:col-span-2 w-12/12  pb-2 mb-2" id="posted">
                  <div className="flex justify-between bg-white rounded-lg">
                    <div className="info flex items-center mr-24 gap-2">
                      <img
                        src={user.profileImg}
                        alt="User"
                        className=" h-10 rounded-full"
                      />
                      <p className="text-gray-800 text-sm mx-1">
                        {user.userName}
                      </p>
                    </div>
                    {userId !== user._id && (
                      <div className="items-center flex gap-5 actions">
                        {!isFollowing(user._id) && !isRequested(user._id) && (
                          <button
                            onClick={() => handleFollow(user._id)}
                            className="text-sm text-white px-4 py-1 bg-gradient-to-b from-purple-600 to-blue-400 hover:bg-blue-400 rounded-md"
                          >
                            Follow
                          </button>
                        )}
                        {isFollowing(user._id) && (
                          <button
                            onClick={() => handleUnFollow(user._id)}
                            className="text-sm text-gray-800 px-4 py-1 bg-gray-100 rounded-md"
                          >
                            Unfollow
                          </button>
                        )}
                        {isRequested(user._id) && (
                          <button
                            onClick={() => handleReject(user._id)}
                            className="text-sm text-gray-800 px-4 py-1 bg-gray-100 rounded-md"
                          >
                            Requested
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {/* <li key={user._id}>{user.userName}</li> */}
              </>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Followers;
