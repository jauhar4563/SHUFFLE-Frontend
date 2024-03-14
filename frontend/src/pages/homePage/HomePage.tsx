import Header from "../../components/Header"
import SideNavBar from "../../components/SideNavBar"
import Posts from "../../components/Posts"

function HomePage() {
  return (
    <>
        <Header />
        <div className="flex bg-gray-100 h-fit ">

            <SideNavBar />
            <Posts />
        </div>

    </>
  )
}

export default HomePage