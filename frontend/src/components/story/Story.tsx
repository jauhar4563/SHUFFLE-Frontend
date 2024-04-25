import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import AddStoryModal from "./AddStoryModal";
import { getStories, readStory } from "../../services/api/user/apiMethods";
import { useSelector } from "react-redux";
import ViewStory from "./ViewStory";

function Story() {
    const [addStoryModal, setAddStoryModal] = useState(false);
    const [stories, setStories] = useState([]);
    const [viewStory, setViewStory] = useState(null);
    const selectUser = (state: any) => state.auth.user || "";
    const user = useSelector(selectUser) || "";
    const userId = user._id || "";

    useEffect(() => {
        getStories(userId).then((response: any) => {
            console.log("stories");
            console.log(response.data);
            setStories(response.data);
        });
    }, []);

    const handleStoryClick = (story:any) => {
        readStory({storyId:story._id,userId}).then((response:any)=>{
            setStories((prevStories:any) => {
                return prevStories.map((prevStory:any) => {
                    if (prevStory._id === story._id) {
                        return response.data;
                    } else {
                        return prevStory;
                    }
                });
            });
        })
        setViewStory(story);
    };

    const handleCloseViewStory = () => {
        setViewStory(null);
    };

    return (
        <div className="max-w-full mx-auto p-2 bg-white rounded-lg">
            <ul className="flex space-x-6 font-serif">
                <li className="flex flex-col items-center space-y-1 relative">
                    <div className="bg-gradient-to-b from-purple-600 to-blue-400 p-0.5 rounded-full">
                        <a className="bg-white block rounded-full p-0.5  hover:scale-110 transform transition" href="#">
                            <img className="h-14 w-14 rounded-full" src="https://i.pinimg.com/564x/3c/0e/06/3c0e06920dd0d35128763ef0cc3403d7.jpg" alt="cute kitty" />
                        </a>
                    </div>
                    <button onClick={() => setAddStoryModal(true)} className="absolute bottom-5 right-4 bg-gradient-to-b from-purple-600 to-blue-400 rounded-full h-6 w-6  text-white font-semibold border-2 border-white flex justify-center items-center font-mono hover:bg-blue-700">
                        <Plus size={15} />
                    </button>
                    <p className="text-sm text-gray-600 font-medium">Add Story</p>
                </li>

                {stories.length !== 0 && (stories.map((story: any) => {
                    const isAllRead = story.stories.every((s: any) => s?.views?.includes(userId));
                    const bgGradientClass = isAllRead
                      ? "bg-gray-300"
                      : "bg-gradient-to-b from-purple-600 to-blue-400";
                    return(
                    <li key={story._id} className="flex flex-col items-center space-y-1 " onClick={() => handleStoryClick(story)}>
                        <div className={`p-0.5 rounded-full ${bgGradientClass}`}>
                            <a className="bg-white block rounded-full p-0.5  hover:scale-110 transform transition" href="#">
                                <img className="h-14 w-14 rounded-full" src={story.stories[0].imageUrl} alt="cute kitty" />
                            </a>
                        </div>
                        <p className="text-sm text-gray-600 font-medium">{story.userId.userName}</p>
                    </li>
                )}
                ))}

            </ul>

            {viewStory && <ViewStory story={viewStory} onClose={handleCloseViewStory} />}
            {addStoryModal && <AddStoryModal setAddStoryModal={setAddStoryModal} setStories={setStories}/>}
        </div>
    );
}

export default Story;