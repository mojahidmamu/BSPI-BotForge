import { createBrowserRouter } from "react-router-dom";
  
import MainLayout from "../Layout/MainLayout";
import Home from "../Components/Home/Home"; 
import MemberForm from "../Components/Contribute/MemberForm"; 
import AdminSecurity from "../Components/Contribute/AdminSecurity";
import AdminDashboard from "../Components/Contribute/AdminDashboard";
import AllMembers from "../Components/AllMembers/AllMembers";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path: '/contribute/member', 
            element: <MemberForm></MemberForm>,
        }, 
        {
            path: '/contribute/admin', 
            element:  <AdminSecurity></AdminSecurity>
        },
        {
            path: 'admin-dashboard', 
            element: <AdminDashboard></AdminDashboard>,
        },
        {
            path: 'all-member', 
            element: <AllMembers></AllMembers>,
        },
    ],
  },
]);

// pass in mongoDB: hIrnMfe2av3GHWNr
