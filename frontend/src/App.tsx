import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import Protect from "./routes/protect";
import Header from "./components/Header";
import SideNavBar from "./components/SideNavBar";

function App() {
  const selectUser = (state: any) => state.auth.user;
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  //authenticator
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <>
      <Protect>
        <Header />
        <div className=" flex   mt-20 h-screen " >
          <SideNavBar />
          <Outlet />
        </div>
      </Protect>
    </>
  );
}

export default App;
