import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // চেক করুন অ্যাডমিন অথেনটিকেটেড কিনা
        const isAuth = localStorage.getItem('adminAuthenticated');
        const authTime = localStorage.getItem('adminAuthTime');
        
        if (!isAuth || !authTime) {
            navigate('/admin-security');
            return;
        }
        
        // 30 মিনিট পরে সেশন এক্সপায়ার হবে
        const timeElapsed = Date.now() - parseInt(authTime);
        if (timeElapsed > 30 * 60 * 1000) {
            localStorage.removeItem('adminAuthenticated');
            localStorage.removeItem('adminAuthTime');
            navigate('/admin-security');
            return;
        }
        
        setAuthenticated(true);
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('adminAuthenticated');
        localStorage.removeItem('adminAuthTime');
        navigate('/admin-security');
    };

    if (!authenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Verifying access...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Admin Navbar */}
            <nav className="bg-white dark:bg-gray-800 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">👑</span>
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">Admin Dashboard</h1>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                        <span>🚪</span> Logout
                    </button>
                </div>
            </nav>

            {/* Admin Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Total Members</p>
                                <p className="text-3xl font-bold text-purple-600">156</p>
                            </div>
                            <span className="text-3xl">👥</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Pending Requests</p>
                                <p className="text-3xl font-bold text-yellow-600">12</p>
                            </div>
                            <span className="text-3xl">⏳</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Approved</p>
                                <p className="text-3xl font-bold text-green-600">144</p>
                            </div>
                            <span className="text-3xl">✅</span>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400">Export Ready</p>
                                <p className="text-3xl font-bold text-blue-600">CSV</p>
                            </div>
                            <span className="text-3xl">📁</span>
                        </div>
                    </div>
                </div>

                {/* Pending Requests Table */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">⏳ Pending Requests</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Roll</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                {/* Map through pending members */}
                                <tr>
                                    <td className="px-6 py-4">John Doe</td>
                                    <td className="px-6 py-4">123456</td>
                                    <td className="px-6 py-4">CST</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm hover:bg-green-600 mr-2">
                                            Approve
                                        </button>
                                        <button className="px-3 py-1 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600">
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;