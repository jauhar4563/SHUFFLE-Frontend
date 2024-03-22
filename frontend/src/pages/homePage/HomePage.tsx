import Header from "../../components/Header"
import SideNavBar from "../../components/SideNavBar"
import Posts from "../../components/Posts"
import UserSuggestionBar from "../../components/UserSuggestionBar"
import AddPost from "../../components/AddPost"

function HomePage() {
  return (
    <>
        <Header />
        <div className="flex bg-gray-100  mt-20 h-fit ">

            <SideNavBar />
            <div className="flex flex-col z-40 h-full">
              <AddPost />
            <Posts />
            </div>
            <UserSuggestionBar />
        </div>

    </>
  )
}

export default HomePage