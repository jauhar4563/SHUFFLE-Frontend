
import Posts from "../../components/Posts"
import UserSuggestionBar from "../../components/UserSuggestionBar"
import AddPost from "../../components/AddPost"

function HomePage() {
  return (
    <>

            <div className="flex flex-col  h-full">
              <div className="z-40">

              <AddPost />
              </div>
            <Posts />
            </div>
            <UserSuggestionBar />

    </>
  )
}

export default HomePage