import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Search, RefreshCw, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../Components/context/AuthContext';

const AllUsers = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        fetchUsers();
    }, [search, roleFilter, statusFilter, page]);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users', {
                params: { 
                    search, 
                    role: roleFilter, 
                    status: statusFilter, 
                    page, 
                    limit: 10 
                }
            });
            
            console.log('API Response:', response.data);
            
            if (response.data.success) {
                setUsers(response.data.data || []);
                setTotalPages(response.data.pages || 1);
                setTotalUsers(response.data.total || 0);
            } else {
                toast.error(response.data.error || 'Failed to fetch users');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Cannot connect to server. Please check backend.');
        } finally {
            setLoading(false);
        }
    };

    const updateUserRole = async (userId, newRole) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/users/${userId}/role`, {
                role: newRole
            });
            toast.success('User role updated successfully');
            fetchUsers();
        } catch (error) {
            console.error('Role update error:', error);
            toast.error('Failed to update role');
        }
    };

    const toggleUserStatus = async (userId, currentStatus) => {
        const action = currentStatus ? 'suspend' : 'activate';
        const message = currentStatus ? 'suspend' : 'activate';
        
        if (window.confirm(`Are you sure you want to ${message} this user?`)) {
            try {
                await axios.put(`http://localhost:5000/api/admin/users/${userId}/${action}`);
                toast.success(`User ${message}d successfully`);
                fetchUsers();
            } catch (error) {
                console.error('Status update error:', error);
                toast.error(`Failed to ${message} user`);
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">All Users</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        Total {totalUsers} users found
                    </p>
                </div>
                <button
                    onClick={fetchUsers}
                    className="px-3 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition flex items-center gap-2"
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
                            placeholder="Search by name or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 focus:ring-2 focus:ring-purple-500"
                        />
                    </div>
                </div>
                
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="super_admin">Super Admin</option>
                </select>
                
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="suspended">Suspended</option>
                </select>
            </div>

            {/* Users Table */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Loading users...</p>
                </div>
            ) : users.length === 0 ? (
                <div className="text-center py-12">
                    <p className="text-gray-500">No users found</p>
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">User</th>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">Email</th>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">Role</th>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">Status</th>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">Joined</th>
                                    <th className="p-3 text-left text-gray-700 dark:text-gray-300">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id} className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={u.photoURL || `https://ui-avatars.com/api/?background=7c3aed&color=fff&name=${u.name || u.email}`}
                                                    alt={u.name || u.email}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span className="font-medium">{u.name || u.email?.split('@')[0]}</span>
                                            </div>
                                        </td>
                                        <td className="p-3 text-gray-600">{u.email}</td>
                                        <td className="p-3">
                                            <select
                                                value={u.role}
                                                onChange={(e) => updateUserRole(u._id, e.target.value)}
                                                className="px-2 py-1 border rounded text-sm dark:bg-gray-700"
                                                disabled={u.email === user?.email}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                                {user?.role === 'super_admin' && (
                                                    <option value="super_admin">Super Admin</option>
                                                )}
                                            </select>
                                        </td>
                                        <td className="p-3">
                                            {u.isActive ? (
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs flex items-center gap-1 w-fit">
                                                    <CheckCircle className="w-3 h-3" />
                                                    Active
                                                </span>
                                            ) : (
                                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs flex items-center gap-1 w-fit">
                                                    <XCircle className="w-3 h-3" />
                                                    Suspended
                                                </span>
                                            )}
                                        </td>
                                        <td className="p-3 text-gray-600">
                                            {new Date(u.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="p-3">
                                            {u.email !== user?.email && (
                                                <button
                                                    onClick={() => toggleUserStatus(u._id, u.isActive)}
                                                    className={`px-3 py-1 rounded text-sm text-white transition ${
                                                        u.isActive 
                                                            ? 'bg-red-500 hover:bg-red-600' 
                                                            : 'bg-green-500 hover:bg-green-600'
                                                    }`}
                                                >
                                                    {u.isActive ? 'Suspend' : 'Activate'}
                                                </button>
                                            )}
                                            {u.email === user?.email && (
                                                <span className="text-xs text-gray-400">You</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-6">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={page === 1}
                                className={`px-3 py-1 rounded ${page === 1 ? 'bg-gray-200 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
                            >
                                Previous
                            </button>
                            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                let pageNum;
                                if (totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (page <= 3) {
                                    pageNum = i + 1;
                                } else if (page >= totalPages - 2) {
                                    pageNum = totalPages - 4 + i;
                                } else {
                                    pageNum = page - 2 + i;
                                }
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setPage(pageNum)}
                                        className={`px-3 py-1 rounded ${page === pageNum ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300'}`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={page === totalPages}
                                className={`px-3 py-1 rounded ${page === totalPages ? 'bg-gray-200 cursor-not-allowed' : 'bg-purple-500 text-white hover:bg-purple-600'}`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllUsers;