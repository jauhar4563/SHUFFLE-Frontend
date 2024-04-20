import { useSelector } from "react-redux";
import VideoCall from "./VideoCall";
import { useParams } from "react-router-dom";
import Error from "../Error/Error";




function ProtectedVideoCall() {
    const {  userId } = useParams();
    const selectUser = (state: any) => state.auth.user;
     const user = useSelector(selectUser);
     const loggedInUserId = user._id;  
    if (loggedInUserId === userId) {
      return <VideoCall />;
    } else {
      return <Error message="Unauthorized access" />;
    }
  }
  
  export default ProtectedVideoCall;