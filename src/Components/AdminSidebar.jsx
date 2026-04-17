import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { useAuth } from './context/AuthContext';
import {
    Users, UserCheck, UserX, Shield, FileText, Flag, Ban,
    ShoppingCart, CreditCard, RefreshCw, Settings, Database,
    Activity, LifeBuoy, Search, Mail, LayoutDashboard,
    ChevronLeft, ChevronRight
} from 'lucide-react';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const { user } = useAuth();
    const isSuperAdmin = user?.role === 'super_admin';

    const menuItems = [
        {
            section: "Users",
            items: [
                { path: "/users", icon: <Users size={18} />, label: "All Users", roles: ['admin', 'super_admin'] },
                { path: "/admin/pending", icon: <UserCheck size={18} />, label: "Pending Approval", roles: ['admin', 'super_admin'] },
                { path: "/admin/suspended", icon: <UserX size={18} />, label: "Suspended Accounts", roles: ['admin', 'super_admin'] },
                { path: "/admin/roles", icon: <Shield size={18} />, label: "Roles & Permissions", roles: ['super_admin'] }
            ]
        },
        {
            section: "Content",
            items: [
                { path: "/admin/moderation", icon: <FileText size={18} />, label: "Moderation Queue", roles: ['admin', 'super_admin'] },
                { path: "/admin/reported", icon: <Flag size={18} />, label: "Reported Items", roles: ['admin', 'super_admin'] },
                { path: "/admin/blocked-keywords", icon: <Ban size={18} />, label: "Blocked Keywords", roles: ['super_admin'] }
            ]
        },
        {
            section: "Orders & Payments",
            items: [
                { path: "/admin/transactions", icon: <ShoppingCart size={18} />, label: "Transactions", roles: ['admin', 'super_admin'] },
                { path: "/admin/refunds", icon: <CreditCard size={18} />, label: "Refunds", roles: ['admin', 'super_admin'] },
                { path: "/admin/subscriptions", icon: <RefreshCw size={18} />, label: "Subscriptions", roles: ['admin', 'super_admin'] }
            ]
        },
        {
            section: "System",
            items: [
                { path: "/admin/feature-flags", icon: <Settings size={18} />, label: "Feature Flags", roles: ['super_admin'] },
                { path: "/admin/env-variables", icon: <Database size={18} />, label: "Environment Variables", roles: ['super_admin'] },
                { path: "/admin/background-jobs", icon: <Activity size={18} />, label: "Background Jobs", roles: ['super_admin'] },
                { path: "/admin/maintenance", icon: <Settings size={18} />, label: "Maintenance Mode", roles: ['super_admin'] }
            ]
        },
        {
            section: "Audit Logs",
            items: [
                { path: "/admin/audit-logs", icon: <FileText size={18} />, label: "All Admin Actions", roles: ['admin', 'super_admin'] }
            ]
        },
        {
            section: "Support",
            items: [
                { path: "/admin/user-lookup", icon: <Search size={18} />, label: "User Lookup", roles: ['admin', 'super_admin'] },
                { path: "/admin/bulk-actions", icon: <Mail size={18} />, label: "Bulk Actions", roles: ['admin', 'super_admin'] }
            ]
        }
    ];

    const filteredMenu = menuItems.map(section => ({
        ...section,
        items: section.items.filter(item => 
            item.roles.includes(isSuperAdmin ? 'super_admin' : 'admin')
        )
    })).filter(section => section.items.length > 0);

    return (
        <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-20 ${isOpen ? 'w-64' : 'w-20'}`}>
            {/* Logo */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                {isOpen ? (
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Admin Panel
                    </span>
                ) : (
                    <span className="text-2xl font-bold mx-auto">👑</span>
                )}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="p-1 rounded-lg hover:bg-gray-800"
                >
                    {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-6 overflow-y-auto h-[calc(100vh-80px)]">
                {filteredMenu.map((section, idx) => (
                    <div key={idx}>
                        {isOpen && (
                            <h3 className="text-xs uppercase text-gray-400 mb-2 tracking-wider">
                                {section.section}
                            </h3>
                        )}
                        <div className="space-y-1">
                            {section.items.map((item, itemIdx) => (
                                <Link
                                    key={itemIdx}
                                    to={item.path}
                                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                                        location.pathname === item.path
                                            ? 'bg-purple-600 text-white'
                                            : 'hover:bg-gray-800 text-gray-300'
                                    }`}
                                >
                                    {item.icon}
                                    {isOpen && <span className="text-sm">{item.label}</span>}
                                </Link>
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </div>
    );
};

export default AdminSidebar;