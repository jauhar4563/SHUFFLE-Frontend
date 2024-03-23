import Navbar from "../../../components/admin/Navbar"
import { Outlet } from "react-router-dom"

function AdminDashboard() {
  return (
    <div className="flex">
        <Navbar />
        <Outlet />
    </div>
  )
}

export default AdminDashboard