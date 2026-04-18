import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Users, UserCheck, UserX, TrendingUp } from 'lucide-react';

const AdminDashboard = () => {
    const [stats, setStats] = useState({
        totalStudents: 0,
        pendingCount: 0,
        approvedCount: 0,
        rejectedCount: 0
    });
    const [pending, setPending] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [pendingRes, analyticsRes] = await Promise.all([
                axios.get('http://localhost:5000/api/admin/pending'),
                axios.get('http://localhost:5000/api/admin/analytics')
            ]);
            
            setPending(pendingRes.data.data || []);
            setStats(analyticsRes.data.data);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAction = async (id, action, rejectionReason = null) => {
        try {
            const response = await axios.put('http://localhost:5000/api/admin/student-action', {
                id, action, rejectionReason
            });
            if (response.data.success) {
                alert(response.data.message);
                fetchData();
            }
        } catch (error) {
            alert('Failed to process request');
        }
    };

    const statCards = [
        { title: 'Total Students', value: stats.totalStudents, icon: <Users className="w-6 h-6" />, color: 'bg-purple-500' },
        { title: 'Pending', value: stats.pendingCount, icon: <UserCheck className="w-6 h-6" />, color: 'bg-yellow-500' },
        { title: 'Approved', value: stats.approvedCount, icon: <TrendingUp className="w-6 h-6" />, color: 'bg-green-500' },
        { title: 'Rejected', value: stats.rejectedCount, icon: <UserX className="w-6 h-6" />, color: 'bg-red-500' },
    ];

    if (loading) {
        return <div className="flex justify-center items-center h-64">Loading...</div>;
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">{card.title}</p>
                                <p className="text-2xl font-bold mt-1">{card.value}</p>
                            </div>
                            <div className={`${card.color} p-3 rounded-full text-white`}>
                                {card.icon}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pending Requests Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <h3 className="font-bold p-4 border-b">Pending Requests ({pending.length})</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="p-3 text-left">Name</th>
                                <th className="p-3 text-left">Roll</th>
                                <th className="p-3 text-left">Dept</th>
                                <th className="p-3 text-left">CGPA</th>
                                <th className="p-3 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pending.map(student => (
                                <tr key={student._id} className="border-t">
                                    <td className="p-3">{student.name}</td>
                                    <td className="p-3">{student.roll}</td>
                                    <td className="p-3">{student.department}</td>
                                    <td className="p-3">{student.cgpa}</td>
                                    <td className="p-3 space-x-2">
                                        <button onClick={() => handleAction(student._id, 'approve')}
                                            className="px-3 py-1 bg-green-500 text-white rounded text-sm">Approve</button>
                                        <button onClick={() => {
                                            const reason = prompt('Rejection reason:');
                                            if (reason) handleAction(student._id, 'reject', reason);
                                        }} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Reject</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;