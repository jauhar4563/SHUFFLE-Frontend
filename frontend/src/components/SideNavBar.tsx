import { useDispatch, useSelector } from "react-redux";
import { logout } from "../utils/context/reducers/authSlice";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import { toast } from "sonner";

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
      <aside className="fixed top-20 left-0 z-30  flex flex-col w-64 h-5/6 mt-5 ms-32 px-4 py-5 overflow-none  border-r rounded-xl rtl:border-r-0 rtl:border-l bg-gradient-to-b from-purple-600 to-blue-400 dark:border-gray-700">
        <div className="flex flex-col items-center -mx-2">
          <img
            className="object-cover w-16 h-16  mx-2 rounded-full border-2 border-white"
            src={user.profileImg}
            alt="avatar"
          />
          <div className="flex items-center ju">

          <h4 className="mx-2 mt-4 font-medium text-white dark:text-gray-200">
            {user ? user.userName : ""}
          </h4>
          {user.isVerified && (<svg
                        viewBox="0 0 22 22"
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mt-4"
                      >
                        <path
                          d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                          fill="#1d9bf0"
                        ></path>
                      </svg>)}
          </div>
        </div>

        <div className="flex flex-col justify-between flex-1 mt-5">
          <nav>
            <NavLink
              to={"/"}
              className={`flex items-center px-4 py-2  rounded-md ${
                location.pathname === "/"
                  ? "text-purple-600 bg-white"
                  : "text-white"
              }`}
            >
              <svg
                className={`w-5 h-5  ${
                  location.pathname !== "/"
                    ? "text-gray-800 dark:text-white"
                    : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className={`${
                    location.pathname === "/"
                      ? "text-purple-600 bg-white"
                      : "text-white"
                  }`}
                  d="M19 11H5M19 11C20.1046 11 21 11.8954 21 13V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V13C3 11.8954 3.89543 11 5 11M19 11V9C19 7.89543 18.1046 7 17 7M5 11V9C5 7.89543 5.89543 7 7 7M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7M7 7H17"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="mx-5 ">Dashboard</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/notifications"
                  ? "text-purple-600 bg-white"
                  : "text-white"
              }  rounded-lg`}
              to={"/"}
            >
              <svg
                className={`w-5 h-5  ${
                  location.pathname !== "/notifications"
                    ? "text-gray-800 dark:text-white"
                    : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={`${
                    location.pathname === "/notifications"
                      ? "text-purple-600 bg-white"
                      : "text-white"
                  }`}
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.292-.538 1.292H5.538C5 18 5 17.301 5 16.708c0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365ZM8.733 18c.094.852.306 1.54.944 2.112a3.48 3.48 0 0 0 4.646 0c.638-.572 1.236-1.26 1.33-2.112h-6.92Z"
                />
              </svg>

              <span className="mx-5 ">Notifications</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/messages"
                  ? "text-purple-600 bg-white"
                  : "text-white"
              }  rounded-lg`}
              to={"/chat"}
            >
              <svg
                className={`w-5 h-5  ${
                  location.pathname !== "/messages"
                    ? "text-gray-800 dark:text-white"
                    : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={`${
                    location.pathname === "/messages"
                      ? "text-purple-600 bg-white"
                      : "text-white"
                  }`}
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 9h5m3 0h2M7 12h2m3 0h5M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.616a1 1 0 0 0-.67.257l-2.88 2.592A.5.5 0 0 1 8 18.477V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                />
              </svg>

              <span className="mx-5 ">Messages</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/follow-requests"
                  ? "text-purple-600 bg-white"
                  : "text-white"
              }  rounded-lg`}
              to={"/follow-requests"}
            >
              <svg
                className={`w-5 h-5  ${
                  location.pathname !== "/follow-requests"
                    ? "text-gray-800 dark:text-white"
                    : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={`${
                    location.pathname === "/follow-requests"
                      ? "text-purple-600 bg-white"
                      : "text-white"
                  }`}
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <span className="mx-5 ">Requests</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/saved-post"
                  ? "text-purple-600 bg-white"
                  : "text-white"
              }  rounded-lg`}
              to={"/saved-post"}
            >
              <svg
                className={`w-5 h-5  ${
                  location.pathname !== "/saved-post"
                    ? "text-gray-800 dark:text-white"
                    : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={`${
                    location.pathname === "/saved-post"
                      ? "text-purple-600 bg-white"
                      : "text-white"
                  }`}
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                />
              </svg>

              <span className="mx-5 ">Saved Posts</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/profile"
                  ? "text-purple-600 bg-white"
                  : "text-white"
              }  rounded-lg`}
              to={"/profile"}
            >
              <svg
                className={`w-5 h-5  ${
                  location.pathname !== "/profile"
                    ? "text-gray-800 dark:text-white"
                    : ""
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  className={`${
                    location.pathname === "/profile"
                      ? "text-purple-600 bg-white"
                      : "text-white"
                  }`}
                  stroke="currentColor"
                  stroke-width="2"
                  d="M7 17v1a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-4a3 3 0 0 0-3 3Zm8-9a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>

              <span className="mx-5 ">Profile</span>
            </NavLink>
            <NavLink
              className={`flex items-center px-4 mt-2 py-2 ${
                location.pathname === "/settings"
                  ? "text-purple-600 bg-white"
                  : "text-white"
              }  rounded-lg`}
              to={"/settings"}
            >
              <svg
                className={`w-5 h-5 text-white ${
                  location.pathname !== "/settings"
                    ? "text-gray-800 dark:text-white"
                    : ""
                }`}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.3246 4.31731C10.751 2.5609 13.249 2.5609 13.6754 4.31731C13.9508 5.45193 15.2507 5.99038 16.2478 5.38285C17.7913 4.44239 19.5576 6.2087 18.6172 7.75218C18.0096 8.74925 18.5481 10.0492 19.6827 10.3246C21.4391 10.751 21.4391 13.249 19.6827 13.6754C18.5481 13.9508 18.0096 15.2507 18.6172 16.2478C19.5576 17.7913 17.7913 19.5576 16.2478 18.6172C15.2507 18.0096 13.9508 18.5481 13.6754 19.6827C13.249 21.4391 10.751 21.4391 10.3246 19.6827C10.0492 18.5481 8.74926 18.0096 7.75219 18.6172C6.2087 19.5576 4.44239 17.7913 5.38285 16.2478C5.99038 15.2507 5.45193 13.9508 4.31731 13.6754C2.5609 13.249 2.5609 10.751 4.31731 10.3246C5.45193 10.0492 5.99037 8.74926 5.38285 7.75218C4.44239 6.2087 6.2087 4.44239 7.75219 5.38285C8.74926 5.99037 10.0492 5.45193 10.3246 4.31731Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <span className="mx-5 ">More</span>
            </NavLink>
            {/* Add more navigation links */}
          </nav>
        </div>
        <div
          onClick={handleLogout}
          className="flex mt-28 cursor-pointer text-white px-4"
        >
          <svg
            className="w-6 h-6 text-white "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
            />
          </svg>
          <button className="mx-5 ">Logout</button>
        </div>
      </aside>
    </>
  );
}

export default SideNavBar;
