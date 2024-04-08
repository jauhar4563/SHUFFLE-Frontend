import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/login";
import Signup from "../pages/signup/signup";
import ForgotPassword from "../pages/forgotPassword/forgotPassword";
import RenewPassword from "../pages/forgotPassword/renewPassword";
import Otp from "../pages/otpPage/Otp";
import HomePage from "../pages/homePage/HomePage";
import App from "../App";
import ForgotOtp from "../pages/otpPage/forgotOtp";
import { adminRouter, adminLoginRouter } from "./adminRoutes";
import Profile from "../pages/profile/Profile";
import SavedPost from "../pages/savedPost/SavedPost";
import UsersProfile from "../pages/UsersProfile/UsersProfile";
import FollowRequests from "../pages/followRequests/FollowRequests";
import Chat from "../pages/chat/Chat";
import PremiumPlans from "../pages/premium/PremiumPage";
import Premium from "../components/Premium";
import PaymentSuccess from "../components/PymentSuccess";
import PaymentFailed from "../components/PaymentFailed";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/saved-post",
        element: <SavedPost />,
      },
      {
        path:'/users-profile/:userId',
        element:<UsersProfile />
      },
      {
        path: "/follow-requests",
        element: <FollowRequests />,
      },
      
    ],
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/premium",
    element: <PremiumPlans />,
    children:[
      {
        path:"/premium/plans",
        element:<Premium/>,
      },
      {
        path:"/premium/payment-success",
        element:<PaymentSuccess/>,
      },
      {
        path:"/premium/payment-failed",
        element:<PaymentFailed/>,
      }
    ]
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/forgot-otp",
    element: <ForgotOtp />,
  },
  {
    path: "/otp",
    element: <Otp />,
  },
  {
    path: "/renew-password",
    element: <RenewPassword />,
  },
  adminRouter,
  adminLoginRouter,
]);

export default appRouter;
