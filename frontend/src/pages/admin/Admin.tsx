import { useEffect } from "react";
import Navbar from "../../components/admin/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Admin() {
  const selectAdmin = (state: any) => state.adminAuth.admin;
  const admin = useSelector(selectAdmin);
  const Navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      Navigate("/admin/login");
    }
  }, [admin, Navigate]);

  return (
    <div className="flex">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Admin;
