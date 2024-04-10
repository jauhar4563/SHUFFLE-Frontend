import React, { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useSelector } from "react-redux";

function GroupVideoCall() {
  const { roomId } = useParams();
  const containerRef = useRef(null);
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const userId = user._id;
  const userName = user.userName;

  const handleLeaveRoom = () => {
    console.log("user Left");
    navigate("/chat");
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const myMeeting = async () => {
      const appId = 1005615392;
      const serverSecret = "d2aa7b18cde689543ff18fd72139925c";
      const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appId,
        serverSecret,
        roomId,
        Date.now().toString(),
        userName
      );
      const zc = ZegoUIKitPrebuilt.create(kitToken);
      zc.joinRoom({
        container: containerRef.current,
        scenario: {
          mode: ZegoUIKitPrebuilt.GroupCall,
        },
        showScreenSharingButton: true,
        showPreJoinView: false,
        turnOnCameraWhenJoining: true,
        turnOnMicrophoneWhenJoining: false,
        showLeaveRoomConfirmDialog: false,
        onLeaveRoom: handleLeaveRoom,
      });
    };
    myMeeting();
  },[roomId,userId,userName,navigate]);
  return (
    <div>
      <div ref={containerRef} />
    </div>
  );
}

export default GroupVideoCall;
