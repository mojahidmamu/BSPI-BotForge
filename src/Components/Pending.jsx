import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { toast } from 'react-hot-toast';
import { useAuth } from './context/AuthContext';

const Pending = () => {
    const { user, isAdmin, loading: authLoading } = useAuth();
    const [pending, setPending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // ✅ পেইজ লোড হলে ডাটা ফেচ করুন
    useEffect(() => {
        fetchPendingRequests();
    }, []);

    // ✅ পেন্ডিং রিকোয়েস্ট ফেচ করার ফাংশন
    const fetchPendingRequests = async () => {
        setLoading(true);
        setError('');
        
        try {
            const API_URL = 'http://localhost:5000';
            const response = await axios.get(`${API_URL}/api/admin/pending`);
            
            console.log('Pending Response:', response.data);
            
            if (response.data.success) {
                setPending(response.data.data || []);
            } else {
                setError(response.data.message || 'Failed to load data');
            }
        } catch (error) {
            console.error('Error fetching pending requests:', error);
            setError('Cannot connect to server. Please check if backend is running.');
            toast.error('Failed to load pending requests');
        } finally {
            setLoading(false);
        }
    };

    // ✅ অ্যাপ্রুভ/রিজেক্ট করার ফাংশন
    const handleAction = async (id, action, rejectionReason = null) => {
        try {
            const response = await axios.put('http://localhost:5000/api/admin/student-action', {
                id,
                action,
                rejectionReason
            });
            
            if (response.data.success) {
                toast.success(response.data.message);
                await fetchPendingRequests(); // রিফ্রেশ ডাটা
            } else {
                toast.error('Action failed: ' + response.data.error);
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Failed to process request. Please try again.');
        }
    };

    // ✅ লোডিং স্টেট
    if (authLoading || loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="text-center">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading pending requests...</p>
                </div>
            </div>
        );
    }

    // ✅ এরর স্টেট
    if (error) {
        return (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 m-4">
                <p className="text-red-600 dark:text-red-400 text-center">{error}</p>
                <button 
                    onClick={fetchPendingRequests}
                    className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition mx-auto block"
                >
                    Try Again
                </button>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">Pending Requests</h1>
            
            {/* পেন্ডিং রিকোয়েস্ট টেবিল */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="font-bold text-gray-800 dark:text-white">
                        ⏳ Pending Requests ({pending.length})
                    </h3>
                    <button 
                        onClick={fetchPendingRequests}
                        className="px-3 py-1 bg-purple-500 text-white rounded text-sm hover:bg-purple-600 transition"
                    >
                        Refresh
                    </button>
                </div>
                
                <div className="overflow-x-auto">
                    {pending.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-500 dark:text-gray-400">
                                ✨ No pending requests! All good.
                            </p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">Name</th>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">Roll</th>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">Dept</th>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">CGPA</th>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">Session</th>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pending.map((student) => (
                                    <tr key={student._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition">
                                        <td className="p-3 text-gray-800 dark:text-gray-200">{student.name}</td>
                                        <td className="p-3 text-gray-800 dark:text-gray-200">{student.roll}</td>
                                        <td className="p-3 text-gray-800 dark:text-gray-200">{student.department}</td>
                                        <td className="p-3 text-gray-800 dark:text-gray-200">{student.cgpa}</td>
                                        <td className="p-3 text-gray-800 dark:text-gray-200">{student.session}</td>
                                        <td className="p-3 space-x-2">
                                            <button 
                                                onClick={() => handleAction(student._id, 'approve')}
                                                className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition"
                                            >
                                                Approve
                                            </button>
                                            <button 
                                                onClick={() => {
                                                    const reason = prompt('Please enter rejection reason:');
                                                    if (reason && reason.trim()) {
                                                        handleAction(student._id, 'reject', reason);
                                                    } else if (reason === '') {
                                                        alert('Please provide a rejection reason');
                                                    }
                                                }} 
                                                className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600 transition"
                                            >
                                                Reject
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Pending;