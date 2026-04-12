import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
    const [pending, setPending] = useState([]);
    const [analytics, setAnalytics] = useState(null);
    const [adminCode, setAdminCode] = useState('');
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState('');

    const ADMIN_SECURITY_CODE = '884913';

    const handleLogin = (e) => {
        e.preventDefault();
        if (adminCode === ADMIN_SECURITY_CODE) {
            setAuthenticated(true);
            localStorage.setItem('adminAuth', 'true');
            fetchData();
        } else {
            setError('Invalid security code!');
        }
    };

    const fetchData = async () => {
        const [pendingRes, analyticsRes] = await Promise.all([
            axios.get('http://localhost:5000/api/admin/pending'),
            axios.get('http://localhost:5000/api/admin/analytics')
        ]);
        setPending(pendingRes.data.data);
        setAnalytics(analyticsRes.data.data);
    };

    // const handleAction = async (id, action, reason = '') => {
    //     const url = `http://localhost:5000/api/admin/${action}/${id}`;
    //     await axios.put(url, { reason });
    //     fetchData();
    // };

//     const handleAction = async (id, action, rejectionReason = null) => {
//     try {
//         const response = await axios.put(`http://localhost:5000/api/admin/student-action`, {
//             id,
//             action,
//             rejectionReason
//         });
        
//         if (response.data.success) {
//             // Show success message
//             alert(response.data.message);
//             // Refresh the list
//             fetchPendingRequests();
//             fetchApprovedStudents();
//         } else {
//             alert('Action failed: ' + response.data.error);
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('Failed to process request. Please try again.');
//     }
// };

    if (!authenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl shadow-xl w-96">
                    <h2 className="text-2xl font-bold text-center mb-4">👑 Admin Access</h2>
                    <form onSubmit={handleLogin}>
                        <input type="password" placeholder="Enter 6-digit code" value={adminCode}
                            onChange={(e) => setAdminCode(e.target.value.replace(/[^0-9]/g, '').slice(0,6))}
                            className="w-full p-3 border rounded-lg text-center text-2xl tracking-widest mb-4" />
                        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded-lg">Verify</button>
                    </form>
                </div>
            </div>
        );
    }

    const handleAction = async (id, action, rejectionReason = null) => {
    try {
        const response = await axios.put('http://localhost:5000/api/admin/student-action', {
            id,
            action,
            rejectionReason
        });
        
        if (response.data.success) {
            // Show success message with email status
            const emailStatus = response.data.emailSent ? 'Email notification sent!' : 'Action completed but email notification failed.';
            alert(`${response.data.message}\n${emailStatus}`);
            
            // Refresh the lists
            fetchPendingRequests();
            fetchApprovedStudents();
        } else {
            alert('Action failed: ' + response.data.error);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to process request. Please try again.');
    }
};

    const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300'];

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="bg-white shadow-lg p-4">
                <h1 className="text-2xl font-bold text-purple-600">👑 Admin Dashboard</h1>
            </div>
            
            <div className="p-6">
                {/* Stats Cards */}
                {analytics && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow">
                            <p className="text-gray-500">Total Students</p>
                            <p className="text-3xl font-bold text-purple-600">{analytics.totalStudents}</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow">
                            <p className="text-gray-500">Pending</p>
                            <p className="text-3xl font-bold text-yellow-600">{analytics.pendingCount}</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow">
                            <p className="text-gray-500">Approved</p>
                            <p className="text-3xl font-bold text-green-600">{analytics.approvedCount}</p>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow">
                            <p className="text-gray-500">Rejected</p>
                            <p className="text-3xl font-bold text-red-600">{analytics.rejectedCount}</p>
                        </div>
                    </div>
                )}
                
                {/* Charts */}
                {analytics && (
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                        <div className="bg-white rounded-xl p-6 shadow">
                            <h3 className="font-bold mb-4">Department-wise Count</h3>
                            <PieChart width={400} height={300}>
                                <Pie data={analytics.departmentCount} dataKey="count" nameKey="_id" cx="50%" cy="50%" outerRadius={80}>
                                    {analytics.departmentCount.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </div>
                        <div className="bg-white rounded-xl p-6 shadow">
                            <h3 className="font-bold mb-4">Monthly Registrations</h3>
                            <BarChart width={400} height={300} data={analytics.monthlyRegistrations}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="count" fill="#8884d8" />
                            </BarChart>
                        </div>
                    </div>
                )}
                
                {/* Pending Requests Table */}
                <div className="bg-white rounded-xl shadow overflow-hidden">
                    <h3 className="font-bold p-4 border-b">⏳ Pending Requests ({pending.length})</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="p-3 text-left">Name</th>
                                    <th className="p-3 text-left">Roll</th>
                                    <th className="p-3 text-left">Dept</th>
                                    <th className="p-3 text-left">CGPA</th>
                                    <th className="p-3 text-left">Session</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pending.map(student => (
                                    <tr key={student._id} className="border-t">
                                        <td className="p-3">{student.name}</td>
                                        <td className="p-3">{student.roll}</td>
                                        <td className="p-3">{student.department}</td>
                                        <td className="p-3">{student.session}</td>
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
        </div>
    );
};

export default AdminDashboard;