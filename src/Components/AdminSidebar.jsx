import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  LogOut,
  LayoutDashboard, 
  Users, 
  UserCheck,
  CreditCard, 
  UserX, 
  Shield, 
  FileText, 
  PlusCircle, 
  Megaphone , Mail, Calendar 
} from 'lucide-react';
import { toast } from 'react-hot-toast';

const AdminSidebar = ({ isOpen, setIsOpen }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        { path: '/admin-dashboard/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
        { path: '/admin-dashboard/members', icon: <Users size={18} />, label: 'All Members' },
        { path: '/admin-dashboard/pending', icon: <UserCheck size={18} />, label: 'Pending Approval' },
        { path: '/admin-dashboard/suspended', icon: <UserX size={18} />, label: 'Suspended Accounts' },
        { path: '/admin-dashboard/transactions', icon: <CreditCard size={18}/>, label: 'Transactions' },
        { path: '/admin-dashboard/add-admin', icon: <PlusCircle size={18} />, label: 'Add Admin' },
        { path: '/admin-dashboard/create-notice', icon: <Megaphone size={18} />, label: 'Create Notice' },
        { path: '/admin-dashboard/manage-events', icon: <Calendar size={18} />, label: 'Manage Events' },
        { path: '/admin-dashboard/bulk-email', icon: <Mail size={18} />, label: 'Bulk Email' },
        { path: '/admin-dashboard/audit-logs', icon: <FileText size={18} />, label: 'Audit Logs' },
        { path: '/admin-dashboard/users', icon: <Users size={18} />, label: 'All Users' },
        { path: '/admin-dashboard/roles', icon: <Shield size={18} />, label: 'Roles & Permissions' },
    ];

    const isActive = (path) => location.pathname === path;

    const handleLogout = () => {
        // Clear admin authentication
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminAuthTime');
        localStorage.removeItem('adminEmail');
        toast.success('Logged out successfully');
        navigate('/contribute/admin');
    };

    return (
        <div className={`fixed left-0 top-0 h-full bg-gray-900 text-white transition-all duration-300 z-20 flex flex-col ${isOpen ? 'w-64' : 'w-20'}`}>
            {/* Logo */}
            <div className="flex items-center justify-center p-4 border-b border-gray-700 h-16 shrink-0">
                {isOpen ? (
                    <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Admin Panel
                    </span>
                ) : (
                    <span className="text-2xl">👑</span>
                )}
            </div>

            {/* Main Navigation - grows to fill space */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
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

            {/* Bottom Section: Home & Logout */}
            <div className="border-t border-gray-700 p-4 space-y-2 shrink-0">
                {/* Home Button */}
                <Link
                    to="/"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-gray-800 text-gray-300"
                >
                    <Home size={18} />
                    {isOpen && <span className="text-sm">Home</span>}
                </Link>

                {/* Logout Button with red color and animation */}
                <button
                    onClick={handleLogout}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-300 text-red-400 hover:text-white hover:bg-red-600 hover:scale-105 hover:shadow-lg hover:shadow-red-500/30 w-full group ${
                        isOpen ? '' : 'justify-center'
                    }`}
                >
                    <LogOut size={18} className="group-hover:rotate-12 transition-transform duration-300" />
                    {isOpen && <span className="text-sm font-medium">Logout</span>}
                </button>
            </div>
        </div>
    );
};

export default AdminSidebar;