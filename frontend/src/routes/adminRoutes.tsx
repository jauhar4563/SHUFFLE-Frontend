import AdminLogin from "../pages/admin/login/adminLogin";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import UserList from "../components/admin/UserList";
import HashTags from "../components/admin/hashTags";
import PostList from "../components/admin/PostList";
import ReportList from '../components/admin/ReportList'

export const adminRouter = {
  path: "/admin",
  element: <AdminDashboard />,
  // errorElement: <Error />,
  children: [
    // {
    //   path:"/admin",
    //   element: <Dashboard />
    // },
    {
      path: "/admin/users",
      element: <UserList />,
    },
    {
      path: "/admin/hashtags",
      element: <HashTags />,
    },
    {
      path:"/admin/posts",
      element:<PostList />
    },
    {
      path:"/admin/reports",
      element:<ReportList />
    }
  ],
};

export const adminLoginRouter = {
  path: "/admin/login",
  element: <AdminLogin />,
};
