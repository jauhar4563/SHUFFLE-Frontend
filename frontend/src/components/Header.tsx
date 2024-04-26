import  { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getNotifications } from "../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import { Bell, Search } from "lucide-react";
import { usePostSearchContext } from "../utils/context/posts/PostSearchContext";
import logo from '../../public/images/logo/shuffle.png'

function Header() {
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const userId = user._id || "";
  const {postSearchData, setPostSearchData } :any = usePostSearchContext();
 

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 100);
    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    try {
      // setLoading(true);
      getNotifications({ userId: userId })
        .then((response: any) => {
          const notificationsData = response.data.notifications;
          setNotifications(notificationsData);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          // setLoading(false);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos, visible, handleScroll]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    // Update the postSearchData in the context
    setPostSearchData((prevData:any) => ({
      ...prevData,
      search: searchValue.trim() ? searchValue : null,
    }));
    console.log(postSearchData);
  };

  return (
    <header className={`fixed z-40 top-0 w-full`}>
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-white">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
          </Link>
          <div className="flex items-center lg:order-2">
            <Link
              to={"/notifications"}
              className="py-4 px-1 relative border-2 border-transparent text-gray-800 rounded-full hover:text-gray-400 focus:outline-none focus:text-gray-500 transition duration-150 ease-in-out"
              aria-label="Cart"
            >
              <Bell size={20} />

              {/* <span className="absolute inset-0 object-right-top -mr-6">
                <div className="inline-flex items-center px-1.5 py-0.5 border-2 border-white rounded-full text-xs font-semibold leading-4 bg-red-500 text-white">
                  6
                </div>
              </span> */}
            </Link>
          </div>
          <div className="relative text-gray-600">
            <input
              type="search"
              name="search"
              placeholder="Search"
              onChange={handleSearch}
              className="bg-white h-10 px-5 w-96 pr-10 rounded-full text-sm focus:ring-none focus:outline-none border border-gray-300"
            />
            <button type="submit" className="absolute right-0 top-0 mt-2 mr-4">
             <Search size={20}/>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
