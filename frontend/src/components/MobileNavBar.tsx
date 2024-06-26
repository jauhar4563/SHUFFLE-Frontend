import { useLocation, NavLink } from "react-router-dom";
import {
  Bell,
  BookmarkCheck,
  CircleUser,
  LayoutDashboard,
  ListCollapse,
  MessageSquare,
  Search,
  UserRoundPlus,
} from "lucide-react";

function MobileNavBar() {
  const location = useLocation();

  return (
    <>
      <aside className="fixed lg:hidden bottom-0 left-0 z-50 flex flex-col w-full px-1 py-5 overflow-none border-r rounded-xl rtl:border-r-0 rtl:border-l bg-white dark:border-gray-700">
        <div className="flex justify-between items-center">
            <NavLink
              to={"/"}
              className={`flex items-center px-4 py-2  rounded-md ${
                location.pathname === "/"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }`}
            >
              <LayoutDashboard size={20} />
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
            </NavLink>
            {/* <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/saved-post"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }  rounded-lg`}
              to={"/saved-post"}
            >
              <BookmarkCheck size={20} />
            </NavLink> */}
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/profile"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }  rounded-lg`}
              to={"/profile"}
            >
              <CircleUser size={20} />
            </NavLink>
            {/* <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/more"
                  ? "text-purple-600 bg-white"
                  : "text-gray-800"
              }  rounded-lg`}
              to={"/more"}
            >
              <ListCollapse size={20} />
            </NavLink> */}
        </div>
      </aside>
    </>
  );
}

export default MobileNavBar;
