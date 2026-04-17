import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { Search, Trash2, Shield, UserCog, Mail, Phone } from 'lucide-react';
import { toast } from 'react-hot-toast';

const Users = () => {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/admin/users', {
                headers: { 'X-User-Email': user?.email }
            });
            setUsers(response.data.data);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (userId) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
                    headers: { 'X-User-Email': user?.email }
                });
                toast.success('User deleted successfully');
                fetchUsers();
            } catch (error) {
                toast.error('Failed to delete user');
            }
        }
    };

    const changeRole = async (userId, newRole) => {
        try {
            await axios.put(`http://localhost:5000/api/admin/users/${userId}/role`, 
                { role: newRole },
                { headers: { 'X-User-Email': user?.email } }
            );
            toast.success(`User role changed to ${newRole}`);
            fetchUsers();
        } catch (error) {
            toast.error('Failed to change role');
        }
    };

    const filteredUsers = users.filter(u => 
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <h1 className="text-2xl font-bold mb-6">User Management</h1>
            
            {/* Search */}
            <div className="mb-6">
                <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                    />
                </div>
            </div>

            {/* Users Table */}
            {loading ? (
                <div className="text-center py-12">Loading...</div>
            ) : (
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 dark:bg-gray-700">
                                <tr>
                                    <th className="p-4 text-left">User</th>
                                    <th className="p-4 text-left">Email</th>
                                    <th className="p-4 text-left">Role</th>
                                    <th className="p-4 text-left">Joined</th>
                                    <th className="p-4 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredUsers.map((u) => (
                                    <tr key={u._id} className="border-t dark:border-gray-700">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={u.photoURL || `https://ui-avatars.com/api/?name=${u.name || u.email}`}
                                                    alt={u.name}
                                                    className="w-8 h-8 rounded-full"
                                                />
                                                <span className="font-medium">{u.name || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="p-4">{u.email}</td>
                                        <td className="p-4">
                                            <select
                                                value={u.role}
                                                onChange={(e) => changeRole(u._id, e.target.value)}
                                                className="px-2 py-1 border rounded text-sm dark:bg-gray-800"
                                                disabled={u.email === user?.email}
                                            >
                                                <option value="user">User</option>
                                                <option value="admin">Admin</option>
                                                <option value="super_admin">Super Admin</option>
                                            </select>
                                        </td>
                                        <td className="p-4">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4">
                                            <button
                                                onClick={() => deleteUser(u._id)}
                                                className="text-red-500 hover:text-red-700 transition"
                                                disabled={u.email === user?.email}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Users;