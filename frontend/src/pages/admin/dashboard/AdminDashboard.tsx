import { useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AdminStats from "../../../components/admin/AdminStats";
import ApexChart from "../../../components/admin/Chart";

function AdminDashboard() {
  const selectAdmin = (state: any) => state.adminAuth.admin;
  const admin = useSelector(selectAdmin);
  const Navigate = useNavigate();
  useEffect(() => {
    if (!admin) {
      Navigate("/admin/login");
    }
  }, [admin, Navigate]);

  return (
    <div className=" w-full ">
     <AdminStats />
     <ApexChart />
    </div>
  );
}

export default AdminDashboard;
