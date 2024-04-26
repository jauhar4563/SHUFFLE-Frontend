import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/context/reducers/authSlice";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "sonner";
import {
  BadgeCheck,
  Bell,
  BookmarkCheck,
  CircleUser,
  LayoutDashboard,
  ListCollapse,
  LogOut,
  MessageSquare,
  Search,
  UserRoundPlus,
} from "lucide-react";

function SideNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("email");
    toast.info("Logout Successful");
    navigate("/login");
  };

  return (
    <>
      <aside className="fixed top-20 left-0 z-30  flex flex-col w-64 h-5/6 mt-4 ms-32 px-4 py-5 overflow-none  border-r rounded-xl rtl:border-r-0 rtl:border-l bg-white dark:border-gray-700">
        <div className="flex flex-col items-center -mx-2">
          <img
            className="object-cover w-16 h-16  mx-2 rounded-full border-2 border-white"
            src={user.profileImg}
            alt="avatar"
          />
          <div className="flex items-center">
            <h4 className="mx-1 mt-4 font-medium text-black dark:text-gray-200">
              {user ? user.userName : ""}
            </h4>
            {user.isVerified && (
              <BadgeCheck size={24} className="mt-4" color="white" fill="#7E3AF2" />
            )}
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-5">
          <nav>
            <NavLink
              to={"/"}
              className={`flex items-center px-4 py-2  rounded-md ${
                location.pathname === "/"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }`}
            >
              <LayoutDashboard size={20} />
              <span className="mx-5 ">Dashboard</span>
            </NavLink>
            <NavLink
              className={`flex cursor-pointer items-center px-4 mt-2 py-2 ${
                location.pathname === "/explore"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }  rounded-lg`}
              to={"/explore"}
            >
              <Search size={20} />

              <span className="mx-5 ">Explore</span>
            </NavLink>
            <NavLink
              className={`flex cursor-pointer items-center px-4 mt-2 py-2 ${
                location.pathname === "/notifications"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }  rounded-lg`}
              to={"/notifications"}
            >
              <Bell size={20} />

              <span className="mx-5 ">Notifications</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/messages"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }  rounded-lg`}
              to={"/chat"}
            >
              <MessageSquare size={20} />

              <span className="mx-5 ">Messages</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/follow-requests"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }  rounded-lg`}
              to={"/follow-requests"}
            >
              <UserRoundPlus size={20} />

              <span className="mx-5 ">Requests</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/saved-post"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }  rounded-lg`}
              to={"/saved-post"}
            >
              <BookmarkCheck size={20} />

              <span className="mx-5 ">Saved Posts</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/profile"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }  rounded-lg`}
              to={"/profile"}
            >
              <CircleUser size={20} />

              <span className="mx-5 ">Profile</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/more"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }  rounded-lg`}
              to={"/more"}
            >
              <ListCollapse size={20} />

              <span className="mx-5 ">More</span>
            </NavLink>
            {/* Add more navigation links */}
          </nav>
        </div>
        <div
          onClick={handleLogout}
          className="flex mt-14 cursor-pointer text-gray-800 px-4"
        >
          <LogOut size={20} />
          <button className="mx-5 ">Logout</button>
        </div>
      </aside>
    </>
  );
}

export default SideNavBar;
