import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Components/context/AuthContext';
import axios from 'axios';
import { Users, UserCheck, DollarSign, Activity, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalMembers: 0,
        totalPending: 0,
        totalDonations: 0,
        recentActivities: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardStats();
    }, []);

    const fetchDashboardStats = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/dashboard-stats', {
                headers: { 'X-User-Email': user?.email }
            });
            setStats(response.data.data);
        } catch (error) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        { title: 'Total Users', value: stats.totalUsers, icon: <Users className="w-6 h-6" />, color: 'bg-blue-500' },
        { title: 'Total Members', value: stats.totalMembers, icon: <UserCheck className="w-6 h-6" />, color: 'bg-green-500' },
        { title: 'Pending Approvals', value: stats.totalPending, icon: <Clock className="w-6 h-6" />, color: 'bg-yellow-500' },
        { title: 'Total Donations', value: `$${stats.totalDonations}`, icon: <DollarSign className="w-6 h-6" />, color: 'bg-purple-500' },
    ];

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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

            {/* Recent Activities */}
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