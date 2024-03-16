import Header from "../../components/Header"
import SideNavBar from "../../components/SideNavBar"
import Posts from "../../components/Posts"
import UserSuggestionBar from "../../components/UserSuggestionBar"

function HomePage() {
  return (
    <>
        <Header />
        <div className="flex bg-gray-100 h-fit ">

            <SideNavBar />
            <Posts />
            <UserSuggestionBar />
        </div>

    </>
  )
}

export default HomePage