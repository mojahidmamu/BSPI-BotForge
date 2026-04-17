import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { Menu } from 'lucide-react';
import AdminDashboard from './Contribute/AdminDashboard';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
            
            {/* Main Content */}
            <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
                {/* Top Bar */}
                <div className="bg-white dark:bg-gray-800 shadow-md p-4 sticky top-0 z-10">
                    <button
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                        <Menu className="w-5 h-5" />
                    </button>
                    <h1 className="text-xl font-bold text-gray-800 dark:text-white ml-4 inline-block">
                        Admin Dashboard
                    </h1>
                </div>
                
                {/* Page Content */}
                <div className="p-6">
                    <Outlet />
                    {/* <AdminDashboard></AdminDashboard> */}
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;