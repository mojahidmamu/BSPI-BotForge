import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Search, Filter, MoreVertical, CheckCircle, XCircle } from 'lucide-react';
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

    useEffect(() => {
        fetchUsers();
    }, [search, roleFilter, statusFilter, page]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/admin/users', {
                headers: { 'X-User-Email': user?.email },
                params: { search, role: roleFilter, status: statusFilter, page }
            });
            setUsers(response.data.data);
            setTotalPages(response.data.pages);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const updateUserRole = async (userId, newRole) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/users/${userId}/role`,
                { role: newRole },
                { headers: { 'X-User-Email': user?.email } }
            );
            toast.success('User role updated successfully');
            fetchUsers();
        } catch (error) {
            toast.error('Failed to update role');
        }
    };

    const suspendUser = async (userId) => {
        if (window.confirm('Are you sure you want to suspend this user?')) {
            try {
                await axios.put(`http://localhost:5000/api/admin/users/${userId}/suspend`,
                    {},
                    { headers: { 'X-User-Email': user?.email } }
                );
                toast.success('User suspended successfully');
                fetchUsers();
            } catch (error) {
                toast.error('Failed to suspend user');
            }
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">All Users</h2>
            
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
                            className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
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
                <div className="text-center py-12">Loading...</div>
            ) : (
                <>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="p-3 text-left">User</th>
                                    <th className="p-3 text-left">Email</th>
                                    <th className="p-3 text-left">Role</th>
                                    <th className="p-3 text-left">Status</th>
                                    <th className="p-3 text-left">Joined</th>
                                    <th className="p-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u._id} className="border-t dark:border-gray-700">
                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={u.photoURL || `https://ui-avatars.com/api/?name=${u.name}`}
                                                    alt={u.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span className="font-medium">{u.name}</span>
                                            </div>
                                        </td>
                                        <td className="p-3">{u.email}</td>
                                        <td className="p-3">
                                            <select
                                                value={u.role}
                                                onChange={(e) => updateUserRole(u._id, e.target.value)}
                                                className="px-2 py-1 border rounded text-sm"
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
                                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">Active</span>
                                            ) : (
                                                <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">Suspended</span>
                                            )}
                                        </td>
                                        <td className="p-3">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td className="p-3">
                                            {u.isActive && u.email !== user?.email && (
                                                <button
                                                    onClick={() => suspendUser(u._id)}
                                                    className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                                                >
                                                    Suspend
                                                </button>
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
                            {Array.from({ length: totalPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setPage(i + 1)}
                                    className={`px-3 py-1 rounded ${page === i + 1 ? 'bg-purple-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllUsers;