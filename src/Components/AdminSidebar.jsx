import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
    LayoutDashboard, Users, UserCheck,CreditCard, UserX, Shield, 
    FileText, Settings, Activity, PlusCircle 
} from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();

    const menuItems = [
        { path: '/admin-dashboard/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
        { path: '/admin-dashboard/users', icon: <Users size={18} />, label: 'All Users' },
        { path: '/admin-dashboard/pending', icon: <UserCheck size={18} />, label: 'Pending Approval' },
        { path: '/admin-dashboard/suspended', icon: <UserX size={18} />, label: 'Suspended Accounts' },
        { path: '/admin-dashboard/transactions', icon: <CreditCard size={18}/>, label: 'Transactions' },
        { path: '/admin-dashboard/roles', icon: <Shield size={18} />, label: 'Roles & Permissions' },
        { path: '/admin-dashboard/audit-logs', icon: <FileText size={18} />, label: 'Audit Logs' },
        { path: '/admin-dashboard/add-admin', icon: <PlusCircle size={18} />, label: 'Add Admin' },
        { path: '/admin-dashboard/create-notice', icon: <PlusCircle size={18} />, label: 'Create Notice' },
    ];

    const isActive = (path) => location.pathname === path;

    return (
        <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-20 ${isOpen ? 'w-64' : 'w-20'}`}>
            {/* Logo */}
            <div className="flex items-center justify-center p-4 border-b border-gray-700 h-16">
                {isOpen ? (
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Admin Panel
                    </span>
                ) : (
                    <span className="text-2xl">👑</span>
                )}
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-1">
                {menuItems.map((item, index) => (
                    <Link
                        key={index}
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                            isActive(item.path)
                                ? 'bg-purple-600 text-white'
                                : 'hover:bg-gray-800 text-gray-300'
                        }`}
                    >
                        {item.icon}
                        {isOpen && <span className="text-sm">{item.label}</span>}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

export default AdminSidebar;