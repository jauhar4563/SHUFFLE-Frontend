import { Route, Routes } from "react-router-dom";
import AdminLogin from "../pages/admin/login/adminLogin";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import UserList from "../components/admin/UserList";

const AdminRouter = () => {
  return (
    <>
      <Routes>
      <Route path="/" element={<AdminDashboard />} />

        <Route path="/login" element={<AdminLogin />} />
        <Route path="/user-list" element={<UserList />} />

      </Routes>
    </>
  );
};

export default AdminRouter;
