function Posts() {
  return (
    <>
      <div className="lg:col-span-2 w-5/12 p-4  mt-2" id="posted">
        <div className="flex flex-col">
          <div className="bg-white p-6 mb-4 rounded-lg shadow-md max-w-full">
            {/* User Info with Three-Dot Menu */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src="https://pyxis.nymag.com/v1/imgs/62f/e33/d2ada77e4389025a90426a81e0012fbe3a-negan.2x.h473.w710.jpg"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />

                <div className="flex items-center">
                  <p className="text-gray-800 font-semibold mx-1">
                    Jeffrey Dean Morgan
                  </p>
                  <svg
                    viewBox="0 0 22 22"
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                  >
                    <path
                      d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"
                      fill="#1d9bf0"
                    ></path>
                  </svg>

                  <p className="text-gray-500 text-sm ml-2">@johndoe200</p>
                  <p className="text-gray-500 text-sm mx-1">-</p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </div>
              <div className="text-gray-500 cursor-pointer">
                {/* Three-dot menu icon */}
                <button className="hover:bg-gray-50 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="7" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="17" r="1" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Message */}
            <div className="mb-4">
              <p className="text-gray-500 text-base">
                Just another day with adorable kittens! 🐱{" "}
                <a href="" className="text-blue-600">
                  #Negan
                </a>{" "}
                <a href="" className="text-blue-600">
                  #TWD
                </a>
              </p>
            </div>
            {/* Image */}
            <div className="mb-4">
              <img
                src="https://www.hollywoodreporter.com/wp-content/uploads/2016/10/TWDDeathNeganH2016.jpg?w=1296"
                alt="Post Image"
                className="w-full h-80 object-cover rounded-md"
              />
            </div>
            {/* Like and Comment Section */}
            <div className="flex items-center justify-between text-gray-500">
              <div className="flex items-center space-x-2">
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>

                  <span className="text-sm">42</span>
                </button>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                    />
                  </svg>

                  <span className="text-sm">42</span>
                </button>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    />
                  </svg>

                  <span className="text-sm">3</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 mb-4 rounded-lg shadow-md max-w-full">
            {/* User Info with Three-Dot Menu */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex items-center">
                  <p className="text-gray-800 font-semibold">John Doe</p>

                  <p className="text-gray-500 text-sm ml-2">@johndoe200</p>
                  <p className="text-gray-500 text-sm mx-1">-</p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </div>
              <div className="text-gray-500 cursor-pointer">
                {/* Three-dot menu icon */}
                <button className="hover:bg-gray-50 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="7" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="17" r="1" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Message */}
            <div className="mb-4">
              <p className="text-gray-500 text-base">
                Just another day with adorable kittens! 🐱{" "}
                <a href="" className="text-blue-600">
                  #CuteKitten
                </a>{" "}
                <a href="" className="text-blue-600">
                  #AdventureCat
                </a>
              </p>
            </div>
            {/* Image */}
            <div className="mb-4">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCgBIzkD3txgwVXWuP897YHOZIg06aieAbrmxyRgf1_5vfpFMoG9fdM6FI&s=10"
                alt="Post Image"
                className="w-full h-80 object-cover rounded-md"
              />
            </div>
            {/* Like and Comment Section */}
            <div className="flex items-center justify-between text-gray-500">
              <div className="flex items-center space-x-2">
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>

                  <span className="text-sm">42</span>
                </button>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                    />
                  </svg>

                  <span className="text-sm">42</span>
                </button>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    />
                  </svg>

                  <span className="text-sm">3</span>
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 mb-4 rounded-lg shadow-md max-w-full">
            {/* User Info with Three-Dot Menu */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <img
                  src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex items-center">
                  <p className="text-gray-800 font-semibold">John Doe</p>

                  <p className="text-gray-500 text-sm ml-2">@johndoe200</p>
                  <p className="text-gray-500 text-sm mx-1">-</p>
                  <p className="text-gray-500 text-sm">2 hours ago</p>
                </div>
              </div>
              <div className="text-gray-500 cursor-pointer">
                {/* Three-dot menu icon */}
                <button className="hover:bg-gray-50 rounded-full p-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="7" r="1" />
                    <circle cx="12" cy="12" r="1" />
                    <circle cx="12" cy="17" r="1" />
                  </svg>
                </button>
              </div>
            </div>
            {/* Message */}
            <div className="mb-4">
              <p className="text-gray-500 text-base">
                Just another day with adorable kittens! 🐱{" "}
                <a href="" className="text-blue-600">
                  #CuteKitten
                </a>{" "}
                <a href="" className="text-blue-600">
                  #AdventureCat
                </a>
              </p>
            </div>
            {/* Image */}
            <div className="mb-4">
              <img
                src="data:image/jpeg;base64,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"
                alt="Post Image"
                className="w-full h-80 object-cover rounded-md"
              />
            </div>
            {/* Like and Comment Section */}
            <div className="flex items-center justify-between text-gray-500">
              <div className="flex items-center space-x-2">
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                    />
                  </svg>

                  <span className="text-sm">42</span>
                </button>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m17 21-5-4-5 4V3.889a.92.92 0 0 1 .244-.629.808.808 0 0 1 .59-.26h8.333a.81.81 0 0 1 .589.26.92.92 0 0 1 .244.63V21Z"
                    />
                  </svg>

                  <span className="text-sm">42</span>
                </button>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                  <svg
                    className="w-6 h-6 text-gray-500 "
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 10.5h.01m-4.01 0h.01M8 10.5h.01M5 5h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1h-6.6a1 1 0 0 0-.69.275l-2.866 2.723A.5.5 0 0 1 8 18.635V17a1 1 0 0 0-1-1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z"
                    />
                  </svg>

                  <span className="text-sm">3</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Posts;
