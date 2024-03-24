import {useState} from 'react'
import logo from "../../../public/images/logo/shuffle.png";
import { Link } from 'react-router-dom';


function Navbar() {
    const [sidenav, setSidenav] = useState<boolean>(true);

    return (
      <body className="font-poppins m-5
      rounded-lg  antialiased " >
        <div
          id="view"
          className="h-full  flex flex-row"
          data-x-data="{ sidenav: true }"
          
        >
            
          <button
            onClick={() => setSidenav(true)}
            className="p-2 border-2 bg-white rounded-md border-gray-200 shadow-lg text-gray-500 focus:bg-teal-500 focus:outline-none focus:text-white absolute top-0 left-0 sm:hidden"
          >
            <svg
              className="w-5 h-5 fill-current"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
          <div
            id="sidebar"
            className="bg-white h-screen md:block shadow-xl px-3 w-30 md:w-60 lg:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
            data-x-show="sidenav"
            onClick={() => setSidenav(false)}
          >
            <div className="flex justify-center mt-4">
            <img src={logo} className=" w-32 " alt="Logo" />
          </div>
            <div className="space-y-2 md:space-y-4 mt-2">
              <h1 className="font-bold text-4xl text-center md:hidden">
                <span className="text-teal-600">.</span>
              </h1>
              
              <h1 className="hidden md:block font-bold text-sm md:text-xl text-center">
                Admin<span className="text-teal-600">.</span>
              </h1>
              <div id="profile" className="space-y-3">
                <img
                  src="https://images.unsplash.com/photo-1628157588553-5eeea00af15c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                  alt="Avatar user"
                  className="w-10 md:w-16 rounded-full mx-auto"
                />
                <div>
                  <h2 className="font-medium text-xs md:text-sm text-center  text-gradient-to-b text-from-purple-600 text-to-blue-400">
                    Eduard Pantazi
                  </h2>
                  <p className="text-xs text-gray-500 text-center">Administrator</p>
                </div>
              </div>
             
              <div id="menu" className="flex flex-col  mt-4 space-y-2">
                <a
                  href=""
                  className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-b hover:from-purple-600 hover:to-blue-400 hover:text-white hover:text-base rounded-md transition duration-150 ease-in-out"
                >
                  <svg
                    className="w-6 h-6 fill-current inline-block"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 3a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h8a1 1 0 100-2H6z"
                    ></path>
                    <path
                      d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z"
                    ></path>
                  </svg>
                  <span className="">Dashboard</span>
                </a>
                <Link
                      to={'/admin/users'}
                      className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-b hover:from-purple-600 hover:to-blue-400 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                    >
                      <svg
                        className="w-6 h-6 fill-current inline-block"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                        ></path>
                      </svg>
                      <span className="">Users</span>
                    </Link>
                    <a
                      href=""
                      className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-b hover:from-purple-600 hover:to-blue-400 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                    >
                      <svg
                        className="w-6 h-6 fill-current inline-block"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"
                        ></path>
                      </svg>
                      <span className="">Posts</span>
                    </a>
                    <a
                      href=""
                      className="text-sm font-medium text-gray-700 py-2 px-2 hover:bg-gradient-to-b hover:from-purple-600 hover:to-blue-400 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out"
                    >
                      <svg
                        className="w-6 h-6 fill-current inline-block"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M4 5a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z"
                        ></path>
                      </svg>
                      <span className="">Reports</span>
                    </a>
                    {/* Other menu items */}
                  </div>
                </div>
              </div>
            </div>
         
      
      </body>
    );
}

export default Navbar