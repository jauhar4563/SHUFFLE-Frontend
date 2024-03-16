function UserSuggestionBar() {
  return (
    <>
      <div
        className="lg:col-span-2 ms-10 h-4/6 w-1/5 p-4 bg-white  mt-6"
        id="posted"
      >
        <h1 className="mb-4 text-gray-600 font-semibold">SUGGESTIONS</h1>
        <div className="flex flex-col">
          <div
            className="flex justify-between
           bg-grey-500 p-2 mb-4 rounded-lg shadow-md max-w-full"
          >
            {/* User Info with Three-Dot Menu */}
            <div className="flex flex-col justify-between mb-2">
              <img
                src="https://pyxis.nymag.com/v1/imgs/62f/e33/d2ada77e4389025a90426a81e0012fbe3a-negan.2x.h473.w710.jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex items-center mt-3 space-x-2">
                <div className="flex flex-col items-center">
                  <div className="flex">
                    <p className="text-gray-600 ">Jeffrey Dean Morgan</p>
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
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-gray-400 text-sm ml-2">@johndoe200</p>
                
              </div>
            </div>
            {/* Message */}
            <div className="flex flex-col justify-between">
            <div className="text-gray-500 justify-end cursor-pointer">
                  {/* Three-dot menu icon */}
                  <button className="hover:bg-gray-50 rounded-full p-1">
                  <svg className="w-6 h-6 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>

                  </button>
                </div>
                <div className="text-gray-500 justify-end cursor-pointer">
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
            {/* Image */}

            {/* Like and Comment Section */}
          </div>
         <div
            className="flex justify-between
           bg-white p-2 mb-4 rounded-lg shadow-md max-w-full"
          >
            {/* User Info with Three-Dot Menu */}
            <div className="flex flex-col justify-between mb-2">
              <img
                src="https://pyxis.nymag.com/v1/imgs/62f/e33/d2ada77e4389025a90426a81e0012fbe3a-negan.2x.h473.w710.jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex items-center mt-3 space-x-2">
                <div className="flex flex-col items-center">
                  <div className="flex">
                    <p className="text-gray-600 ">Jeffrey Dean Morgan</p>
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
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-gray-400 text-sm ml-2">@johndoe200</p>
                
              </div>
            </div>
            {/* Message */}
            <div className="flex flex-col justify-between">
            <div className="text-gray-500 justify-end cursor-pointer">
                  {/* Three-dot menu icon */}
                  <button className="hover:bg-gray-50 rounded-full p-1">
                  <svg className="w-6 h-6 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>
                  </button>
                </div>
                <div className="text-gray-500 justify-end cursor-pointer">
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
            {/* Image */}

            {/* Like and Comment Section */}
          </div>
          <div
            className="flex justify-between
           bg-white p-2 mb-4 rounded-lg shadow-md max-w-full"
          >
            {/* User Info with Three-Dot Menu */}
            <div className="flex flex-col justify-between mb-2">
              <img
                src="https://pyxis.nymag.com/v1/imgs/62f/e33/d2ada77e4389025a90426a81e0012fbe3a-negan.2x.h473.w710.jpg"
                alt="User Avatar"
                className="w-8 h-8 rounded-full"
              />
              <div className="flex items-center mt-3 space-x-2">
                <div className="flex flex-col items-center">
                  <div className="flex">
                    <p className="text-gray-600 ">Jeffrey Dean Morgan</p>
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
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <p className="text-gray-400 text-sm ml-2">@johndoe200</p>
                
              </div>
            </div>
            {/* Message */}
            <div className="flex flex-col justify-between">
            <div className="text-gray-500 justify-end cursor-pointer">
                  {/* Three-dot menu icon */}
                  <button className="hover:bg-gray-50 rounded-full p-1">
                  <svg className="w-6 h-6 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
</svg>
                  </button>
                </div>
                <div className="text-gray-500 justify-end cursor-pointer">
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
            {/* Image */}

            {/* Like and Comment Section */}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserSuggestionBar;
