import Navbar from "../../../components/admin/Navbar"
import UserList from "../../../components/admin/UserList"

function AdminDashboard() {
  return (
    <div className="flex">
        <Navbar />
        <UserList />
    </div>
  )
}

export default AdminDashboard