import { createBrowserRouter } from "react-router-dom";
  
import MainLayout from "../Layout/MainLayout";
import Home from "../Components/Home/Home"; 
import MemberForm from "../Components/Contribute/MemberForm"; 
import AdminSecurity from "../Components/Contribute/AdminSecurity";
import AdminDashboard from "../Components/Contribute/AdminDashboard";
import AllMembers from "../Components/AllMembers/AllMembers"; 
import Contact from "../Components/Contact/Contact";
import Activities from "../Components/Activities/Activities";
import Executive from "../Components/Executive/Executive";
import MemberDetails from "../Components/AllMembers/MemberDetails";

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
            path: '/contact', 
            element: <Contact></Contact>,
        },
        {
            path: '/activities', 
            element: <Activities></Activities>,
        },
        {
            path: '/executive', 
            element: <Executive></Executive>,
        },
        {
            path: 'admin-dashboard', 
            element: <AdminDashboard></AdminDashboard>,
        },
        {
            path: 'members', 
            element: <AllMembers></AllMembers>,
        },
        {
            path: 'member/:id', 
            element: <MemberDetails></MemberDetails>
        },
    ],
  },
]);

// pass in mongoDB: hIrnMfe2av3GHWNr
