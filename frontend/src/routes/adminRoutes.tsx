import AdminLogin from "../pages/admin/login/adminLogin";
import AdminDashboard from "../pages/admin/dashboard/AdminDashboard";
import UserList from "../components/admin/UserList";
import HashTags from "../components/admin/hashTags";
import PostList from "../components/admin/PostList";
import ReportList from '../components/admin/ReportList'
import Admin from "../pages/admin/Admin";
import Transactions from "../components/admin/Transactions";

export const adminRouter = {
  path: "/admin",
  element: <Admin />,
  // errorElement: <Error />,
  children: [
    {
      path:"/admin/",
      element: <AdminDashboard/>
    },
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
    },
    {
      path:'/admin/transactions',
      element:<Transactions />
    }
  ],
};

export const adminLoginRouter = {
  path: "/admin/login",
  element: <AdminLogin />,
};
