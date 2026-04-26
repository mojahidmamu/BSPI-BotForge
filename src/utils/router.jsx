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
import ProtectedRoute from "../Components/ProtectedRoute";
import Login from "../pages/Login";
import Profile from "../Components/Profile/Profile";
import AdminLayout from "../Components/AdminLayout";
import AllUsers from "../pages/Users/AllUsers";
import Pending from "../Components/Pending";
import Transactions from "../Components/Transactions";
import AuditLogs from "../Components/AuditLogs";
import Suspended from "../Components/Suspended";
import Role from "../Components/Role";
import AddAdmin from "../Components/AddAdmin";
import Achievement from "../Components/Achievement/Achievement";

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
            path: '/achievement',
            element: <Achievement></Achievement>,
        },
        {
            path: '/login', 
            element: <Login></Login>,
        },
        {
            path: '/contribute/member', 
            element: (
                <ProtectedRoute>
                    <MemberForm></MemberForm>,
                </ProtectedRoute>
            ),
        }, 
        {
            path: '/contribute/admin', 
            element:  <AdminSecurity></AdminSecurity>
        },
        {
            path: '/members', 
            element: (
                <ProtectedRoute>
                    <AllMembers></AllMembers>
                </ProtectedRoute>
            ),
        },
        {
            path: '/member/:id', 
            element: (
                <ProtectedRoute>
                    <MemberDetails></MemberDetails> 
                </ProtectedRoute>
            ),
        },
        {
            path: '/profile', 
            element: (
                <ProtectedRoute>
                    <Profile></Profile>
                </ProtectedRoute>
            )
        }, 
        {
            path: 'admin-dashboard', 
            element:<AdminLayout></AdminLayout>,
            children: [
                    { index: true, element: <AdminDashboard /> },
                    { path: 'dashboard', element: <AdminDashboard /> },
                    { path: 'users', element: <AllUsers></AllUsers> },
                    { path: 'pending', element: <Pending /> },
                    { path: 'suspended', element: <Suspended /> },
                    { path: 'transactions', element: <Transactions /> },
                    { path: 'audit-logs', element: <AuditLogs /> },
                    { path: 'roles', element: <Role/> },
                    { path: 'add-admin', element: <AddAdmin/> },

                
                // { path: 'refunds', element: <Refunds /> },
                // { path: 'subscriptions', element: <Subscriptions /> },
                // { path: 'feature-flags', element: <FeatureFlags /> },
                // { path: 'env-variables', element: <EnvVariables /> },
                // { path: 'background-jobs', element: <BackgroundJobs /> },
                // { path: 'maintenance', element: <Maintenance /> },
                // { path: 'user-lookup', element: <UserLookup /> },
                // { path: 'bulk-actions', element: <BulkActions /> },
            ]
        },
    ],
  },
]);

// pass in mongoDB: hIrnMfe2av3GHWNr
