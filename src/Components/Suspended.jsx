import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../Components/context/AuthContext';
import { toast } from 'react-hot-toast';
import { Search, Filter, RefreshCw, UserX, Calendar, Mail, Phone } from 'lucide-react';

const Suspended = () => {
    const { user } = useAuth();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [departmentFilter, setDepartmentFilter] = useState('all');
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        fetchRejectedMembers();
        fetchDepartments();
    }, []);

    const fetchRejectedMembers = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (search) params.append('search', search);
            if (departmentFilter !== 'all') params.append('department', departmentFilter);

            const res = await axios.get(`http://localhost:5000/api/admin/rejected?${params}`, {
                headers: { 'X-User-Email': user?.email }
            });
            setMembers(res.data.data);
        } catch (error) {
            console.error('Error fetching rejected members:', error);
            toast.error('Failed to load suspended accounts');
        } finally {
            setLoading(false);
        }
    };

    const fetchDepartments = async () => {
        try {
            const res = await axios.get('http://localhost:5000/api/admin/departments');
            setDepartments(res.data.data || []);
        } catch {
            // যদি ডিপার্টমেন্ট এন্ডপয়েন্ট না থাকে, তাহলে ডিফল্ট
            setDepartments(['CST', 'MT', 'ET', 'AT', 'CWT', 'CONT']);
        }
    };

    useEffect(() => {
        fetchRejectedMembers();
    }, [search, departmentFilter]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
                        <UserX className="w-6 h-6 text-red-500" />
                        Suspended / Rejected Accounts
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total {members.length} suspended members
                    </p>
                </div>
                <button
                    onClick={fetchRejectedMembers}
                    className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                </button>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search by name, roll, or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>
                <select
                    value={departmentFilter}
                    onChange={(e) => setDepartmentFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                    ))}
                </select>
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex justify-center items-center h-40">
                    <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : members.length === 0 ? (
                <div className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <UserX className="w-16 h-16 mx-auto mb-4 opacity-30" />
                    <p className="text-lg">No suspended members found.</p>
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Name</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Roll</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Department</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Session</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Rejected At</th>
                                <th className="p-3 text-left text-gray-700 dark:text-gray-300">Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {members.map((member) => (
                                <tr key={member._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={member.photo || `https://ui-avatars.com/api/?background=ef4444&color=fff&name=${member.name}`}
                                                alt={member.name}
                                                className="w-8 h-8 rounded-full"
                                            />
                                            <span className="font-medium">{member.name}</span>
                                        </div>
                                    </td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{member.roll}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{member.department}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">{member.session}</td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">
                                        {member.rejectedAt ? new Date(member.rejectedAt).toLocaleDateString() : 'N/A'}
                                    </td>
                                    <td className="p-3 text-gray-600 dark:text-gray-300">
                                        {member.rejectionReason || 'No reason provided'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Suspended;