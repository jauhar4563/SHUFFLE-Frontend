import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Protect from "./routes/protect";
import Header from "./components/Header";
import SideNavBar from "./components/SideNavBar";
import { PostSearchProvider } from "./utils/context/posts/PostSearchContext";
import { toast } from "sonner";
import { useSocket } from "./utils/context/SocketContext/SocketContext";

interface NotificationType {
  postImage: string;
  senderName: string;
  message: string;
}


function App() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const socket: any = useSocket();

  //authenticator
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);
  


  useEffect(() => {
    console.log(socket)
    if (!socket.current) return;
    socket.current.on("getNotifications", (data: NotificationType) => {
      console.log(data);
      toast(
        <div className="flex gap-2">
          <img src={data.postImage[0]} alt="User" className="h-8 rounded-full" />
          <p className="text-sm">
            {data.senderName} {data.message}
          </p>
        </div>
      );
    });
  }, [socket]);

  return (
    <>
      <Protect>
          <PostSearchProvider>
            <Header />
            <div className=" flex  mt-20 h-screen ">
              <SideNavBar />
              <Outlet />
            </div>
          </PostSearchProvider>
      </Protect>
    </>
  );
}

export default App;
