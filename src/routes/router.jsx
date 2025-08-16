import {createBrowserRouter} from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/Home/Home";
import Membership from "../pages/Membership/Membership";
import JoinUs from "../pages/JoinUs/JoinUs";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../Layouts/DashboardLayout";
import UserProfile from "../pages/Dashboard/UserProfile/UserProfile";
import AddPost from "../pages/Dashboard/AddPost/AddPost";
import MyPosts from "../pages/Dashboard/MyPosts/MyPosts";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";
import PostDetails from "../pages/Home/Posts/PostDetails";
import Payment from "../pages/Membership/Payment/Payment";
import AdminProfile from "../pages/Dashboard/AdminProfile/AdminProfile";
import AdminRoute from "./AdminRoute";
import Forbidden from "../pages/Forbidden/Forbidden";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import Comments from "../pages/Comments/Comments";
import ReportActivites from "../pages/Dashboard/ReportActivites/ReportActivites";
import AllPosts from "../pages/Home/Posts/AllPosts";
import Setting from "../pages/Setting/Setting";
import TermsOfUse from "../pages/TermsOfUser/TermsOfUse";
import PrivacyPolicy from "../pages/PrivacyPolicy/PrivacyPolicy";
import JoinProjectSection from "../pages/Home/CollaborationSection/JoinProjectSection ";
import ErrorPage from "../pages/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "posts/:id",
        Component: PostDetails,
      },
      {
        path: "projects/:id",
        Component: JoinProjectSection,
      },
      {
        path: "allPosts",
        element: (
            <AllPosts />
        ),
      },
      {
        path: "membership",
        element: (
            <Membership />
        ),
      },
      {
        path: "setting",
        element: (
          <PrivateRoute>
            < Setting/>
          </PrivateRoute>
        ),
      },
      {
        path: "/payment",
        Component: Payment,
      },
      {
        path: "joinUs",
        Component: JoinUs,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "terms",
        Component: TermsOfUse,
      },
      {
        path: "privacy",
        Component: PrivacyPolicy,
      },
      {
        path: "comments/:postId",
        element: (
          <PrivateRoute>
            <Comments />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "userProfile",
        element: (
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "addPost",
        element: (
          <PrivateRoute>
            <AddPost />
          </PrivateRoute>
        ),
      },
      {
        path: "myPosts",
        element: (
          <PrivateRoute>
            <MyPosts />
          </PrivateRoute>
        ),
      },

      //admin routes
      {
        path: "adminProfile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "manageUsers",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "announcement",
        element: (
          <AdminRoute>
            <MakeAnnouncement />
          </AdminRoute>
        ),
      },
      {
        path: "reportedActivities",
        element: (
          <AdminRoute>
            <ReportActivites />
          </AdminRoute>
        ),
      },
    ],
  },
  {
    path:"/*",
    Component:ErrorPage
  },
  {
    path: "/forbidden",
    Component: Forbidden,
  },
]);

export default router;
