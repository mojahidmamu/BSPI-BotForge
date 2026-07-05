import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Components/context/AuthContext';
import axios from 'axios';
import {
  Users, UserCheck, DollarSign, Activity, TrendingUp, Clock,
  Droplet, BarChart2, PieChart as PieChartIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area,
  ResponsiveContainer
} from 'recharts';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalMembers: 0,
        totalPending: 0,
        totalDonations: 0,
        recentActivities: []
    });
    // নতুন অ্যানালিটিক্স ডাটা
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            // পুরানো API (dashboard-stats) এবং নতুন API (analytics) উভয়ই কল করুন
            const [statsRes, analyticsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/dashboard-stats', {
                    headers: { 'X-User-Email': user?.email }
                }),
                axios.get('http://localhost:5000/api/admin/analytics', {
                    headers: { 'X-User-Email': user?.email }
                })
            ]);

            setStats(statsRes.data.data);
            setAnalytics(analyticsRes.data.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // স্ট্যাট কার্ডের ডাটা
    const statCards = [
        { title: 'Total Users', value: stats.totalUsers, icon: <Users className="w-6 h-6" />, color: 'bg-blue-500' },
        { title: 'Total Members', value: stats.totalMembers, icon: <UserCheck className="w-6 h-6" />, color: 'bg-green-500' },
        { title: 'Pending Approvals', value: stats.totalPending, icon: <Clock className="w-6 h-6" />, color: 'bg-yellow-500' },
        { title: 'Total Donations', value: `$${stats.totalDonations}`, icon: <DollarSign className="w-6 h-6" />, color: 'bg-purple-500' },
    ];

    // চার্টের জন্য রঙ
    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">Dashboard Overview</h1>

            {/* স্ট্যাট কার্ড */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((card, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                    >
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">{card.title}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{card.value}</p>
                            </div>
                            <div className={`${card.color} p-3 rounded-full text-white`}>
                                {card.icon}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* চার্ট গ্রিড - শুধুমাত্র অ্যানালিটিক্স ডাটা থাকলে দেখাবে */}
            {analytics && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* মাসিক রেজিস্ট্রেশন (লাইন চার্ট) */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                            <TrendingUp className="w-5 h-5 text-purple-500" />
                            Monthly Registrations (Last 12 Months)
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <AreaChart data={analytics.monthlyRegistrations}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Area type="monotone" dataKey="count" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>

                    {/* ডিপার্টমেন্ট ভিত্তিক ডিস্ট্রিবিউশন (ডোনাট চার্ট) */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-blue-500" />
                            Department-wise Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={analytics.departmentCount}
                                    dataKey="count"
                                    nameKey="_id"
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    {analytics.departmentCount.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* ব্লাড গ্রুপ ডিস্ট্রিবিউশন (বার চার্ট) */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                            <Droplet className="w-5 h-5 text-red-500" />
                            Blood Group Distribution
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <BarChart data={analytics.bloodGroupCount}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="_id" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#ff6b6b" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* স্ট্যাটাস ব্রেকডাউন (পাই চার্ট) */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                        <h3 className="font-bold mb-4 text-gray-800 dark:text-white flex items-center gap-2">
                            <PieChartIcon className="w-5 h-5 text-green-500" />
                            Application Status
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Approved', value: analytics.approvedCount },
                                        { name: 'Pending', value: analytics.pendingCount },
                                        { name: 'Rejected', value: analytics.rejectedCount }
                                    ]}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    label
                                >
                                    <Cell fill="#10b981" />
                                    <Cell fill="#f59e0b" />
                                    <Cell fill="#ef4444" />
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            )}

            {/* সাম্প্রতিক কার্যক্রম */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Recent Activities
                </h2>
                <div className="space-y-3">
                    {stats.recentActivities.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No recent activities</p>
                    ) : (
                        stats.recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div>
                                    <p className="font-medium">{activity.name}</p>
                                    <p className="text-sm text-gray-500">Applied for membership</p>
                                </div>
                                <p className="text-sm text-gray-400">
                                    {new Date(activity.appliedAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;