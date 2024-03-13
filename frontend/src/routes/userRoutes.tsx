import { Routes, Route } from 'react-router-dom';
import Login from '../pages/login/login';
import Signup from '../pages/signup/signup';
import ForgotPassword from '../pages/forgotPassword/forgotPassword';
import RenewPassword from '../pages/forgotPassword/renewPassword';
import Otp from '../pages/otpPage/Otp';

function UserRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
      <Route path='/renew-password' element={<RenewPassword />} />
      <Route path='/otp' element={<Otp />} />
    </Routes>
  );
}

export default UserRoutes;
