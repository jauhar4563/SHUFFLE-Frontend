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
            <div className="flex flex-col  h-full">
              <div className="z-40">

              <AddPost />
              </div>
            <Posts />
            </div>
            <UserSuggestionBar />
        </div>

    </>
  )
}

export default HomePage