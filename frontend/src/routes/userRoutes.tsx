import { createBrowserRouter } from 'react-router-dom';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import ForgotPassword from '../pages/forgotPassword/forgotPassword';
import RenewPassword from '../pages/forgotPassword/renewPassword';
import Otp from '../pages/otpPage/Otp';
import HomePage from '../pages/homePage/HomePage';
import App from '../App';
import ForgotOtp from '../pages/otpPage/forgotOtp';
import { adminRouter,adminLoginRouter } from './adminRoutes';
import UserProfile from '../pages/profile/UserProfile';


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
        element: <UserProfile />,
      },
    ],
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