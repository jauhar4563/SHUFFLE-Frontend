import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

function VideoCall() {
  const { roomId } = useParams();
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const userId = user._id;
  const userName = user.userName;

  const handleLeaveRoom= ()=>{
    console.log("user Left")

    navigate('/chat');
  }

  const myMeeting = async (element:any) => {
    const appId = 1005615392;
    const serverSecret = "d2aa7b18cde689543ff18fd72139925c";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appId,
      serverSecret,
      roomId,
      userId,
      userName,
    );
    const zc = ZegoUIKitPrebuilt.create(kitToken)
    zc.joinRoom({ 
        element,
        scenario:{
            mode:ZegoUIKitPrebuilt.OneONoneCall,

        },
        showScreenSharingButton:true,
        showPreJoinView: false ,
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: false,
        showLeaveRoomConfirmDialog: false,
        onLeaveRoom: handleLeaveRoom,
    })
  };
  return <div>
    <div ref={myMeeting}/>
  </div>;
}

export default VideoCall;
