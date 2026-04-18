import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../../Components/Admin/Dashboard'

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { user, isAdmin, loading: authLoading } = useAuth();
    
    const [pending, setPending] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [adminCode, setAdminCode] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState('');
    const [dataLoading, setDataLoading] = useState(false);

    const ADMIN_SECURITY_CODE = '884913';

    useEffect(() => {
        const storedAuth = localStorage.getItem('adminAuth');
        if (storedAuth === 'true') {
            setAuthenticated(true);
            fetchData();
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (adminCode === ADMIN_SECURITY_CODE) {
            setAuthenticated(true);
            localStorage.setItem('adminAuth', 'true');
            await fetchData();
        } else {
            setError('Invalid security code!');
            setTimeout(() => setError(''), 3000);
        }
    };

    const fetchData = async () => {
        setDataLoading(true);
        try {
            const API_URL = 'http://localhost:5000';
            
            // ✅ পেন্ডিং রিকোয়েস্ট ফেচ
            const pendingRes = await axios.get(`${API_URL}/api/admin/pending`);
            console.log('Pending Response:', pendingRes.data);
            
            // ✅ অ্যানালিটিক্স ফেচ
            const analyticsRes = await axios.get(`${API_URL}/api/admin/analytics`);
            console.log('Analytics Response:', analyticsRes.data);
            
            // ✅ সঠিকভাবে ডাটা সেট করুন
            setPending(pendingRes.data.data || []);
            
            // ✅ analytics এর ভিতরে data আছে কিনা চেক করুন
            if (analyticsRes.data.success && analyticsRes.data.data) {
                setAnalytics(analyticsRes.data.data);
            } else if (analyticsRes.data.data) {
                setAnalytics(analyticsRes.data.data);
            } else {
                setAnalytics(analyticsRes.data);
            }
            
        } catch (error) {
            console.error('Error fetching data:', error);
            console.error('Error details:', error.response?.data);
            alert('Failed to load dashboard data. Please check console for details.');
        } finally {
            setDataLoading(false);
        }
    };

    const handleAction = async (id, action, rejectionReason = null) => {
        try {
            const response = await axios.put('http://localhost:5000/api/admin/student-action', {
                id,
                action,
                rejectionReason
            });
            
            if (response.data.success) {
                alert(response.data.message);
                await fetchData();
            } else {
                alert('Action failed: ' + response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to process request. Please try again.');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('adminAuth');
        setAuthenticated(false);
        navigate('/contribute/admin');
    };

    if (authLoading || dataLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center p-4">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8 text-center rounded-t-2xl">
                        <div className="inline-flex p-3 bg-white/20 rounded-full mb-4">
                            <span className="text-4xl">👑</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white">Admin Access</h2>
                        <p className="text-purple-100 mt-2">Enter 6-digit security code</p>
                    </div>
                    
                    <form onSubmit={handleLogin} className="p-6 space-y-6">
                        <div>
                            <input 
                                type="password" 
                                placeholder="••••••" 
                                value={adminCode}
                                onChange={(e) => setAdminCode(e.target.value.replace(/[^0-9]/g, '').slice(0,6))}
                                className="w-full p-3 border rounded-lg text-center text-2xl tracking-widest focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600"
                                autoFocus
                                required
                            />
                            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
                        </div>
                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-bold hover:from-purple-700 hover:to-blue-700 transition"
                        >
                            Verify & Access
                        </button>
                        <div className="text-center">
                            <button 
                                type="button"
                                onClick={() => navigate('/')}
                                className="text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600"
                            >
                                ← Back to Home
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Helmet>
                <title>BSPI BotForge | Admin Dashboard</title>
            </Helmet>
            
            <div className="bg-white dark:bg-gray-800 shadow-lg p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-purple-600">👑 Admin Dashboard</h1>
                <button 
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
            
            <div className="p-6">
                {/* Stats Cards - ✅ নিশ্চিত করুন analytics ডাটা আছে */}
                {analytics && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                            <p className="text-gray-500 dark:text-gray-400">Total Students</p>
                            <p className="text-3xl font-bold text-purple-600">{analytics.totalStudents || 0}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                            <p className="text-gray-500 dark:text-gray-400">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600">{analytics.pendingCount || 0}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                            <p className="text-gray-500 dark:text-gray-400">Approved</p>
                            <p className="text-3xl font-bold text-green-600">{analytics.approvedCount || 0}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                            <p className="text-gray-500 dark:text-gray-400">Rejected</p>
                            <p className="text-3xl font-bold text-red-600">{analytics.rejectedCount || 0}</p>
                        </div>
                    </div>
                )}
                
                {/* Debug: যদি analytics না থাকে */}
                {!analytics && !dataLoading && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                        <p className="text-yellow-700 dark:text-yellow-400">
                            ⚠️ Loading analytics data... If this persists, check backend connection.
                        </p>
                    </div>
                )}
                
                {/* Charts */}
                {analytics && analytics.departmentCount && analytics.departmentCount.length > 0 && (
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                            <h3 className="font-bold mb-4 text-gray-800 dark:text-white">Department-wise Count</h3>
                            <div className="flex justify-center">
                                <PieChart width={400} height={300}>
                                    <Pie 
                                        data={analytics.departmentCount} 
                                        dataKey="count" 
                                        nameKey="_id" 
                                        cx="50%" 
                                        cy="50%" 
                                        outerRadius={80}
                                        label
                                    >
                                        {analytics.departmentCount.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                            <h3 className="font-bold mb-4 text-gray-800 dark:text-white">Monthly Registrations</h3>
                            <BarChart width={400} height={300} data={analytics.monthlyRegistrations || []}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                )}
                
                <Dashboard></Dashboard>
            </div>
        </div>
    );
};

export default AdminDashboard;